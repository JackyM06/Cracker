const Main = ()=>import("views/main/Main.vue")
    const DataInfo = ()=>import('views/datainfo/DataInfo.vue')
    const ArticleList = ()=>import('views/consumer/Article/ArticleList.vue')

const routes = [
    { path: '/', redirect: '/main'},
    { path: '/main', 
      component: Main,
      children:[
          { path: '', component: DataInfo },
          { path: 'article', component: ArticleList },
      ]
    }
]
export default routes