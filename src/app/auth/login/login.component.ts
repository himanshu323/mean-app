import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    templateUrl:'./login.component.html',
    styleUrls :['./login.component.css']
})
export class LoginComponent{

    authSub:Subscription;
    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }

    isLoading=false;

constructor(private authService:AuthService){


}

ngOnInit(){

   this.authSub= this.authService.getAuthStatusListener().subscribe(auth=>{
        this.isLoading=false;
    })
}

    onLogin(form:NgForm){
        //this.isLoading=true;
        this.isLoading=true;
        if(form.invalid){
            return;
        }
        console.log(form);

        
        
        this.authService.login(form.value.email,form.value.password);


        form.resetForm();



    }
}