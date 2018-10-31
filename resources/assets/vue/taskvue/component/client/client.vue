<template>
	<div>
		<h1>Client</h1>
		<ul>
			<li v-for="(client, index) of clients">
			{{client.nama}}
			</li>
		</ul>
	</div>
</template>
<script>
import axios from 'axios'

export default {
	created () {
		axios.get(`http://localhost:666/clients`)
		.then(response => {
			this.clients = response.data
			console.log(this.clients)
		})
		.catch(e => {
			this.errors.push(e)
		})
	},
	data () {
		return {
			clients: [],
			errors: []
		}
	},
	
}
</script>