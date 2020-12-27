import { Component, OnInit } from '@angular/core';
import { CurrencyUtil } from 'src/app/shared/util/currency.util';
import { Transaction } from '../../transactions/shared/transaction.model';
import { TransactionService } from '../../transactions/shared/transaction.service';
import { ReportsConfig } from './reports.config';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  totalIncomes: number = 0;
  totalExpenses: number = 0;
  finalBalance: number = 0;

  reportsConfig: ReportsConfig = new ReportsConfig();

  transactions: Transaction[] = [];
  defaultDate: string = '';

  currencyUtil: CurrencyUtil = new CurrencyUtil();

  constructor(
    private service: TransactionService
  ){}

  ngOnInit(): void {
    this.setDefaultDate();
    this.loadThisMonthTransactions();
  }

  changeMonth(event: any){
    return this.loadMonthTransactions(String(event.getMonth() + 1), String(event.getFullYear()));
  }

  private setDefaultDate(){
    let today = new Date();
    this.defaultDate = (today.getMonth() + 1) + '/' + today.getFullYear();
  }

  private loadThisMonthTransactions(){
    const today = new Date();
    return this.loadMonthTransactions(String(today.getMonth() + 1), String(today.getFullYear()));
  }

  private loadMonthTransactions(month: string, year: string){
    return this.service.search(month, year).subscribe(
      transactions => this.successLoadingTransaction(transactions),
      error => console.log('Error loading transactions: ', error)
    );
  }

  private successLoadingTransaction(transactions: Transaction[]){
    this.transactions = transactions;

    this.calculateFinances();
    this.buildCharts();
  }

  private calculateFinances(){
    this.totalIncomes = 0;
    this.totalExpenses = 0;
    this.finalBalance = 0;

    for(let transaction of this.transactions){
      if(transaction.category.categoryTypeName == 'Expense'){
        this.totalExpenses += parseFloat(transaction.amount);
      }else{
        this.totalIncomes += parseFloat(transaction.amount);
      }
    }
    this.finalBalance = this.totalIncomes - this.totalExpenses;
  }

  private buildCharts(){
    this.reportsConfig.expensesChartData = this.getChartData(this.transactions, 'Expense');
    this.reportsConfig.incomesChartData = this.getChartData(this.transactions, 'Income');
  }

  private getChartData(transactions: Transaction[], type: string){
    let chartDataMap = this.buildChartDataMap(transactions, type);

    let labels: string[] = [];
    let data: number[] = [];    

    for(let [key, value] of chartDataMap){
      labels.push(key);
      data.push(value);
    }

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.reportsConfig.colors
      }]
    };
  }

  private buildChartDataMap(transactions: Transaction[], type: string){
    let chartDataMap: Map<string, number> = new Map();
    
    for(let transaction of transactions){
      if(transaction.category.categoryTypeName != type) continue;

      const categoryName: string = transaction.category.name;
      
      const transactionAmount = parseFloat(transaction.amount);
      const currentAmount = chartDataMap.get(categoryName)
      const newAmount = currentAmount ? (currentAmount + transactionAmount) : transactionAmount;
      
      chartDataMap.set(categoryName, newAmount);
    }
    return chartDataMap;
  }

}
