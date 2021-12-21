const socket = io();
const id = window.location.pathname.split('/').pop();

socket.emit('join', id);

const app = new Vue({
	el: '#app',
	data: {
		events: [],
		requestUrl: `${window.location.hostname}/${id}`
	},
	mounted() {
		socket.on('event', (event) => {
			this.events.push(event);
		});
	}
});