import Home from "./pages/Home.js";
import NewPost from "./pages/NewPost.js";
import PostDetail from "./pages/PostDetail.js";

const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    // console.log(pathToRegex("/postdetail/:id"));
    const routes = [
        { path: "/", view: Home },
        { path: "/newpost", view: NewPost },
        // { path: "/postdetail", view: PostDetail },
        { path: "/postdetail/:id", view: PostDetail },
    ];

    const pageMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = pageMatches.find(pageMatch => pageMatch.result !== null);
    // console.log(match)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        };
    }

    const viewHtml = new match.route.view(getParams(match));
    // console.log(viewHtml)
    document.querySelector("#root").innerHTML = await viewHtml.getHtml();

    const newPost = new NewPost();
    newPost.bindsendEvent();

    const postEvent = new PostDetail();
    postEvent.bindBtnEvents();

    if (location.pathname === "/") {
        document.querySelector(".go-back").style.visibility = "hidden";
    } else {
        document.querySelector(".go-back").style.visibility = "inherit";
    }
};

window.addEventListener("popstate", router); // 재렌더링

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("[data-link]")) { // "a"
            event.preventDefault(); // 새로고침 방지
            navigateTo(event.target.href);
        }
    });
    router();
})

const backBtn = document.querySelector(".go-back");

backBtn.addEventListener("click", () => history.back());