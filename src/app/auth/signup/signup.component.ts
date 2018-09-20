import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";


@Component({
    templateUrl:'./signup.component.html',
    styleUrls :['./signup.component.css']
})
export class SignUpComponent{

    isLoading=false;

constructor(private authService:AuthService){


}

    onSignUp(form:NgForm){
        //this.isLoading=true;

        if(form.invalid){
            return;
        }
        console.log(form);

        

        this.authService.createUser(form.value.email,form.value.password);


        form.resetForm();



    }
}