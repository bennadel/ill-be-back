
<style scoped src="./countdown.component.less" />

<template>

	<div class="countdown-view">
		<div class="content">

			<table class="times">
				<tr class="time" :class="{ active: ( sleeps ) }">
					<td class="value">
						{{ sleeps }}
					</td>
					<th class="label">
						Sleeps
					</th>
				</tr>
				<tr class="time" :class="{ active: ( hours ) }">
					<td class="value">
						{{ hours }}
					</td>
					<th class="label">
						Hours
					</th>
				</tr>
				<tr class="time" :class="{ active: ( hours || minutes ) }">
					<td class="value">
						{{ minutes }}
					</td>
					<th class="label">
						Minutes
					</th>
				</tr>
				<tr class="time" :class="{ active: ( hours || minutes || seconds ) }">
					<td class="value">
						{{ seconds }}
					</td>
					<th class="label">
						Seconds
					</th>
				</tr>
			</table>

		</div>
	</div>

</template>

<script>

	import { CountdownCalculator } from "./countdown-calculator";

	var countdownCalculator = new CountdownCalculator();
	
	export default {
		data() {

			return({
				sleeps: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				timer: null
			});

		},
		created() {

			// Bind the external hanlers to the current scope.
			this.handleBlur = this.handleBlur.bind( this );
			this.handleFocus = this.handleFocus.bind( this );
			this.handleTick = this.handleTick.bind( this );

			this.startTimer();

			window.addEventListener( "focus", this.handleFocus );
			window.addEventListener( "blur", this.handleBlur );


		},
		destroyed() {

			this.stopTimer();

			window.removeEventListener( "focus", this.handleFocus );
			window.removeEventListener( "blur", this.handleBlur );

		},
		methods: {

			handleBlur() {

				console.warn( "Stopping timer due to lack of focus." );
				this.stopTimer();

			},

			handleFocus() {

				console.warn( "Starting timer due to regained focus." );
				this.startTimer();

			},

			handleTick() {

				this.updateCountdown();

			},

			startTimer() {

				if ( this.timer ) {

					return;

				}

				this.timer = setInterval( this.handleTick, 1000 );
				this.updateCountdown();

			},

			stopTimer() {

				clearInterval( this.timer );
				this.timer = null;

			},

			updateCountdown() {

				var countdown = countdownCalculator.calculate( +this.$route.params.utcTarget );

				this.sleeps = countdown.sleeps;
				this.hours = countdown.hours;
				this.minutes = countdown.minutes;
				this.seconds = countdown.seconds;

			}

		}
	};

</script>
