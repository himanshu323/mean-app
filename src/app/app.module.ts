import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { PostCreateComponent } from 'src/app/posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule} from "@angular/material"
import { HeaderComponent } from 'src/app/header/header.component';
import { PostsListComponent } from 'src/app/posts/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from 'src/app/auth/signup/signup.component';
import { LoginComponent } from 'src/app/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,HeaderComponent,PostsListComponent,SignUpComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,MatInputModule,MatFormFieldModule,MatCardModule,MatButtonModule,MatToolbarModule,MatExpansionModule,HttpClientModule
    ,AppRoutingModule,MatProgressSpinnerModule,ReactiveFormsModule,MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
