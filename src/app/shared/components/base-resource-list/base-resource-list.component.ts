import { Component, Directive, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { Notification } from '../../scripts/notification';
import { BaseResourceService } from '../../services/base-resource-service.service';
import { CurrencyUtil } from '../../util/currency.util';

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

  currencyUtil: CurrencyUtil = new CurrencyUtil();

  constructor(
    protected service: BaseResourceService<T>
  ) { }

  ngOnInit(): void {
    this.loadPageResources(this.paginationConfig.currentPage - 1, this.paginationConfig.itemsPerPage);
  }

  deleteResource(resource: T){
    this.service.delete(resource).subscribe(
      () => this.actionsForSuccessDelete(resource),
      (error) => this.actionsForFailedDelete(error)
    );
  }
  
  onPaginationPageChange(event: number){
    this.loadPageResources(event - 1, this.paginationConfig.itemsPerPage);
  }

  protected actionsForSuccessDelete(resource: T){
    this.loadPageResources(this.paginationConfig.currentPage - 1, this.paginationConfig.itemsPerPage);
  }

  protected actionsForFailedDelete(error: any){
    const errorMessages = error.error.errors;

    for(let error of errorMessages){
      Notification.showNotification(error, 'pe-7s-close-circle', 'danger', 'top', 'center');
    }
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

}
