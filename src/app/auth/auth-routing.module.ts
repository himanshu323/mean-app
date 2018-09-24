import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";


const routes:Routes=[{
    path :'signUp',component:SignUpComponent
    }, {
        path: 'login', component: LoginComponent
    }]
@NgModule({

    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
    
})
export class AuthRoutingModule{

}