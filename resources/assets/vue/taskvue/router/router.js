import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';

import componentDashboard from '../component/dashboard/dashboard.vue';
import componentBoard from '../component/board/board.vue';
import componentClient from '../component/client/client.vue';

let router = new VueRouter({
	mode: 'history',
	routes: [
<<<<<<< HEAD
		{ path: '/dashboard', component: componentDashboard, name: 'admindashboard' },
		{ path: '/board', component: componentBoard, name: 'adminboard' },
		{ path: '/client', component: componentClient, name: 'adminclient' },
=======
		{ path: '/admin/dashboard', component: componentDashboard, name: 'admindashboard' },
		{ path: '/admin/board', component: componentBoard, name: 'adminboard' },
		{ path: '/clients', component: componentClient, name: 'adminclient' },
>>>>>>> 321126e933d153d3f61ef9f3289b843993e173bc
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

export default router;