import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  desc = "";
  amount: number | null = null;
  category = "lifestyle"; 

  selectedType = signal<'income' | 'expense'>('expense');

  // UPDATED: Names must match what the Dashboard calls in its HTML
  onSubmit = output<any>(); 
  onCancel = output<void>();

  setType(type: 'income' | 'expense') {
    this.selectedType.set(type);
  }

  addTransaction() {
    if (!this.desc.trim() || this.amount === null || this.amount <= 0) {
      alert("Please fill in all fields with valid data");
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      description: this.desc.trim(),
      amount: Number(this.amount), 
      category: this.category,
      type: this.selectedType(),
      date: new Date().toLocaleDateString()
    };

    // Emit using the new name
    this.onSubmit.emit(entry);
    
    this.resetForm();
  }

  closeModal() {
    // Emit using the new name
    this.onCancel.emit();
  }

  private resetForm() {
    this.desc = '';
    this.amount = null;
    this.category = 'lifestyle';
    this.selectedType.set('expense');
  }
}