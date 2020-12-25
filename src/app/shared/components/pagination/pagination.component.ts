import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('pagination-config') config = {
    id: '',
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1
  };

  @Output('on-change-page-event') onPageChangeEvent = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: any){
    this.config.currentPage = event;
    this.onPageChangeEvent.emit(event);
  }
}
