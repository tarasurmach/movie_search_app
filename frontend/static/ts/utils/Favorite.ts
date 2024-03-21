import {LocalStorage, MovieInfo} from "./constants.js";

export class Favorite {
    private likes:MovieInfo[];
    private results:any[];
    constructor(mainEl:HTMLDivElement, private type:"movie"|"tv") {
        console.log("hello")
        this.likes = LocalStorage.getFromStorage(type);
        this.attachListener(mainEl)
    }
    attachListener(mainEl:HTMLDivElement) {
        console.log(mainEl)
        mainEl.onclick =  (e:MouseEvent) => {
            const target = e.target as HTMLDivElement;

            if(target.matches(".like")) {
                console.log("huh");
                const id = target.dataset.id as string;
                this.liked = [...this.liked, {id, dateAdded:new Date().toISOString()}]
                this.updateStorage()
                target.className = "dislike fa fa-thumbs-down";
            }else if(target.matches(".dislike")) {
                this.liked = this.likes.filter(like => like.id !== target.dataset.id as string);
                this.updateStorage();
                target.className = "like fa fa-thumbs-up";
            }
        }
    }
    updateStorage() {
        LocalStorage.addToStorage(this.liked, this.type)
    }
    get liked() {
        return this.likes
    }
    set liked(likes:MovieInfo[]) {
        this.likes = likes
    }
    isLiked(movieId:number) {
        return this.liked.some(({id}:MovieInfo) => +id == movieId);
    }
    set movies(movieArr:any[]) {
        this.results = movieArr;
    }
    get movies() {
        return this.results
    }
}