import '../css/style.css';
import '../css/nav.scss';
import {routes} from "./utils/router.js";


const redirectTo = (url:string) => {

    history.pushState(null, '', url);
    router()
    updateNavbar(location.pathname)
}
const updateNavbar = (url:string) => {
    const navList = document.querySelector(".nav-list") as HTMLUListElement;
    const listEls = navList.children;
    const [_, pathname] = url.split("/");
    for (const listEl of listEls) {
        const anchor = listEl.firstElementChild as HTMLAnchorElement;
        if(!(anchor instanceof HTMLAnchorElement)) return;
        const [_, href] = (anchor.getAttribute("href") as string).split("/");
        if(href === pathname) {
            anchor.classList.add("active");
        }else {
            anchor.classList.remove("active");
        }
    }

}
const router = () => {
    let match= {
        route:routes[1], isMatch: true, type:"movie"
    };
    routes.forEach(route => {
        if(route.path.includes("favorites") && location.pathname.includes("favorites")) {
            match = {
                route,
                isMatch: true,
                type:(location.pathname.split("/").pop() === "movies" ? "movie" : "tv") as string
            }
        }
        if(route.path === location.pathname) {
            match = {
                route,
                isMatch: true,
                type:route.type as string
            }
        }
    })
    let main:HTMLDivElement = document.getElementById('main') as HTMLDivElement
    const view = new match.route.view(main, (match.type ) as "movie"|"tv");
    const searchEl = document.getElementById("search") as HTMLInputElement;
    searchEl["onsearch"] = view.handleSearchEvent;

}

window.addEventListener("popstate", ()=> {
    router();
})
document.addEventListener('DOMContentLoaded', ()=> {
    router()
    document.body.addEventListener('click', (e:any)=> {
        const target = e.target
        if(target.matches("[data-link]") && target instanceof HTMLAnchorElement) {
            e.preventDefault();
            if(location.href === e.target.href) return;
            redirectTo(target.href);
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

