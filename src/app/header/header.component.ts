import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({

    selector:'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

    userIsAuthenticated=false;

    private authStatusSub:Subscription;
    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
    constructor(private authService:AuthService){


    
    }

    ngOnInit(){

    this.userIsAuthenticated=this.authService.getIsAuthenticated();
       this.authStatusSub= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
            this.userIsAuthenticated=isAuthenticated;
        })
        
    }

    onLogout(){
        this.authService.logOut();
    }
}