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
            { path: 'editor/drafts', component: ()=>import('views/Drafts/Drafts.vue')},
            { path: 'profile/:id', component: ()=>import('views/Profile/Profile.vue'),props:true},
            { path: '', redirect: '/home'},
        ]
    },
    { path: '/editor/new', component: ()=>import('views/Editor/Editor.vue')},
    { path: '/editor/:id', component: ()=>import('views/Editor/Editor.vue'),props:true},
]
export default routes