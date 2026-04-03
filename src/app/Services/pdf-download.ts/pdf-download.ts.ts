
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class  PdfDownloadTs   {

  /**
   * Generates and downloads a Financial Wealth Report
   * @param userBudget 
   * @param totalIncome 
   * @param totalExpense 
   * @param currentBalance 
   * @param topCategory 
   * @param transactions 
   */
  downloadWealthReport(
    userBudget: number,
    totalIncome: number,
    totalExpense: number,
    currentBalance: number,
    topCategory: string,
    transactions: any[]
  ) {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // --- Styling & Header ---
    doc.setFontSize(20);
    doc.setTextColor(63, 2, 148); // Purple brand color
    doc.text('Financial Wealth Report', 10, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 10, 30);

    // --- Summary Section ---
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Summary', 10, 45);
    doc.setLineWidth(0.5);
    doc.line(10, 47, 200, 47);

    doc.setFontSize(12);
    doc.text(`Initial Budget: ${userBudget.toLocaleString()} GEL`, 10, 55);
    doc.text(`Total Income: ${totalIncome.toLocaleString()} GEL`, 10, 65);
    doc.text(`Total Expenses: ${totalExpense.toLocaleString()} GEL`, 10, 75);
    doc.text(`Current Balance: ${currentBalance.toLocaleString()} GEL`, 10, 85);
    doc.text(`Top Spending Category: ${topCategory}`, 10, 95);

    doc.setFontSize(14);
    doc.text('Transaction History', 10, 110);
    doc.line(10, 112, 200, 112);

    doc.setFontSize(10);
    let yPosition = 120;
    doc.setFont('helvetica', 'bold');
    doc.text('Category', 10, yPosition);
    doc.text('Type', 60, yPosition);
    doc.text('Amount', 110, yPosition);
    doc.setFont('helvetica', 'normal');
    transactions.forEach((t) => {
      yPosition += 10;

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(String(t.category || 'Other'), 10, yPosition);
      doc.text(String(t.type), 60, yPosition);
      doc.text(`${Number(t.amount).toLocaleString()} GEL`, 110, yPosition);
    });
    doc.save(`Wealth_Report_${date}.pdf`);
  }
}