import { Post } from "src/app/posts/posts.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { HttpClient } from "@angular/common/http";

import {map }from  'rxjs/operators'
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
@Injectable({ providedIn: 'root' })
export class PostService{

constructor(private http:HttpClient,private router:Router){

}

  private  postsUpdated=new Subject<Post[]>();

  postSubscription:Subscription;


    


private  posts:Post[]=[];


getAllPosts(){
    
    this.http.get<{message:string,posts:any}>("http://localhost:3001/api/posts").
    pipe(map(postData=>{


       return postData.posts.map(post=>{
            return{
            title:post.title,
            content:post.content,
            id:post._id,
            imagePath:post.imagePath
        }})
    }))
.
    subscribe((data)=>{
       this.posts= data;
       this.postsUpdated.next([...this.posts]);
    })


}

getPost(postId:string){

   return this.http.get<{_id:string,title:string,content:string,imagePath:string}>("http://localhost:3001/api/posts/"+postId);
}

updatePost(postId,title,content,image){

    let postData: Post | FormData;
    if (typeof image === "object") {
        postData = new FormData();
        postData.append("id", postId);
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
    } else {
        postData = {
            id: postId,
            title: title,
            content: content,
            imagePath: image
        };
    }

    this.http.put("http://localhost:3001/api/posts/"+postId,postData).subscribe((data)=>{

   let OldIndex= this.posts.findIndex(post=>post.id===postId);
        const post: Post = {
            id: postId,
            title: title,
            content: content,
            imagePath: ""
        };
   this.posts[OldIndex]=post;

   console.log(data)
;
   this.postsUpdated.next([...this.posts]);

   this.router.navigate(["/"])
    })
}

getPostListener(){
    return this.postsUpdated.asObservable();
}



addPost(post:Post,image){

    const postData=new FormData();
    postData.append('title',post.title);
    postData.append('content',post.content);
    postData.append('image',image,post.title)
    this.http.post<{message:string,postId:string}>("http://localhost:3001/api/posts",postData).subscribe((data)=>{
        post.id=data.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])
    })
   
}

deletePost(postId:string){

    this.http.delete("http://localhost:3001/api/posts/"+postId).subscribe((data)=>{

       this.posts=this.posts.filter(post=>post.id !==postId)

       this.postsUpdated.next([...this.posts]);


    })

}


}