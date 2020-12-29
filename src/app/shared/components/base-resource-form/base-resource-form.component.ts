import { AfterContentChecked, Component, Directive, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../models/base-resource.model';
import { Notification } from '../../scripts/notification';
import { BaseResourceService } from '../../services/base-resource-service.service';

declare var $:any;

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  resourceForm: FormGroup = new FormGroup({});

  pageTitle: string = '';
  pageDescription: string = '';

  serverErrorMessages: string[] = [];

  currentAction: string = '';
  submittingForm: boolean = false;

  imaskConfig: any = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;


  constructor(
    public resource: T,
    protected service: BaseResourceService<T>,
    protected jsonToResourceFn: (jsonData: any) => T,
    protected injector: Injector
  ){
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
  }
  
  ngOnInit(): void {
    this.buildForm();
    this.setCurrentAction();
    this.loadResource();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new'){
      this.createResource();
    }else{
      this.updateResource();
    }
  }

  protected createResource(){
    const resource: T = this.jsonToResourceFn(this.resourceForm.value);
    
    return this.service.create(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource(){
    const resource: T = this.jsonToResourceFn(this.resourceForm.value);

    return this.service.update(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  private navigateToParent(){
    const baseComponentPath: string = (this.route.snapshot.parent) ? this.route.snapshot.parent.url[0].path : '';

    if(baseComponentPath){
      this.router.navigateByUrl(baseComponentPath);
    }
  }

  protected actionsForSuccess(resource: T){
    this.navigateToParent();
  }

  protected actionsForError(error: any){
    this.submittingForm = false;
    this.serverErrorMessages = error.error.errors;
  }

  deleteResource(resource: T){
    this.service.delete(resource).subscribe(
      () => this.actionsForSuccessDelete(resource),
      (error) => this.actionsForFailedDelete(error)
    );
  }

  protected actionsForSuccessDelete(resource: T){
    this.navigateToParent();
  }

  protected actionsForFailedDelete(error: any){
    const errorMessages = error.error.errors;

    for(let error of errorMessages){
      Notification.showNotification(error, 'pe-7s-close-circle', 'danger', 'top', 'center');
    }
  }

  get notificationSuccessIcon(): string{
    return (this.currentAction == 'new') ? 'pe-7s-check' : 'pe-7s-pen';
  }

  get notificationErrorIcon(): string{
    return 'pe-7s-close-circle';
  }

  protected unformatCurrency(amount: string){
    return amount.replace(',', '.');
  }
  
  protected abstract buildForm(): any;

  protected abstract setPageTitle(): any;

  /** --- PRIVATE METHODS --- */

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new'){
      this.currentAction = 'new';
    }else{
      this.currentAction = 'edit';
    }
  }

  private loadResource(){
    if(this.currentAction == 'edit'){
      this.route.params.pipe(
        switchMap(params => this.service.getById(+params['id']))
      ).subscribe(
        resource => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        },
        error => console.log('Error loading resource: ', error)
      );
    }
  }


}
