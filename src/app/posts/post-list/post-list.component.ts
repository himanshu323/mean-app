import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { PostService } from "src/app/posts/post.service";
import { OnInit } from "@angular/core";



@Component({

    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css']
})
export class PostsListComponent implements OnInit{
    ngOnInit(): void {
        this.posts=this.postService.getAllPosts();

        this.postService.getPostListener().subscribe((posts)=>{
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
}