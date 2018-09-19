import { Component, OnInit } from "@angular/core";

import { Output,EventEmitter } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { PostService } from "src/app/posts/post.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";




@Component({

    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  mode="create"
  postId:string;
  post:Post
  isLoading=false;
    imagePreview:string;
  form:FormGroup;


    ngOnInit(): void {

        this.form=new FormGroup({

            'title': new FormControl(null,{
                validators:[Validators.required,Validators.minLength(3)]
            }),

            'content':new FormControl(null,{
                validators:[Validators.required]
            }),

            'image':new FormControl(null,{
                validators:[Validators.required]
            })
        })
       
        
        this.route.paramMap.subscribe((params)=>{

            
            if(params.has("id")){

                this.mode="edit";
                this.postId=params.get("id");
                this.isLoading=true;
                this.postService.getPost(this.postId).subscribe(post=>{
                    this.isLoading=false
                    this.post={
                        id:post._id,
                        title:post.title,
                        content:post.content
                    }
                    this.form.setValue({
                        'title':this.post.title,
                        'content':this.post.content
                    })
                });

            }

            else{
                this.mode="create";
                this.post=null;
            }

        })
    }
    constructor(private postService:PostService,private route:ActivatedRoute){

    }

    onImagePicked(event:Event){

        let file=(event.target as HTMLInputElement).files[0];
        this.form.patchValue({
            image:file
        })
        this.form.get('image').updateValueAndValidity();

        console.log(file);
        console.log(this.form);

        let reader=new FileReader();
        reader.onload=()=>{
            this.imagePreview=reader.result;
        }

        reader.readAsDataURL(file);

    }

    onSavePost(){
        this.isLoading=true;

        if(this.form.invalid){
            return
        }

        if(this.mode==="create"){
            
            // console.dir(textArea);
             let newPost:Post={
                 title:this.form.value.title,
                 content:this.form.value.content,
                 id:null
             }
     
             this.postService.addPost(newPost);
     
        }
        else{

          
            let newPost:Post={
                title:this.form.value.title,
                content:this.form.value.content,
                id:this.postId
            }
    
            this.postService.updatePost(newPost.id,newPost.title,newPost.content);

        }
       
        this.form.reset();

    }


    

}