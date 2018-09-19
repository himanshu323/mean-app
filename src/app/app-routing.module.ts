import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

import {RouterModule,Routes} from "@angular/router"
import { PostsListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";


const routes:Routes=[{
    path:'',component:PostsListComponent
},{
    path:'create',component:PostCreateComponent
},
{
    path:'edit/:id',component:PostCreateComponent
}]
@NgModule({

imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRoutingModule{



}