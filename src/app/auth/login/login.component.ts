import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";


@Component({
    templateUrl:'./login.component.html',
    styleUrls :['./login.component.css']
})
export class LoginComponent{

    isLoading=false;

constructor(private authService:AuthService){


}

    onLogin(form:NgForm){
        //this.isLoading=true;

        if(form.invalid){
            return;
        }
        console.log(form);

        

        this.authService.createUser(form.value.email,form.value.password);


        form.resetForm();



    }
}