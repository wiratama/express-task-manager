<template>
    <div>
    	<component-header></component-header>
	    <div class="columns">
    		<component-sidenav></component-sidenav>
	        <div class="column">
	        	<section class="section">
		            <router-view></router-view>
		        </section>
	        </div>
	    </div>
	</div>
</template>
<script>
import componentHeader from './partials/header.vue';
import componentSidenav from './partials/sidenav.vue';
import componentFooter from './partials/footer.vue';

export default {
	components: {
		'componentHeader' : componentHeader,
		'componentSidenav' : componentSidenav,
		'componentFooter' : componentFooter,
	}
}
</script>