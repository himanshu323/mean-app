import { Injectable } from "@angular/core";

import { AuthData } from "src/app/auth/auth.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})

export class AuthService{


    constructor(private http:HttpClient){

    }

    createUser(email:string,password:string){



        let auth:AuthData={
            email,password
        }

        this.http.post("http://localhost:3001/api/user/signUp",auth).subscribe((data)=>{

        console.log(data);
        })

    }

}