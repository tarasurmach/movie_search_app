import {LocalStorage, MovieInfo} from "./constants.js";

export class Favorite {
    private likes:MovieInfo[];

    constructor(mainEl:HTMLDivElement, private type:"movie"|"tv") {
        console.log("hello")
        this.likes = LocalStorage.getFromStorage(type);
        this.attachListener(mainEl)
    }
    attachListener(mainEl:HTMLDivElement) {
        console.log(mainEl)
        mainEl.onclick =  (e:MouseEvent) => {
            const target = e.target as HTMLDivElement;
            console.log(target)
            if(target.matches(".like")) {
                console.log("huh");
                const dateLiked = new Date();
                const dateAdded = dateLiked.toISOString();
                const id = target.dataset.id as string;
                this.likes.push({id, dateAdded});

                this.updateStorage()
                target.className = "dislike fa fa-thumbs-down";
            }else if(target.matches(".dislike")) {
                this.likes = this.likes.filter(like => like.id !== target.dataset.id as string);
                this.updateStorage();
                target.className = "like fa fa-thumbs-up";
            }
        }
    }
    updateStorage() {
        LocalStorage.addToStorage(this.likes, this.type)
    }
    get liked() {
        return this.likes
    }

}