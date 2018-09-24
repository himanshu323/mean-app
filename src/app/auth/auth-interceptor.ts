import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService:AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | 
    HttpResponse<any> | HttpUserEvent<any>> {
        
           let token= this.authService.getToken();

          let cloneReq= req.clone({
               headers:req.headers.set("Authorization","Bearer "+token)
           })


        return next.handle(cloneReq);
    }
}