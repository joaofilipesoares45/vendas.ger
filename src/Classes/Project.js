export default class Project {
    nome
    resumo
    descricao
    link
    imgs
    tecnologias
    
    constructor({nome, resumo, descricao, link, imgs, tecnologias}) {
        this.nome = nome || ""
        this.resumo = resumo || ""
        this.descricao = descricao || ""
        this.link = link || ""
        this.imgs = imgs || []
        this.tecnologias = tecnologias || []
    }
    getData() {
        return {
            nome: this.nome,
            resumo: this.resumo,
            decricao: this.descricao,
            link: this.link,
            imgs: this.imgs,
            tecnologias: this.tecnologias,
        }
    }
}