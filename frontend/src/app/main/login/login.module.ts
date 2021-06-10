import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPlatformLoginModule } from '@packages/app-platform-login/app-platform-login.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@packages/material/material.module';
import { Login2Component } from './components/login2/login-2.component';


const routes: Routes = [

    {
        path: '',
        component:  Login2Component 
    },
   
];

@NgModule({
    declarations: [Login2Component],
    imports: [
        CommonModule,
        AppPlatformLoginModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
})
export class LoginModule { }
