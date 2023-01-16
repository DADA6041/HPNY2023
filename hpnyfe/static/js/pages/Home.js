import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("메인페이지");
    }

    async getHtml() {
        const response = await fetch("http://43.201.103.199/posts", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => response.data.posts)
            .then((response) => response)
            .catch((err) => console.log(err));

            console.log(response)
        return `
            <section class="cont-main">
                <h2 class="sr-only">메인 페이지</h2>
                <a href="/newpost" class="btn-new-post" data-link>새 글 작성하기</a>
                <ul class="mainpage-ul">
                    ${
                        response.map((data) => {
                            return `<li>
                                <a href="/postdetail" data-link>
                                    <img class="thumbnail" src=${data.image} alt="">
                                    <div class="txt-contents">
                                        <h2>${data.title}</h2>
                                        <p>${data.content}</p>
                                    </div>
                                </a>
                            </li>`
                        }).join("")
                    }
                </ul>
            </section>
        `
    }
}
