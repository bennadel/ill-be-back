
<style scoped src="./countdown.component.less" />

<template>

	<div class="countdown-view">
		<div class="content">			
			
			<div class="sleeps">
				<span v-if="sleeps">
					{{ sleeps }} Sleeps
				</span>
				<span v-if="( ! sleeps )">
					Today
				</span>
			</div>

			<div class="times">
				<span v-if="days" class="time">
					{{ days }} Days
				</span>
				<span v-if="( days || hours )" class="time">
					{{ hours }} Hours
				</span>
				<span v-if="( days || hours || minutes )" class="time">
					{{ minutes }} Minutes
				</span>
				<span v-if="( days || hours || minutes || seconds )" class="time">
					{{ seconds }} Seconds
				</span>
			</div>

		</div>
	</div>

</template>

<script>
	
	export default {
		data() {

			return({
				sleeps: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				timer: null
			});

		},
		created() {

			var self = this;

			this.timer = setInterval(
				function() {

					self.updateCountdown();

				},
				1000
			);

		},
		destroyed() {

			clearInterval( this.timer );

		},
		methods: {

			updateCountdown() {

				console.log( Date.now() );

			}

		}
	};

</script>
