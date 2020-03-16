const Main = ()=>import("views/main/Main.vue")
    const DataInfo = ()=>import('views/datainfo/DataInfo.vue')
    const ArticleList = ()=>import('views/consumer/Article/ArticleList.vue')
    const ArticleEdit = ()=>import('views/consumer/Article/ArticleEdit.vue')
    const User = ()=>import('views/consumer/User/UserList.vue')
    const UserEdit = ()=>import('views/consumer/User/UserEdit.vue')
    const Category = ()=>import('views/manage/Category.vue')
    const About = ()=>import('views/manage/About.vue')
    const NoticeList = ()=>import('views/manage/Notice/NoticeList.vue')
    const NoticeEdit = ()=>import('views/manage/Notice/NoticeEdit.vue')
    const AdminList = ()=>import('views/manage/AdminList.vue')
const Login = ()=>import('views/login/Login.vue')
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
          { path: 'notice', component: NoticeList},
          { path: 'notice/create', component: NoticeEdit,props:true},
          { path: 'notice/:id', component: NoticeEdit,props:true},
          { path: 'about', component: About},
          { path: 'admin', component: AdminList},
      ]
    },
    {path:'/login',component:Login}
]
export default routes