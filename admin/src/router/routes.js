const Main = ()=>import("views/main/Main.vue")
    const DataInfo = ()=>import('views/datainfo/DataInfo.vue')
    const ArticleList = ()=>import('views/consumer/Article/ArticleList.vue')
    const ArticleEdit = ()=>import('views/consumer/Article/ArticleEdit.vue')
    const User = ()=>import('views/consumer/User/UserList.vue')

const routes = [
    { path: '/', redirect: '/main'},
    { path: '/main', 
      component: Main,
      children:[
          { path: '', component: DataInfo },
          { path: 'article', component: ArticleList },
          { path: 'article/:id', component: ArticleEdit,props:true},
          { path: 'user', component: User},
      ]
    }
]
export default routes