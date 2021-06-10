import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@packages/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ShoppingCarftComponent } from './components/shopping-carft/shopping-carft.component';
const routes : Routes = [
  {path : '',component : LandingPageComponent},
]

@NgModule({
  declarations: [LandingPageComponent, ShoppingCarftComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents : [ShoppingCarftComponent]
})
export class PublicModule { }
