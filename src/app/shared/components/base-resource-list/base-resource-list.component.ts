import { Component, Directive, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceServiceService } from '../../services/base-resource-service.service';
declare var $:any;

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  paginationConfig = {
    id: 'list-component',
    totalItems: this.resources.length,
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(
    protected service: BaseResourceServiceService<T>
  ) { }

  ngOnInit(): void {
    this.loadPageResources(this.paginationConfig.currentPage - 1, this.paginationConfig.itemsPerPage);
  }

  deleteResource(resource: T){
    this.service.delete(resource).subscribe(
      () => this.handleSuccessfulDeletion(resource),
      (error) => console.log('Error deleting resource: ', error)
    );
  }
  
  onPaginationPageChange(event: number){
    this.loadPageResources(event - 1, this.paginationConfig.itemsPerPage);
  }


  /** --- PRIVATE METHODS  --- */

  private loadPageResources(page: number, size: number){
    return this.service.getPage(page, size).subscribe(
      jsonPage => {
        this.resources = jsonPage.content;
        this.paginationConfig.currentPage = jsonPage.number + 1;
        this.paginationConfig.totalItems = jsonPage.totalElements;
      }
    )
  }

  protected handleSuccessfulDeletion(resource: T){
    this.loadPageResources(this.paginationConfig.currentPage - 1, this.paginationConfig.itemsPerPage);
  }

}
