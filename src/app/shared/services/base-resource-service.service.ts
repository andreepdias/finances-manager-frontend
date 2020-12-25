import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceModel } from '../models/base-resource.model';

import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  apiURL: string = environment.apiURLBase;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonToResourceFn: (jsonData: any) => T
  ){
    this.http = injector.get(HttpClient);
    this.apiURL += '/' + apiPath;
  }

  getAll(){
    return this.http.get(`${this.apiURL}/all`).pipe(
      catchError(this.handleError),
      map(this.jsonToResources.bind(this))
    );
  }

  getPage(page: number = 0, size: number = 0){
    const params = new HttpParams().set('page', String(page)).set('size', String(size) );

    return this.http.get(this.apiURL, { params }).pipe(
      catchError(this.handleError),
      map(this.jsonPageToResources.bind(this))
    );
  }

  getById(id: number){
    return this.http.get(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  create(resource: T){
    return this.http.post(this.apiURL, resource).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  update(resource: T){
    return this.http.put(`${this.apiURL}/${resource.id}`, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(resource: T){
    return this.http.delete(`${this.apiURL}/${resource.id}`).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  
  /** --- PRIVATE METHODS --- */

  private jsonToResource(jsonData: any){
    return this.jsonToResourceFn(jsonData);
  }

  private jsonToResources(json: any){
    const resources: T[] = [];
    console.log('Converting to model: ', json);
    json.forEach(
      (element: T) => resources.push(element)
    );
    return resources;
  }

  private jsonPageToResources(jsonPage: any){
    const resources: T[] = [];
    jsonPage.content.forEach(
      (element: T) => resources.push(element)
    );
    jsonPage.content = resources;
    return jsonPage;
  }

  private handleError(error: any): Observable<any>{
    return throwError(error);
  }

}
