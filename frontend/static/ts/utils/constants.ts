import {MediaType} from "../views/Abstract.js";

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'api_key=8beb1318b1c6bd8b3265412ef837fcf4';

export type MovieInfo = {
    id:string,
    dateAdded:string
}

export const URLS = {
    POPULAR_API(type:"tv"|"movie") {
        return BASE_URL + `/${type}/popular?` + API_KEY
    },
    IMG_URL: 'https://image.tmdb.org/t/p/w500',
    SEARCH_URL(type:"tv"|"movie", value:string) {
        return `${BASE_URL}/search/${type}?${API_KEY}&language=en-US&page=1&include_adult=true&query=${value}`
    },
    SINGLE_MEDIA(type:MediaType, url:string) {
        return `https://api.themoviedb.org/3/${type}/${url}?${API_KEY}`
    }
}

export class LocalStorage {
    static addToStorage(arr: MovieInfo[], type:"movie"|"tv") {
        return localStorage.setItem(type, JSON.stringify(arr))
    }
    static getFromStorage(key: string): MovieInfo[] {
        const value = (localStorage.getItem(`${key}`));
        if(value === null) return [];
        return JSON.parse(value) ?? [];
    }
}