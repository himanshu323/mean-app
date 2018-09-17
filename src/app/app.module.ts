import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { PostCreateComponent } from 'src/app/posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule} from "@angular/material"
import { HeaderComponent } from 'src/app/header/header.component';
import { PostsListComponent } from 'src/app/posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,HeaderComponent,PostsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,MatInputModule,MatFormFieldModule,MatCardModule,MatButtonModule,MatToolbarModule,MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
