import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { xlsx } from '@packages/services/xlsx';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations : fuseAnimations
})
export class ProductsListComponent implements OnInit {

  table_material_data: MatTableDataSource<any>;
  columnsDefinations: any[] = [];
  data: any[] = [];
  list_mode: boolean = true;
  displayedColumns: any = [{ display: 'Product Code', field: 'product_code' }, { display: 'Product Name', field: 'product_name' }, { display: 'Brand', field: 'brand' },{ display: 'Price', field: 'price' },{ display: 'Expire Date', field: 'expire_date' }];
  @ViewChild(MatPaginator, { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;
  constructor(private service: ApiService, private router: Router,
    private snackbar: MatSnackBar,
    private progressbar: FuseProgressBarService,
    private dialog: MatDialog) { }
  excelExport() {
    xlsx.exportToExcel('excel_sheet', 'Products_list');
  }
  //filtering 
  filter = [
    { view: 'All', val: '' },
    { view: 'Product Name', val: 'product_name' },
    { view: 'Product Code', val: 'product_code' },
    { view: 'Brand', val: 'brand' },
    { view: 'Expire Date', val: 'expire_date' },
  ]
  filterselect: any = '';
  search: FormControl = new FormControl();
  applyFilter(event: any) {
    this.table_material_data.filterPredicate = (data, filter) => {
      if (this.filterselect == 'expire_date') {
        return new Date(data.expire_date).toLocaleDateString()== new Date(filter).toLocaleDateString();
      }
      if (this.filterselect) {
        return data[this.filterselect].toLowerCase().indexOf(filter) !== -1;
      } else {
        return data.product_name.toLowerCase().indexOf(filter) !== -1 || data.product_code.toLowerCase().indexOf(filter) !== -1 ||  data.brand.toLowerCase().indexOf(filter) !== -1
      }
    }
    this.table_material_data.filter = event.trim().toLowerCase();
  }
  filterCriteriaChange() {
    this.search.setValue('')
  }


  create_new() {
    this.router.navigate(['product', 'create_product']);
  }
 
  edit(data) {
    console.log('update_product', data.id);
    this.router.navigate(['product', 'update_product', data.id])

  }

  getAllproductdata() {
    this.progressbar.show();
    this.service.allproductList().subscribe(res => {
      this.data = res;
      console.log('getAllproducts', res);
      this.table_material_data = new MatTableDataSource<any>(this.data);
      this.table_material_data.paginator = this.paginator;
      this.table_material_data.sort = this.sort;
      this.progressbar.hide();
    }, err => {
      this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error), 'ok', { duration: 6000 });

    })
  }
  ngOnInit() {
    this.columnsDefinations = this.displayedColumns.map(item => item.field);
    this.columnsDefinations.push('details');
    this.getAllproductdata();
    this.search.valueChanges.subscribe(res => {
      this.applyFilter(res);
    })
  }

}
