import { Component } from "@angular/core";
import { Post } from "../post.model";
import { Subscription } from "rxjs";
import { PostService } from "../post.service";

@Component({
    selector:"app-post-list",
    templateUrl:"./post-list.component.html",
    styleUrls: ["./post-list.component.css"]
})
export class PostListComponent{

    posts: Post[] = [];
    private postsSub!: Subscription;

    constructor(public postService: PostService){}

    ngOnInit(){
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
            console.log(this.posts);
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}