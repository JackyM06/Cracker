const Main = ()=>import("views/main/Main.vue")
    const DataInfo = ()=>import('views/datainfo/DataInfo.vue')
    const ArticleList = ()=>import('views/consumer/Article/ArticleList.vue')
    const ArticleEdit = ()=>import('views/consumer/Article/ArticleEdit.vue')
    const User = ()=>import('views/consumer/User/UserList.vue')
    const UserEdit = ()=>import('views/consumer/User/UserEdit.vue')
    const Category = ()=>import('views/manage/Category.vue')
    const About = ()=>import('views/manage/About.vue')
    const Notice = ()=>import('views/manage/Notice.vue')

const routes = [
    { path: '/', redirect: '/main'},
    { path: '/main', 
      component: Main,
      children:[
          { path: '', component: DataInfo },
          { path: 'article', component: ArticleList },
          { path: 'article/:id', component: ArticleEdit,props:true},
          { path: 'user', component: User},
          { path: 'user/:id', component: UserEdit,props:true},
          { path: 'category', component: Category},
          { path: 'notice', component: Notice},
          { path: 'about', component: About},
      ]
    }
]
export default routes