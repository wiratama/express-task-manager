import Vue from 'vue';

import App from './taskvue/component/rootComponentTaskApp.vue';
import router from './taskvue/router/router.js';
import '../src/taskapp';

document.addEventListener('DOMContentLoaded', () => {
	const taskapp = new Vue({
	  el: '#task-app',
	  render: h => h(App),
	  router
	})
})