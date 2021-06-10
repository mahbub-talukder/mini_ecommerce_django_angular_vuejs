import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MaterialModule } from '@packages/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@packages/services/auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPrintModule } from 'ngx-print';

const routes : Routes = [
  {path : 'create_product',component : CreateProductComponent, canActivate : [AuthGuard]},
  {path : 'update_product/:id',component : CreateProductComponent, canActivate : [AuthGuard]},
  {path : 'productslist',component : ProductsListComponent,canActivate : [AuthGuard]},
]

@NgModule({
  declarations: [CreateProductComponent, ProductsListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
