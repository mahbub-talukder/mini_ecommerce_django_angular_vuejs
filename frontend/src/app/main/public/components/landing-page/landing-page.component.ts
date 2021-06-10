import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fadeInOut } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { ShoppingCarftComponent } from '../shopping-carft/shopping-carft.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [fadeInOut]
})
export class LandingPageComponent implements OnInit {
  spinner: boolean;

  constructor(private _fuseConfigService: FuseConfigService,
    private api_service : ApiService,
    private progress : FuseProgressBarService,
    private snackbar : MatSnackBar,
    public dialog : MatDialog) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    }
  }

  dataList:any=[];
  errorMessage:any=''
  qty:number=1;
  increment(){
    this.qty +=1
  }
  decrement(){
    if(this.qty>1){
      this.qty -=1
    } 
  }

  getAllproductdata() {
    this.spinner = true;
    this.api_service.allproductList().subscribe(res => {
      this.dataList = res;
      console.log('getAllproducts', res);
      this.spinner = false;
    }, err => {
      this.errorMessage =  JSON.stringify(err.error);
      this.spinner = false;
      this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error), 'ok', { duration: 6000 });

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
  craft_details(){
    const dialog_ref = this.dialog.open(ShoppingCarftComponent,{
      data : this.craftlist,
      panelClass : 'custom_dialog_css'
    })
    dialog_ref.afterClosed().subscribe(res=>{
      console.log('result',res);
      
    })
  }

  ngOnInit() {
    this.getAllproductdata();
  }

}
