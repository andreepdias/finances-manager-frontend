import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  { path: 'categories', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: CategoryListComponent },
    { path: 'new', component: CategoryFormComponent },
    { path: ':id/edit', component: CategoryFormComponent },
    { path: '', redirectTo: '/categories/list', pathMatch: 'full' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
