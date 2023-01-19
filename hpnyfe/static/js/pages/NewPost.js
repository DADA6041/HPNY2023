import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("HPNY 2023");

        this.btnSubmit = document.querySelector(".btn-send-post");
        this.titleInp = document.querySelector(".inp-title-area");
        this.descInp = document.querySelector(".inp-desc-area");
    }

    async getHtml() {
        return `
            <section class="cont-post">
                <h2 class="sr-only">게시글 작성 페이지</h2>
                <form method="post">
                    <label for="imgFile" class="img-file">
                        <img src="./static/images/img_icon.png" alt="">
                    </label>
                    <input type="file" id="imgFile" class="inp-img-file" accept="image/*" name="imgFile">
    
                    <label for="inpTitle" class="inp-title">제목</label>
                    <input name="inpTitle" class="inp-title-area" type="text" placeholder="글 제목을 입력해주세요." required>
                    <label for="postDesc" class="inp-desc">내용</label>
                    <textarea name="postDesc" class="inp-desc-area" cols="40" rows="8" placeholder="글 내용을 입력해주세요." required></textarea>
                    <button type="submit" class="btn-send-post">등록하기</button>
                </form>
            </section>
        `;
    }

    async bindsendEvent() {
        const accessKey = "3MpFsGVRUmIbvbKL_5NP-8vQVN55Pz6xn2WM3OFdZF8";
        const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then((res) => res.urls.regular)
            .then((res) => res)
            .catch((err) => console.log(err));

        this.btnSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            this.sendPost(res, this.titleInp.value, this.descInp.value);
        })
    }

    async sendPost(img, title, desc) {
        try {
            const response = await fetch(`api/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "title": `${title}`,
                    "content": `${desc}`,
                    "image": `${img}`
                }),
            })
                .then((response) => history.back());
        } catch (err) {
            console.log(err);
        }
    }
}