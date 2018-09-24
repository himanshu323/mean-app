import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from 'src/app/header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './auth/error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/app-post.module';
import { AuthModule } from './auth/auth-module';

@NgModule({
  declarations: [
    AppComponent,HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    
    BrowserAnimationsModule,AppRoutingModule,
    HttpClientModule,
   AngularMaterialModule,
    PostsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
