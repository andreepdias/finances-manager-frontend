import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'reports', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: '', component: ReportsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
