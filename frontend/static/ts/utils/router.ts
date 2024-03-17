import {Series} from "../views/Series.js";
import {Favorites} from "../views/Favorites.js";


export const routes = [
    {
        path: '/series',
        view: Series,
        type: "tv"
    },
    {
        path: '/movies',
        view: Series,
        type:"movie"
    },
    {
        path: '/favorites',
        view: Favorites,

    },
]