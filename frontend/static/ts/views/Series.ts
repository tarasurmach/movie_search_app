import {Abstract} from "./Abstract.js";
import {URLS} from "../utils/constants.js";
interface ResponseData {
    results
}
export class Series extends Abstract {
    constructor(mainEl:HTMLDivElement, type:"tv"|"movie") {
        super(mainEl, type);

        this.fetchMovies(URLS.POPULAR_API(type))
    }



}

