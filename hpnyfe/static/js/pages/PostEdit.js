import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("게시글 수정 페이지");

        this.btnSubmit = document.querySelector(".btn-send-post");
        this.imgSrc = document.querySelector(".detail-img");
        this.titleInp = document.querySelector(".inp-title-area");
        this.descInp = document.querySelector(".inp-desc-area");
    }

    async getHtml() {

        const response = await fetch(`api/post/${this.params.id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => response.data)
            .then((response) => response)
            .catch((err) => console.log(err));
        console.log(response)

        return `
            <section class="cont-edit-post">
                <h2 class="sr-only">게시글 수정 페이지</h2>

                <img class="detail-img" 
                onerror="this.src='https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/test.png';" src=${response.post.image} alt="">
                <form method="post">
                    <label for="inpTitle" class="inp-title">제목</label>
                    <input name="inpTitle" class="inp-title-area" type="text" placeholder="글 제목을 입력해주세요." value=${response.post.title} required >
                    <label for="postDesc" class="inp-desc">내용</label>
                    <textarea name="postDesc" class="inp-desc-area" cols="40" rows="8" placeholder="글 내용을 입력해주세요." required>${response.post.content}</textarea>
                    <button type="submit" class="btn-send-post btn-submit-edit">수정 완료</button>
                </form>
            </section>
        `;
    }

    async bindEditSendEvent() {
        let link = document.location.href.split("/").slice(-1)[0];

        console.log(link)
        this.btnSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            this.sendEditPost(link, this.imgSrc.src, this.titleInp.value, this.descInp.value)
        })
    }

    async sendEditPost(link, img, title, desc) {
        try {
            const response = await fetch(`api/post/${link}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "title": `${title}`,
                    "content": `${desc}`,
                    "image": `${img}`
                }),
            })
                .then((response) => location.replace(`/postdetail/${link}`));
        } catch (err) {
            console.log(err);
        }
    }
}
