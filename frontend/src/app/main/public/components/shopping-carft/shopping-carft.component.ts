import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-shopping-carft',
  templateUrl: './shopping-carft.component.html',
  styleUrls: ['./shopping-carft.component.scss']
})
export class ShoppingCarftComponent implements OnInit {

  constructor(public dialo_ref: MatDialogRef<ShoppingCarftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snakbar : MatSnackBar) {

      console.log('dialog data',data);
  }
get grandtotal(){
  return this.data.reduce((acc,cur)=> acc + (cur.price * cur.qty),0)
}
  ngOnInit() {
  }
  removeitem(item,i){
    item.added=  false;
    this.data.splice(i,1)
  }
  close(){
    this.dialo_ref.close()
  }
  purshace(){
    this.snakbar.open("Payment gateway not available,it's just demo project",'ok',{duration:3000})
  }
}
