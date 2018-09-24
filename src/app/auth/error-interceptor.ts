import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "../error/error.component";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public matDialog:MatDialog){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | 
    HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       

        return next.handle(req).pipe(


            catchError((error:HttpErrorResponse)=>{

                let errorMessage="An unkown error occured";
                if(error.error.message){
                    errorMessage=error.error.message
                }
                
                console.log("******",error);
                this.matDialog.open(ErrorComponent,{data:{message:errorMessage}})
                
                return throwError(error);
            })
        )
    }
}