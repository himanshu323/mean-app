import { Post } from "src/app/posts/posts.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { HttpClient } from "@angular/common/http";

import {map }from  'rxjs/operators'
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({ providedIn: 'root' })
export class PostService{

    BACKEND_POSTS_URL=environment.apiUrl+"posts/"
    

constructor(private http:HttpClient,private router:Router){

}

  private  postsUpdated=new Subject<{posts:Post[],postsCount:number}>();

  postSubscription:Subscription;


    


private  posts:Post[]=[];


getAllPosts(pageSize,currentPage){
    let queryParam=`?pageSize=${pageSize}&currentPage=${currentPage}`;
    this.http.get<{message:string,posts:any,maxPages:number}>(this.BACKEND_POSTS_URL +queryParam).
    pipe(map(postData=>{


       return{posts: postData.posts.map(post=>{
            return{
            title:post.title,
            content:post.content,
            id:post._id,
            imagePath:post.imagePath,
            creator:post.creator
        }}),
        postsCount:postData.maxPages}
    }))
.
    subscribe((data)=>{
        console.log(data);
       this.posts= data.posts;
       this.postsUpdated.next({posts:[...this.posts],postsCount:data.postsCount});
    })


}

getPost(postId:string){

   return this.http.get<{_id:string,title:string,content:string,imagePath:string,creator:string}>(this.BACKEND_POSTS_URL+postId);
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
            imagePath: image,
            creator:null
        };
    }

    this.http.put(this.BACKEND_POSTS_URL+postId,postData).subscribe((data)=>{

//    let OldIndex= this.posts.findIndex(post=>post.id===postId);
//         const post: Post = {
//             id: postId,
//             title: title,
//             content: content,
//             imagePath: ""
//         };
//    this.posts[OldIndex]=post;

//    console.log(data)
// ;
//    this.postsUpdated.next([...this.posts]);

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
    this.http.post<{message:string,postId:string}>(this.BACKEND_POSTS_URL,postData).subscribe((data)=>{
        // post.id=data.postId;
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);

        console.log(data);
        this.router.navigate(["/"])
    })
   
}

deletePost(postId:string){

    return this.http.delete(this.BACKEND_POSTS_URL+postId);

}


}