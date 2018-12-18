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
		{ path: '/dashboard', component: componentDashboard, name: 'admindashboard' },
		{ path: '/board', component: componentBoard, name: 'adminboard' },
		{ path: '/client', component: componentClient, name: 'adminclient' },
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

export default router;