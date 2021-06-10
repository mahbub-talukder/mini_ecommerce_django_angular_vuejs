import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations : fuseAnimations
})
export class DashboardComponent implements OnInit {
  dataList:any=[];
  errorMessage:any=''
  qty:number=1;
  spinner: boolean;
  increment(){
    this.qty +=1
  }
  decrement(){
    if(this.qty>1){
      this.qty -=1
    } 
  }
  constructor(private api_service : ApiService,
    private progress : FuseProgressBarService,
    private router :  Router,
    private snackbar : MatSnackBar,
    public dialog : MatDialog) { }

  getAllproductdata() {
    this.spinner = true
    // this.progress.show();
    this.api_service.allproductList().subscribe(res => {
      this.dataList = res;
      console.log('getAllproducts', res);
      // this.progress.hide();
      this.spinner = false;
    }, err => {
      this.errorMessage =  JSON.stringify(err.error.message ? err.error.message : err.error);
      // this.progress.hide();
      this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error), 'ok', { duration: 6000 });
      this.spinner = false;

    })
  }
  craftlist:any[]=[];
  addtocraft(item){
    if(!item.added){
      item.added=  true;
      item.qty = this.qty
      this.craftlist.push(item);
    }else{
      this.snackbar.open('This item already added to craft','ok',{duration:2000})
    } 
    this.qty = 1
  }
  edit(data) {
    console.log('update_product', data.id);
    this.router.navigate(['product', 'update_product', data.id])

  }
  ngOnInit() {
    this.getAllproductdata();
  }

}
