import { Component } from "@angular/core";

import { Output,EventEmitter } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { PostService } from "src/app/posts/post.service";



@Component({

    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{

  
    
    constructor(private postService:PostService){

    }

    onAddPost(form:NgForm){

        if(form.invalid){
            return
        }
        console.log(form);
       // console.dir(textArea);
        let newPost:Post={
            title:form.value.title,
            content:form.value.content
        }

        this.postService.addPost(newPost);

        form.resetForm();

    }


    

}