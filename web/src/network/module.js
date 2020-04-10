//文章介绍信息类 
class ArticleInfo {
    constructor(value){
        this.message = {
            auth:value.author.name,
            createdAt:value.createdAt,
            categories:value.categories.map(category=>category.name).join('/')
        },
        this.title = value.title,
        this.articleId = value._id,
        this.img = null,
        this.likes = value.supporters.length,
        this.comments = value.comments.length,
        this.visits =value.visits
    }
}

export {ArticleInfo}