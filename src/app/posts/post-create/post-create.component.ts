import { Component, OnInit, OnDestroy } from "@angular/core";

import { Output,EventEmitter } from "@angular/core";
import { Post } from "src/app/posts/posts.model";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { PostService } from "src/app/posts/post.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimetype } from "src/app/posts/post-create/mime-type.validator";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { subscribeOn } from "rxjs/operators";




@Component({

    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,OnDestroy{

    ngOnDestroy(): void {
        this.authSub.unsubscribe();

    }
  mode="create"
  postId:string;
  post:Post
  isLoading=false;
    imagePreview:string;
  form:FormGroup;

  authSub:Subscription;


    ngOnInit(): void {


        this.authSub=this.authService.getAuthStatusListener().subscribe(e=>{
            this.isLoading=false;
        })
        this.form=new FormGroup({

            'title': new FormControl(null,{
                validators:[Validators.required,Validators.minLength(3)]
            }),

            'content':new FormControl(null,{
                validators:[Validators.required]
            }),

            'image':new FormControl(null,{
                validators:[Validators.required],asyncValidators:[mimetype]
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
                        content:post.content,
                        imagePath:post.imagePath,
                        creator:post.creator
                     
                    }
                    this.form.setValue({
                        'title':this.post.title,
                        'content':this.post.content,
                        'image': this.post.imagePath
                    })
                });

            }

            else{
                this.mode="create";
                this.post=null;
            }

        })
    }
    constructor(private postService:PostService,private route:ActivatedRoute,private authService:AuthService){

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
                 id:null,
                 imagePath:this.form.value.image,
                 creator:null
              
             }
     
             this.postService.addPost(newPost,this.form.value.image);
     
        }
        else{

          
            let newPost:Post={
                title:this.form.value.title,
                content:this.form.value.content,
                id:this.postId,
                imagePath: this.form.value.image,
                creator:null
                
            }
    
            this.postService.updatePost(newPost.id,newPost.title,newPost.content,newPost.imagePath);

        }
       
        this.form.reset();

    }


    

}