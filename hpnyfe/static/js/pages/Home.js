import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("메인페이지");
    }

    async getHtml() {
        return `
            <section class="cont-main">
                <h2 class="sr-only">메인 페이지</h2>
                <a href="/newpost" class="btn-new-post" data-link>새 글 작성하기</a>
                <ul class="mainpage-ul">
                    <li>
                        <a href="/postdetail" data-link>
                            <img class="thumbnail" src="./static/images/test.png" alt="">
                            <div class="txt-contents">
                                <h2>신년계획</h2>
                                <p>모든 국민은 거주·이전의 자유를 가진다. 대통령의 선거에 관한 사항은 법률로 정한다.</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
        `;
    }
}