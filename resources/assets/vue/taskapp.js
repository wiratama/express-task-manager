import Vue from 'vue';

import App from './taskvue/component/rootComponentTaskApp.vue';
import router from './taskvue/router/router.js';
import '../css/taskapp/taskapp';

document.addEventListener('DOMContentLoaded', () => {
	const vueTaskApp = new Vue({
	  el: '#task-app',
	  render: h => h(App),
	  router
	})
})