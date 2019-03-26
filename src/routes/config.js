export default {
    menus: [ 
    //超级管理员
        { key: '/app/home/HoneIndex', title: '首页', icon: 'mobile', component: 'HoneIndex' },
        {
            key: '/app/alarm', title: '警报管理', icon: 'team',
            subs: [
                { key: '/app/alarm/AlarmList', title: '警报', component: 'AlarmList'},
                { key: '/app/alarm/AlarmSta', title: '警报统计', component: 'AlarmSta'},       
            ],
        },        
    ],
    // 非菜单相关路由
    others: [
        {key: '/app/alarm/AlarmDetail', title: '警报详情', component: 'AlarmDetail'}, 
        {key: '/subs4', title: '页面', icon: 'switcher',
        subs: [
            { key: '/login', title: '登录' },
            { key: '/404', title: '404' },
        ],
        },
    ]
}
