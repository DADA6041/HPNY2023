import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("게시글 상세 페이지");
    }

    async getHtml() {
        return `
            <section class="cont-postdetail">
                <h2 class="sr-only">게시글 상세 페이지</h2>
                <img class="detail-img" src="./static/images/test.png" alt="">
                <section class="cont-post-detail">
                    <h3 class="sr-only">게시글 세부 섹션</h3>
                    <strong class="postdetail-title">신년 계획</strong>
                    <time class="postdetail-date">2023.01.10</time>
                    <p class="postdetail-desc">2023 계획 세우셨나요? 저는 아직 못세웠어요.작년에 계획을 과하게 세우고 많이 실패했던 기억이 있어서..
                    </p>
                    <div class="btn-wrap">
                        <button type="button" class="btn-edit">
                            <img src="./static/images/edit_icon.png" alt="수정하기">
                        </button>
                        <button type="button" class="btn-delete-post">
                            <img src="./static/images/big_delete_icon.png" alt="삭제하기">
                        </button>
                    </div>
                </section>
                <section class="cont-comment">
                    <h3 class="sr-only">댓글 섹션</h3>
                    <ul class="comment-ul">
                        <li>
                            <p class="comment-desc">너무 슬퍼하지 마세요! 다들 비슷해요 ㅎㅎ올해는 잘 할 수 있을거에요 ! 화이팅 !</p>
                            <button type="button" class="btn-delete-comment">
                                <img src="./static/images/delete_icon.png" alt="댓글 삭제하기">
                            </button>
                        </li>
                    </ul>

                    <form class="form-send-comment">
                        <label for="comment-input" class="sr-only">댓글쓰기</label>
                        <input type="text" id="comment-input" class="inp-comment">
                        <button type="submit">
                            <img src="./static/images/send_icon.png" alt="">
                        </button>
                    </form>
                </section>
            </section>
        `;
    }
}