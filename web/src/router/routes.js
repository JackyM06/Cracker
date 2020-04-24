const routes = [
    {   
        path: '/', 
        component: ()=>import('views/Main/Main.vue'),
        children: [
            { path: 'home', component: ()=>import('views/Home/Home.vue') },
            { path: 'categories', component: ()=>import('views/Category/Category.vue') },
            { path: 'tag/:id', component: ()=>import('views/Tag/Tag.vue') ,props:true},
            { path: 'hot', component: ()=>import('views/Hot/Hot.vue') },
            { path: 'post/:id', component: ()=>import('views/Post/Post.vue'),props:true},
            { path: 'search/:searchkey', component: ()=>import('views/Search/Search.vue'),props:true},
            { path: '', redirect: '/home'},
        ]
    }
]
export default routes