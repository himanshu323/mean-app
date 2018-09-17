import { Post } from "src/app/posts/posts.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
@Injectable({ providedIn: 'root' })
export class PostService{

  private  postsUpdated=new Subject<Post[]>();


    


private  posts:Post[]=[];


getAllPosts():Post[]{
    
return [...this.posts]

}

getPostListener(){
    return this.postsUpdated.asObservable();
}

addPost(post:Post){

    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
}


}