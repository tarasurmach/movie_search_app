import {Abstract, MediaType} from "./Abstract.js";
import {URLS} from "../utils/constants.js";
export class Favorites extends Abstract  {
    private results:{title?:string, overview:string, name?:string}[] = []
    constructor(mainEl:HTMLDivElement, type:MediaType) {
        super(mainEl, type);
        console.log(type)
        this.fetchMovies();
        this.updateUI();
    }
    fetchMovies(url?:string) {
        if(url) {
            super.fetchMovies(url);
            return;
        }
        Promise.allSettled(this.favorite.liked.map(async id => {
            const result = await fetch(URLS.SINGLE_MEDIA(this.type, id));
            if(!result.ok) {
                throw new Error("Request failed. Status: " + result.status);
            }
            return result.json();

        })).then(results=> {
            this.results = results.map((el:any & {value:any})=> el?.value);
            this.renderUI(this.results)
        });
    }
    handleSearchEvent = (e:Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value.toLowerCase();
        if(value === "") return;
        const result = this.results.filter(({title, overview, name}) => {
            const query = this.type === "movie" ? title?.toLowerCase() : name?.toLowerCase();
            return query?.includes(value) || overview.toLowerCase().includes(value)
        });
        this.renderUI(result);
        target.value = "";
    }
}