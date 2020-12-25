import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';

import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  constructor(
    protected injector: Injector
  ){
    super('categories', injector, Category.fromJSON);
  }

}
