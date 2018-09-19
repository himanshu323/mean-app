import { Component, OnDestroy } from "@angular/core";
import { Input } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { PostService } from "src/app/posts/post.service";
import { OnInit } from "@angular/core";
import {Subscription} from "rxjs"



@Component({

    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css']
})
export class PostsListComponent implements OnInit,OnDestroy{

    isLoading=false;
    ngOnDestroy(): void {
        this.postSubscription.unsubscribe();
    }
    postSubscription:Subscription;
    ngOnInit(): void {
        this.isLoading=true;
      this.postService.getAllPosts();

     this.postSubscription=   this.postService.getPostListener().subscribe((posts)=>{
         this.isLoading=false;
            this.posts=posts;

        })
    }
// posts=[
// //     {
// //     title:"Hello",
// //     content: "How are you?"
// // }, {
// //         title: "Good",
// //         content: "How are you?"
// //     }, {
// //         title: "Test",
// //         content: "How are you?"
// //     }

// ]
   @Input() posts:Post[] = [];

   constructor(private postService:PostService){

   }

   onDelete(postId:string){

    this.postService.deletePost(postId);
   }
}