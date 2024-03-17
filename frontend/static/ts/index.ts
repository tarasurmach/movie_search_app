import '../css/style.css';
import '../css/nav.scss';
import {routes} from "./utils/router.js";


const redirectTo = (url:string) => {
    if(url === location.pathname) return;
    history.pushState(null, '', url);
    router()
}

const router = () => {
    let match= {
        route:routes[1], isMatch: true
    };
    routes.forEach(route => {
        if((route.path.includes("favorites") && location.pathname.includes("favorites")) || route.path === location.pathname) {
            match = {
                route,
                isMatch: true
            }
        }
    })
    let main:HTMLDivElement = document.getElementById('main') as HTMLDivElement
    const type = location.pathname.split("/").pop() === "movies" ? "movie" : "tv";
    const view = new match.route.view(main, (match.route.type ?? type) as "movie"|"tv");
    const searchEl = document.getElementById("search") as HTMLInputElement;
    searchEl["onsearch"] = view.handleSearchEvent;

}

window.addEventListener("popstate", ()=> {
    router();
})
document.addEventListener('DOMContentLoaded', ()=> {
    router()
    document.body.addEventListener('click', (e:any)=> {
        if(e.target.matches("[data-link]") && e.target instanceof HTMLAnchorElement) {
            e.preventDefault();
            if(location.href === e.target.href) return;
            redirectTo(e.target.href)
        }
    });
    (document.getElementById("select") as HTMLSelectElement).addEventListener("change", (e:Event) => {
        const selectEl = e.currentTarget as HTMLSelectElement;
        const newUrl = "/favorites" + selectEl.value;
        if(newUrl === location.pathname) return;
        redirectTo(newUrl)
    })
    }
)

