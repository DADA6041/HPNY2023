export default class {
    constructor(params) {
        this.params = params;
        this.url = "api"
        // console.log(this.params)
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
}