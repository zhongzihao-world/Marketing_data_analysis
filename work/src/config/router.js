export default [{
    path: '/',
    redirect: to => {
        return 'login';
    },
},{
    path: '/login',
    component: resolve => require(['../components/login.vue'], resolve),
    meta: { isfade: true },
},{
    path: '/home',
    component: resolve => require(['../components/home.vue'], resolve),
    meta: { isfade: true },
}, {
    path: '/passenger',
    name: 'passenger',
    component: resolve => require(['../components/top/passenger.vue'], resolve),
    children: [{
        path: '/today',
        component: resolve => require(['../components/passenger/today.vue'], resolve),
        meta: { isfade: true },
    }, {
        path: '/trajectory',
        component: resolve => require(['../components/passenger/trajectory.vue'], resolve),
        meta: { isfade: true },
    },{
        path: '/passflow',
        component: resolve => require(['../components/passenger/passflow.vue'], resolve),
        meta: { isfade: true },
    },{
        path: '/hot',
        component: resolve => require(['../components/passenger/hot.vue'], resolve),
        meta: { isfade: true },
    },{
        path: '/visitor',
        component: resolve => require(['../components/visitor/visitor.vue'], resolve),
        meta: { isfade: true },
    }, {
        path: '/person',
        component: resolve => require(['../components/casemanage/person.vue'], resolve),
        meta: { isfade: true },
    },{
        path: '/manger',
        component: resolve => require(['../components/casemanage/manger.vue'], resolve),
        meta: { isfade: true },
    },
    {
        path: '/reload',
        component: resolve => require(['../components/top/reload.vue'], resolve),
        meta: { isfade: true },
    }]
}]