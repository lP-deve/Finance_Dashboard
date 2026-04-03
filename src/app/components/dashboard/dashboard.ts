import { Component, signal, computed, OnInit, ViewChild, ElementRef, effect, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionForm } from '../transaction-form/transaction-form';
import { Chart, registerables } from 'chart.js';
import { getBalanceChartConfig, getCategoryChartConfig } from '../../Services/carts.ts';
import { PdfDownloadTs } from '../../Services/pdf-download.ts/pdf-download.ts';
import { AdminTs } from '../../Services/admin.ts'; // IMPORT YOUR SERVICE

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, TransactionForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  
  private pdfService = inject(PdfDownloadTs);
  public admin = inject(AdminTs);


  isBudgetSeted = signal(true);
  userBudget = signal<number>(0);
  transactions = signal<any[]>([]);
  showModal = signal(false);
  filterStatus = signal<'all' | 'income' | 'expense'>('all');
  @ViewChild('myChart') chartCanvas!: ElementRef;
  chart: any;
  @ViewChild('categoryChart') categoryCanvas!: ElementRef;
  categoryChart: any;

  filteredTransactions = computed(() => {
    const currentFilter = this.filterStatus();
    const allTransactions = this.transactions();

    let result = allTransactions;
    if (currentFilter !== 'all') {
      result = allTransactions.filter(t => t.type.toLowerCase() === currentFilter);
    }

    return [...result].reverse();
  });

  totalIncome = computed(() => {
    return this.transactions()
      .filter(t => String(t.type).toLowerCase().trim() === 'income')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  });

  totalExpense = computed(() => {
    return this.transactions()
      .filter(t => String(t.type).toLowerCase().trim() === 'expense')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  });

  currentBalance = computed(() => {
    return Number(this.userBudget()) + this.totalIncome() - this.totalExpense();
  });

  expenseByCategory = computed(() => {
    const expenses = this.transactions().filter(t => String(t.type).toLowerCase().trim() === 'expense');
    const categories: { [key: string]: number } = {};
    expenses.forEach(t => {
      const cat = t.category || 'other';
      categories[cat] = (categories[cat] || 0) + (Number(t.amount) || 0);
    });
    return { labels: Object.keys(categories), amounts: Object.values(categories) };
  });

  constructor() {
    effect(() => {
      this.transactions(); 
      this.admin.userRole(); 
      
      if (this.chartCanvas && this.categoryCanvas) {
        this.updateChart();
        this.updateCharts();
      }
    });
  }

  ngOnInit() {
    const savedData = localStorage.getItem('wealth_data');
    if (savedData) {
      this.transactions.set(JSON.parse(savedData));
    }

    const savedBudget = localStorage.getItem('user_budget');
    if (savedBudget) {
      this.userBudget.set(Number(savedBudget));
      this.isBudgetSeted.set(false);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateChart();
      this.updateCharts();
    }, 0);
  }

  handleNewEntry(entry: any) {
    if (this.admin.userRole() !== 'admin') return;

    const cleanEntry = {
      ...entry,
      id: Date.now().toString(),
      amount: Number(entry.amount) || 0,
      type: String(entry.type).toLowerCase().trim(),
      date: entry.date || new Date().toISOString().split('T')[0]
    };
    
    this.transactions.update(prev => [...prev, cleanEntry]);
    this.saveData();
    this.showModal.set(false);
  }

  removeTransaction(id: string) {
    if (this.admin.userRole() !== 'admin') return;
    this.transactions.update(prev => prev.filter(t => t.id !== id));
    this.saveData();
  }

  getTopCategory(): string {
    const data = this.expenseByCategory();
    if (data.amounts.length === 0) return 'N/A';
    const maxAmount = Math.max(...data.amounts);
    const index = data.amounts.indexOf(maxAmount);
    return data.labels[index];
  }

  setFilter(status: 'all' | 'income' | 'expense') {
    this.filterStatus.set(status);
  }

  setBuget() {
    if (this.userBudget() > 0) {
      localStorage.setItem('user_budget', this.userBudget().toString());
      this.isBudgetSeted.set(false);
    }
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userBudget.set(Number(inputElement.value) || 0);
  }

  private saveData() {
    localStorage.setItem('wealth_data', JSON.stringify(this.transactions()));
  }

 
 updateChart() {
  if (!this.chartCanvas) return;
  const ctx = this.chartCanvas.nativeElement.getContext('2d');
  if (!ctx || !this.chartCanvas.nativeElement.offsetParent) return;
  if (this.chart) this.chart.destroy();

  const startValue = Number(this.userBudget()); 
  let runningBalance = startValue;
  const trajectoryData = [startValue]; 

  this.transactions().forEach(t => {
    const absoluteAmount = Math.abs(Number(t.amount));
    const isExpense = String(t.amount).includes('-') || t.type === 'expense';

    if (isExpense) {
      runningBalance -= absoluteAmount;
    } else {
      runningBalance += absoluteAmount;
    }

    trajectoryData.push(runningBalance);
  });

  this.chart = new Chart(ctx, getBalanceChartConfig(ctx, trajectoryData));
}

  updateCharts() {
    if (!this.categoryCanvas) return;
    const ctx = this.categoryCanvas.nativeElement.getContext('2d');
    if (!ctx || !this.categoryCanvas.nativeElement.offsetParent) return;
    if (this.categoryChart) this.categoryChart.destroy();

    const categoryData = this.expenseByCategory();
    this.categoryChart = new Chart(ctx, getCategoryChartConfig(categoryData.labels, categoryData.amounts));
  }

  downloadPDF() {
    this.pdfService.downloadWealthReport(
      this.userBudget(),
      this.totalIncome(),
      this.totalExpense(),
      this.currentBalance(),
      this.getTopCategory(),
      this.transactions()
    );
  }
}