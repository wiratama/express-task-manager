<template>
    <div class="column is-2">
        <aside class="menu section">
        	<p class="menu-label">
				<router-link :to="{ name: 'admindashboard' }" class="navbar-item"  @click="dataActivNav = !dataActivNav" :class="{ 'is-active': dataActivNav }">
                            <span>Dashboard</span>
                        </router-link>
			</p>
            <p class="menu-label">
				Project
			</p>
			<ul class="menu-list">
				<li>
					<router-link :to="{ name: 'adminboard' }" class="navbar-item">
						<strong>Board</strong>
	                    <br>
	                    <small>Project board</small>
                    </router-link>
				</li>
				<li>
					<router-link :to="{ name: 'adminclient' }" class="navbar-item">
                        <strong>Client</strong>
                        <br>
                        <small>Project client</small>
                    </router-link>
				</li>
			</ul>
        </aside>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dataActivNav: false,
        }
    },
}
</script>