import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseResourceService<Transaction>{

  constructor(
    protected injector: Injector
  ) {
    super('transactions', injector, Transaction.fromJSON)
  }

  search(month: string, year: string){
    const params: HttpParams = new HttpParams().set('month', month).set('year', year);
    return this.http.get(`${this.apiURL}/search`, { params }).pipe(
      catchError(this.handleError),
      map(this.jsonToResources.bind(this))
    )
  }


}
