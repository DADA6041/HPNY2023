import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("HPNY 2023");
    }

    async getHtml() {
        const response = await fetch(`api/posts`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => response.data.posts)
            .then((response) => response)
            .catch((err) => console.log(err));

        return `
            <section class="cont-main">
                <h2 class="sr-only">메인 페이지</h2>
                <a href="/newpost" class="btn-new-post" data-link>새 글 작성하기</a>
                <ul class="mainpage-ul">
                    ${
                        response.map((data) => {
                            return `
                            <li>
                                <a href="/postdetail/${data.postId}" data-link>
                                    <img class="thumbnail" src=${data.image}
                                        onerror="this.src='https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/test.png';" alt="">
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
