const routes = [
    {   
        path: '/', 
        component: ()=>import('views/Main/Main.vue'),
        children: [
            { path: 'home', component: ()=>import('views/Home/Home.vue') },
            { path: 'categories', component: ()=>import('views/Category/Category.vue') },
            { path: 'hot', component: ()=>import('views/Hot/Hot.vue') },
            { path: '', redirect: '/home'},
        ]
    }
]
export default routes