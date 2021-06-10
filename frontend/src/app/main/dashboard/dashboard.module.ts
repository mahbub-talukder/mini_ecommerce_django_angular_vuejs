import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@packages/services/auth/auth.guard';
import { MaterialModule } from '@packages/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

const routes : Routes = [
  {path : '',component : DashboardComponent,canActivate : [AuthGuard]},
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule { }
