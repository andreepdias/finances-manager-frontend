import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string = '';
  @Input('page-description') pageDescription: string = '';

  @Input('show-button') showButton: boolean = true;
  @Input('button-class') buttonClass: string = 'btn-info';
  @Input('button-text') buttonText: string = 'Back';
  @Input('button-icon') buttonIcon: string = 'arrow_back';
  @Input('button-link') buttonLink: string = '';
  

  constructor() { }

  ngOnInit(): void {
  }

}
