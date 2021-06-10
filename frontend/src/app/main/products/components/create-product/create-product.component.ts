import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInOut } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  animations : [fadeInOut]
})
export class CreateProductComponent implements OnInit {

  myForm: FormGroup;
  edit_record :boolean= false;
  task_id: any;
  constructor(private fb : FormBuilder,private router : Router,
    private progressbar : FuseProgressBarService,
    private api_service : ApiService,
    private snakbar : MatSnackBar,
    private ActivateRoute : ActivatedRoute
    ) { }
  onFormSubmit(){
    this.progressbar.show();
    const payload = this.myForm.value;
    payload.expire_date = formatDate(payload.expire_date ? payload.expire_date : new Date(),'yyyy-MM-dd','en','+006')
    if(!this.edit_record){
      this.api_service.create_products(payload).subscribe(res=>{
        console.log('Form payload',payload);
        console.log('api response',res);
        this.snakbar.open(res.message,'ok',{duration : 2000});
        this.progressbar.hide();
        this.router.navigate(['product','productslist']);
      },err=>{
        this.snakbar.open(err.error.message ? err.error.message : JSON.parse(err.error),'ok',{duration : 7000});
        this.progressbar.hide(); 
      })
    }else{
      this.api_service.update_products(payload,this.task_id).subscribe(res=>{
        this.snakbar.open(res.message,'ok',{duration : 2000});
        this.progressbar.hide();
        this.router.navigate(['product','productslist']);
      },err=>{
        this.snakbar.open(err.error.message ? err.error.message : JSON.parse(err.error),'ok',{duration : 7000});
        this.progressbar.hide(); 
      })
    }
    
  }
  product_getById(id){
    this.progressbar.show();
    this.api_service.getproductbyId(id).subscribe(res=>{
      console.log('getproductbyId (' + id +')',res);
      this.myForm.patchValue(res);
      this.progressbar.hide();
    },err=>{
      this.snakbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration : 5000});
      this.progressbar.hide();
    })
  }
  ngOnInit() {
    const getEditId = this.ActivateRoute.snapshot.paramMap.get('id');
    if(getEditId){
      this.task_id = parseInt(getEditId);
      this.edit_record = true;
      this.product_getById(this.task_id);
    }
    this.myForm = this.fb.group({
      product_name : ['',Validators.required],
      product_code : ['',Validators.required],
      price : ['',Validators.required],
      brand : ['',Validators.required],
      expire_date : [''],
      rating : [''],
      
    })
  }

}
