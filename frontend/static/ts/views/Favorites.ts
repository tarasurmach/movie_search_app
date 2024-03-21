import {Abstract, MediaType} from "./Abstract.js";
import {Base, MovieInfo, sortOptions, URLS} from "../utils/constants.js";
export class Favorites extends Abstract  {
    private results:Base[] = [];
    constructor(mainEl:HTMLDivElement, type:MediaType) {
        super(mainEl, type);
        console.log(type);
        this.fetchMovies();
        this.updateUI();
    }
    fetchMovies(url?:string) {
        if(url) {
            super.fetchMovies(url);
            return;
        }
        Promise.allSettled(this.favorite.liked.map(async ({id, dateAdded}:MovieInfo)=> {
            const result = await fetch(URLS.SINGLE_MEDIA(this.type, id));
            if(!result.ok) {
                throw new Error("Request failed. Status: " + result.status);
            }
            const json = await result.json();

            return {...json, dateAdded, type:this.type};

        })).then(results=> {
            console.log(results);
            this.results = results.map((el:any & {value:any})=> el?.value);
            this.renderUI(this.results);
        });
    }
    handleSearchEvent = (e:Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value.toLowerCase();
        if(value === "") return;
        const result = this.results.filter((info:Base) => {
            const query = info.type === "movie" ? info.title.toLowerCase() : info.name.toLowerCase();
            return query?.includes(value) || info.overview.toLowerCase().includes(value)
        });
        this.renderUI(result.length === 0 ? this.results : result);
        target.value = "";
    }
    sortMovies = (e:Event) => {
        const target = e.target as HTMLSelectElement;
        this.results.sort((a, b) => {
           switch (target.value) {
               case "dateAdded": {
                   const dateA = new Date(a.dateAdded) ;
                   const dateB = new Date(b.dateAdded);
                   return dateB > dateA ? 1 : -1;
               }
               case "title" : {
                   const isTV = a.type === "tv" && b.type ==="tv"
                   return isTV ? a.name.localeCompare(b.name) : a.title.localeCompare(b.title)
               }
               case "vote_average" : {
                   return a.vote_average > b.vote_average ? -1 : 1;
               }
               default: return 1
           }
        })
        console.log(this.results);
        super.renderMovies(this.results)
    }
    renderUI(data: any[]): HTMLDivElement {
        const container =  super.renderUI(data);
        const div = document.createElement("div");
        const selectEl = document.createElement("select");
        let options = ""
        for (let key in sortOptions) {
            options += `<option value="${key}">${sortOptions[key]}</option>`
        }
        selectEl.innerHTML = options;
        selectEl.onchange = this.sortMovies;

        div.append(selectEl, container);
        this.mainEl.replaceChildren(div);
        return div
    }
}