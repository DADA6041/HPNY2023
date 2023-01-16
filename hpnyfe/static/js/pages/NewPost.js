import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("게시글 작성 페이지");
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
                    <textarea name="postDesc" cols="40" rows="8" placeholder="글 내용을 입력해주세요." required></textarea>
                    <button type="submit" class="btn-send-post">등록하기</button>
                </form>
            </section>
        `;
    }
}