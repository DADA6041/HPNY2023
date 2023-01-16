import Home from "./pages/Home.js";
import NewPost from "./pages/NewPost.js";
import PostDetail from "./pages/PostDetail.js";

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/newpost", view: NewPost },
        { path: "/postdetail", view: PostDetail },
    ];

    const pageMatches = routes.map((route) => {
        return {
            route: route,
            isMatch: route.path === location.pathname,
        };
    });

    let match = pageMatches.find(pageMatch => pageMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        };
    }

    const viewHtml = new match.route.view();
    document.querySelector("#root").innerHTML = await viewHtml.getHtml();

    const newPost = new NewPost();
    newPost.bindsendEvent();

    if (location.pathname === "/") {
        document.querySelector(".go-back").style.visibility = "hidden";
        // console.log(process.env.ACCESS_KEY);
    } else {
        document.querySelector(".go-back").style.visibility = "inherit";
    }
};

window.addEventListener("popstate", router); // 재렌더링

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("[data-link]")) {
            event.preventDefault(); // 새로고침 방지
            navigateTo(event.target.href);
        }
    });
    router();
})

const backBtn = document.querySelector(".go-back");

backBtn.addEventListener("click", () => history.back());