export default class NotificationBtn {
    text
    tag
    fun
    link
    color

    constructor({ text, tag, fun, link, color }) {
        this.text = text
        this.tag = tag
        this.fun = fun
        this.link = link
        this.color = color
    }
}