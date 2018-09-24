import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

import {RouterModule,Routes} from "@angular/router"
import { PostsListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { SignUpComponent } from "src/app/auth/signup/signup.component";
import { LoginComponent } from "src/app/auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";


const routes:Routes=[{
    path:'',component:PostsListComponent
},{
    path:'create',component:PostCreateComponent,canActivate:[AuthGuard]
},
{
    path:'edit/:id',component:PostCreateComponent,canActivate:[AuthGuard]
},{
    path:'auth',loadChildren:'./auth/auth-module#AuthModule'
}]
@NgModule({

imports:[RouterModule.forRoot(routes)],

providers:[AuthGuard],
exports:[RouterModule]
})
export class AppRoutingModule{



}