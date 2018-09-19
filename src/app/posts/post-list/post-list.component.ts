import { Component, OnDestroy } from "@angular/core";
import { Input } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { PostService } from "src/app/posts/post.service";
import { OnInit } from "@angular/core";
import {Subscription} from "rxjs"
import { PageEvent } from "@angular/material";



@Component({

    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css']
})
export class PostsListComponent implements OnInit,OnDestroy{

    isLoading=false;

    length=0;

    pageSizeOptions=[1,2,3,5,10];

    currentPage=1

    postsPerPage=2;

    // onChangedPage(page:PageEvent){
    //     this.isLoading=true;
    //     console.log("Page",page);
    //     this.currentPage=+page.pageIndex + 1;
    //     this.postsPerPage=page.pageSize;
    //     console.log(this.currentPage,this.postsPerPage,"****");
    //     this.postService.getAllPosts(this.postsPerPage,this.currentPage);
        
    // }

    onChangedPage(page:PageEvent){
        console.log(page);
        this.currentPage=+page.pageIndex + 1;
        this.postsPerPage=page.pageSize;
        console.log(this.currentPage,this.postsPerPage,"****");
        this.postService.getAllPosts(this.postsPerPage,this.currentPage);
    }
    ngOnDestroy(): void {
        this.postSubscription.unsubscribe();
    }
    postSubscription:Subscription;
    ngOnInit(): void {
        this.isLoading=true;
      this.postService.getAllPosts(this.postsPerPage,this.currentPage);

     this.postSubscription=   this.postService.getPostListener().subscribe((postsData)=>{
         this.isLoading=false;
            this.posts=postsData.posts;
            this.length=postsData.postsCount

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

    this.postService.deletePost(postId).subscribe(()=>{

        this.postService.getAllPosts(this.postsPerPage,this.currentPage);

    });
   }
}