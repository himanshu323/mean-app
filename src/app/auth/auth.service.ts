import { Injectable } from "@angular/core";

import { AuthData } from "src/app/auth/auth.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Route, Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})

export class AuthService{

    BACKEND_USER_URL=environment.apiUrl+ "user/"

    private token:string;

    private userId:string;

    private tokenTimer;

    private isAuthenticated=false;


    private authStatusListener=new Subject<boolean>();

    constructor(private http:HttpClient,private router:Router){

    }

    getUserId(){
        return this.userId;
    }

    getIsAuthenticated(){
        return this.isAuthenticated;
    }

    getAuthStatusListener(){

        return this.authStatusListener.asObservable();

    }
    getToken(){
        return this.token;
    }

    createUser(email:string,password:string){



        let auth:AuthData={
            email,password
        }

        this.http.post(this.BACKEND_USER_URL+ "signUp",auth).subscribe((data)=>{

        console.log(data);
        this.router.navigate(['/']);
        },(error)=>{

            this.authStatusListener.next(false);
        })

    }


    login(email:string,password:string){

        let authData:AuthData={
            email,password
        }

        this.http.post<{token:string,expiresIn:number,userId:string}>(this.BACKEND_USER_URL+"login",authData).subscribe(response=>{

        this.token=response.token;

        if(this.token){

        // setTimeout(()=>{

        //     this.logOut();
        // },response.expiresIn*1000)

        this.setAutoTimer(response.expiresIn)
        const now=new Date();
        const expirationDate=new Date(now.getTime()+ response.expiresIn*1000);

        this.saveAuthData(this.token,expirationDate,response.userId);

        this.userId=response.userId;



        this.isAuthenticated=true;

        this.authStatusListener.next(true);

        this.router.navigate(['/']);

        }

        }, (error)=>{

            this.authStatusListener.next(false);
        })
    }

    logOut(){

        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.removeAuthData();

        clearTimeout(this.tokenTimer);

        this.router.navigate(['/']);

    }


    saveAuthData(token:string,expiresIn:Date,userId:string){

        localStorage.setItem("token",token);

        localStorage.setItem("expirationDate",expiresIn.toISOString());

        localStorage.setItem("userId",userId)
    }


    removeAuthData(){

        localStorage.removeItem("token");

        localStorage.removeItem("expirationDate");

        localStorage.removeItem("userId");
    }


    getAuthData(){

        let token =localStorage.getItem("token");

        let expirationDate=localStorage.getItem("expirationDate");

        let userId=localStorage.getItem("userId")

        if(!token || !expirationDate ){
            return;
        }

        return{
            token,expirationDate:new Date(expirationDate),userId
        }
    }


    setAutoTimer(duration){

       this.tokenTimer= setTimeout(()=>{

            this.logOut();
        },duration*1000)


    }

    autoAuthUser(){

        let authData=this.getAuthData();

        if(!authData){
            return;
        }

        let now =new Date();

        let expiresIn=authData.expirationDate.getTime()-now.getTime();

        if(expiresIn>0){

            this.userId=authData.userId;

            this.setAutoTimer(expiresIn/1000);

            this.authStatusListener.next(true);

            this.isAuthenticated=true;

            this.token=authData.token;
        }
    }

}