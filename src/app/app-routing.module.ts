import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

import {RouterModule,Routes} from "@angular/router"
import { PostsListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { SignUpComponent } from "src/app/auth/signup/signup.component";
import { LoginComponent } from "src/app/auth/login/login.component";


const routes:Routes=[{
    path:'',component:PostsListComponent
},{
    path:'create',component:PostCreateComponent
},
{
    path:'edit/:id',component:PostCreateComponent
},{
    path :'signUp',component:SignUpComponent
    }, {
        path: 'login', component: LoginComponent
    }]
@NgModule({

imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRoutingModule{



}