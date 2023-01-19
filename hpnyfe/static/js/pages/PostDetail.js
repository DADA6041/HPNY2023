import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("HPNY 2023");

        this.btnPostEdit = document.querySelector(".btn-edit");
        this.btnPostDelete = document.querySelector(".btn-delete-post");
        this.btnCommentDelete = document.querySelectorAll(".btn-delete-comment");
        this.btnCommentSend = document.querySelector(".btn-send-comment");
        this.commentInp = document.querySelector("#comment-input");
    }

    async getHtml() {
        const editIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/edit_icon.png";
        const bigDeleteIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/big_delete_icon.png";
        const deleteIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/delete_icon.png";
        const sendIcon = "https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/send_icon.png";

        const response = await fetch(`api/post/${this.params.id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => response.data)
            .then((response) => response)
            .catch((err) => console.log(err));

        const postTime = response.post.createdAt.split("T")[0].split("-");
        return `
            <section class="cont-postdetail">
                <h2 class="sr-only">게시글 상세 페이지</h2>
                <img class="detail-img" 
                onerror="this.src='https://raw.githubusercontent.com/DADA6041/HPNY2023/main/hpnyfe/static/images/test.png';" src=${response.post.image} alt="">
                <section class="cont-post-detail">
                    <h3 class="sr-only">게시글 세부 섹션</h3>
                    <strong class="postdetail-title">${response.post.title}</strong>
                    <time class="postdetail-date">${postTime[0]}. ${postTime[1]}. ${postTime[2]}</time>
                    <p class="postdetail-desc">
                        ${response.post.content}
                    </p>
                    <div class="btn-wrap">
                        <button type="button" class="btn-edit">
                            <img src=${editIcon} alt="수정하기">
                        </a>
                        <button type="button" class="btn-delete-post">
                            <img src=${bigDeleteIcon} alt="삭제하기">
                        </button>
                    </div>
                </section>
                <section class="cont-comment">
                    <h3 class="sr-only">댓글 섹션</h3>
                    <ul class="comment-ul">
                        ${(!response.comments.length) ?
                        ""
                        :
                        response.comments.map((data) => {
                                return `
                                    <li>
                                        <p class="comment-desc">${data.content}</p>
                                        <button type="button" class="btn-delete-comment" data-comment-id=${data.commentId}>
                                            <img src=${deleteIcon} alt="댓글 삭제하기">
                                        </button>
                                    </li>
                                    `
                            }).join("")
                        }
                    </ul>

                    <form class="form-send-comment">
                        <label for="comment-input" class="sr-only">댓글쓰기</label>
                        <input type="text" id="comment-input" class="inp-comment">
                        <button type="submit" class="btn-send-comment">
                            <img src=${sendIcon} alt="댓글 전송하기">
                        </button>
                    </form>
                </section>
            </section>
        `;
    }

    async bindBtnEvents() {
        let link = document.location.href.split("/").slice(-1)[0];

        this.btnPostEdit.addEventListener("click", (e) => {
            // e.preventDefault();
            location.href=`/edit/${link}`;
        })

        this.btnPostDelete.addEventListener("click", (e) => {
            e.preventDefault();
            console.log('포스트 삭제');
            this.deletePost(link);
        })

        this.btnCommentSend.addEventListener("click", (e) => {
            e.preventDefault();
            this.sendComment(link, this.commentInp.value);
        })

        this.btnCommentDelete.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                this.deleteComment(e.currentTarget.dataset.commentId);
            })
        })
    }

    async deletePost(link) {
        try {
            const res = await fetch(`api/post/${link}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res) => location.replace("/"));
        } catch (err) {
            console.log(err);
        }
    }

    async sendComment(link, commentdesc) {
        try {
            const response = await fetch(`api/comment/${link}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "content": `${commentdesc}`,
                }),
            })
                .then((response) => location.reload());
        } catch (err) {
            console.log(err);
        }
    }

    async deleteComment(commentId) {
        try {
            const res = await fetch(`api/comment/${commentId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res) => location.reload());
        } catch (err) {
            console.log(err);
        }
    }
}

