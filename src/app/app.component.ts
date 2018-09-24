import { Component } from '@angular/core';
import { Post } from 'src/app/posts/posts.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService:AuthService){
    
  }

  ngOnInit(){


    this.authService.autoAuthUser();



  }

  
}
