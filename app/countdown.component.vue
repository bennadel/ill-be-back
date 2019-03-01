
<style scoped src="./countdown.component.less" />

<template>

	<div class="countdown-view">

		<router-link to="/" class="home">
			<svg viewBox="0 0 448 1024" role="img" aria-labelledby="countdown-back-to-home" class="icon">
				<title id="countdown-back-to-home">Back to Home</title>
				<path d="M448 320L320 192 0 512l320 320 128-128L256 512 448 320z" />
			</svg>
		</router-link>

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

	// Import application classes.
	import { CountdownCalculator } from "./countdown-calculator";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	// CAUTION: This class will only ever be instantiated once when the module for this
	// component is resolved.
	var countdownCalculator = new CountdownCalculator();
	
	export default {
		// I return the default reactive data for the component.
		data() {

			return({
				sleeps: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				timer: null
			});

		},

		// I get called once when the component has been instantiated.
		created() {

			// Validate that the target date is a number.
			if ( isNaN( +this.$route.params.utcTarget ) ) {

				this.$router.push( "/" );
				return;

			}

			// Bind the external handlers to the current scope. Unlike the instance
			// methods, which are all automatically bound to the current instance, these
			// external handlers are naturally bound to the global scope. As such, let's
			// manually bind them such that "this" references will be bound to this
			// component internally.
			// --
			// NOTE: If we used TypeScript and Classes we wouldn't have to do this - we
			// could just fat-arrow the method definitions and it would "just work".
			this.handleBlur = this.handleBlur.bind( this );
			this.handleFocus = this.handleFocus.bind( this );
			this.handleTick = this.handleTick.bind( this );

			this.startTimer();

			// The browser probably does this for us anyway (behind the scenes) but, as a
			// performance tweak, let's start and stop the timer so that we're only doing
			// the maths when the user is looking at the window.
			// --
			// NOTE: The Page Visibility API may have been a better choice; but, that can
			// be a future improvement.
			window.addEventListener( "focus", this.handleFocus );
			window.addEventListener( "blur", this.handleBlur );

		},

		// I get called once when the component has been destroyed.
		destroyed() {

			this.stopTimer();

			window.removeEventListener( "focus", this.handleFocus );
			window.removeEventListener( "blur", this.handleBlur );

		},

		methods: {

			// I handle the blurring of the browser window.
			handleBlur() {

				console.warn( "Stopping timer due to lack of focus." );
				this.stopTimer();

			},


			// I handle the focusing of the browser window.
			handleFocus() {

				console.warn( "Starting timer due to regained focus." );
				this.startTimer();

			},


			// I handle the timer interval.
			handleTick() {

				this.updateCountdown();

			},


			// I start (and keep track of) the interval timer.
			startTimer() {

				if ( this.timer ) {

					return;

				}

				this.timer = setInterval( this.handleTick, 1000 );
				this.updateCountdown();

			},


			// I stop (and clear) the interval timer.
			stopTimer() {

				clearInterval( this.timer );
				this.timer = null;

			},


			// I update the countdown state.
			updateCountdown() {

				// Rather than watching the route parameter, we'll just pluck the param
				// out of the route every time we need to update the view.
				var countdown = countdownCalculator.calculate( +this.$route.params.utcTarget );

				this.sleeps = countdown.sleeps;
				this.hours = countdown.hours;
				this.minutes = countdown.minutes;
				this.seconds = countdown.seconds;

			}

		}
	};

</script>
