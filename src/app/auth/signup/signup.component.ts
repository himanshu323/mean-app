import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    templateUrl:'./signup.component.html',
    styleUrls :['./signup.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy{

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
    isLoading=false;

    authSub:Subscription;

constructor(private authService:AuthService){




}

ngOnInit(){


  this.authSub=  this.authService.getAuthStatusListener().subscribe((auth)=>{

        this.isLoading=false;
    })
}

    onSignUp(form:NgForm){
        //this.isLoading=true;
        this.isLoading=true;
        if(form.invalid){
            return;
        }
        console.log(form);

        

        this.authService.createUser(form.value.email,form.value.password);


        form.resetForm();



    }
}