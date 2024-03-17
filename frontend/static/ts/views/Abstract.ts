import View from "../types.js";
import {Favorite} from "../utils/Favorite.js";
import {URLS} from "../utils/constants.js";
export type MediaType = "tv"|"movie"
export class Abstract implements View {
    protected favorite:Favorite;
    protected constructor(protected mainEl:HTMLDivElement, protected type:MediaType) {
        this.favorite = new Favorite(mainEl, type);
        this.setTitle();
        this.updateUI()
    }

    setTitle() {
        const [_, title] = location.pathname.split("/");
        console.log(title)
        document.title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    handleSearchEvent = (e:Event)=> {
            e.preventDefault();
            console.log(e.target);
            const target = e.currentTarget as HTMLInputElement;
            if(!target.value) {
                this.fetchMovies(URLS.POPULAR_API(this.type));
                return;
            }
            this.fetchMovies(URLS.SEARCH_URL(this.type, target.value));
            target.value = '';

        }
    renderUI(data:any[]) {
        this.mainEl.innerHTML = '';
        data.reduce((accum:HTMLDivElement, item:any) => {
            let {id, title, poster_path, vote_average, overview, name, profile_path, backdrop_path, media_type} = item;
            if(!title){ title = name}
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
        <span id="like"  data-id=${id} data-type=${media_type ?? this.type} class="${this.favorite.liked.includes(`${id}`)?"dislike fa fa-thumbs-down":"like fa fa-thumbs-up"}"></span>
        <img src="${(URLS.IMG_URL + (poster_path??profile_path??backdrop_path))}" alt="${title}">
        
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="span"> ${Math.round(vote_average * 10) / 10}</span>
            
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
            accum.appendChild(movieEl);
            return accum
        }, this.mainEl);
        return this.mainEl;
    }

    fetchMovies(url:string) {
        fetch(url).then(response => {
            if(!response.ok) {
                throw new Error("Request failed. Error status: " + response.status);
            }
            return response.json()
        }).then(data =>{
            this.renderUI(data.results)
        }).catch((e:unknown)=>{
            if(e instanceof Error) {
                console.error(e)
            }
        })
    }
    updateUI() {
        const select = (document.getElementById("fav") as HTMLSelectElement)
        if(location.pathname.includes('favorites')) {
            select.style.display = "block";
        }
        else {
            select.style.display = "none";
        }
    }

}