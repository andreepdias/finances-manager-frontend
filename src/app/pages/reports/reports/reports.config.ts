import { Transaction } from '../../transactions/shared/transaction.model';

export class ReportsConfig {
  colors: string[] = [
    '#48C9B0',
    '#AF7AC5',
    '#F7DC6F',
    '#AED6F1',
    '#F1948A',
    '#EB984E',
    '#788084', 
    '#fe91b7', 
    '#616c23', 
    '#cad248', 
    '#9c2b41', 
    '#1bd18a', 
    '#271476', 
    '#dd25ba', 
    '#c387ec', 
    '#f6f01d', 
    '#80d701', 
    '#c8ebad', 
    '#983eac', 
    '#0effc8',
    '#885327',
    '#425ae3', 
    '#dfe797',
    '#e9500f'
  ]
    
  /** --- CHARTS DATA --- */
  expensesChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: this.colors,
      }]
    };    
    incomesChartData: any = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: this.colors,
        }]
      };
      
  /** --- CHARTS OPTIONS --- */
  pieChartOptions: any = {
    legend: {
      position: 'bottom'
    }
  };

  barChartOptions = {
    legend: {
       display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
        },
    }],
    xAxes: [{
      maxBarThickness: 100,
    }]
  }
  };
}