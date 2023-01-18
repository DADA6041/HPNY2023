import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("게시글 상세 페이지");
        console.log(this.params.id)
    }

    async getHtml() {
        const editIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/edit_icon.png";
        const bigDeleteIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/big_delete_icon.png";
        const deleteIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/delete_icon.png";
        const sendIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/send_icon.png";

        const response = await fetch(`${this.url}/post/${this.params.id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => response.data.post)
            .then((response) => response)
            .catch((err) => console.log(err));

            console.log(response)

        return `
            <section class="cont-postdetail">
                <h2 class="sr-only">게시글 상세 페이지</h2>
                <img class="detail-img" src=${response.image} alt="">
                <section class="cont-post-detail">
                    <h3 class="sr-only">게시글 세부 섹션</h3>
                    <strong class="postdetail-title">${response.title}</strong>
                    <time class="postdetail-date">${response.createdAt}</time>
                    <p class="postdetail-desc">
                        ${response.content}
                    </p>
                    <div class="btn-wrap">
                        <button type="button" class="btn-edit">
                            <img src=${editIcon} alt="수정하기">
                        </button>
                        <button type="button" class="btn-delete-post">
                            <img src=${bigDeleteIcon} alt="삭제하기">
                        </button>
                    </div>
                </section>
                <section class="cont-comment">
                    <h3 class="sr-only">댓글 섹션</h3>
                    <ul class="comment-ul">
                        <li>
                            <p class="comment-desc">너무 슬퍼하지 마세요! 다들 비슷해요 ㅎㅎ올해는 잘 할 수 있을거에요 ! 화이팅 !</p>
                            <button type="button" class="btn-delete-comment">
                                <img src=${deleteIcon} alt="댓글 삭제하기">
                            </button>
                        </li>
                    </ul>

                    <form class="form-send-comment">
                        <label for="comment-input" class="sr-only">댓글쓰기</label>
                        <input type="text" id="comment-input" class="inp-comment">
                        <button type="submit">
                            <img src=${sendIcon} alt="댓글 전송하기">
                        </button>
                    </form>
                </section>
            </section>
        `;
    }
}