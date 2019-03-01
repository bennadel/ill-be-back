
<style scoped src="./home.component.less" />

<template>

	<div class="home-view">
		<form @submit.prevent="setupCountdown()" class="content">

			<h1 class="title">
				When Will You Be Back?
			</h1>

			<div class="fields">
				<input type="string" v-model="form.year" title="Year" placeholder="YYYY" class="field" />
				<input type="string" v-model="form.month" title="Month" placeholder="MM" class="field" />
				<input type="string" v-model="form.day" title="Day" placeholder="DD" class="field" />
				<span class="seperator">
					@
				</span>
				<input type="string" v-model="form.hour" title="Hour" placeholder="HH" class="field" />
				<input type="string" v-model="form.minute" title="Minute" placeholder="NN" class="field" />
			</div>

			<button type="submit" class="submit">
				Start Counting
			</button>

		</form>
	</div>

</template>

<script>
	
	export default {
		// I return the default reactive data for the component.
		data() {

			return({
				form: {
					year: "",
					month: "",
					day: "",
					hour: "",
					minute: ""
				}
			});

		},

		methods: {

			// I take the user to the countdown, assuming the data is valid.
			setupCountdown() {

				var year = parseInt( this.form.year, 10 );
				var month = parseInt( this.form.month, 10 );
				var day = parseInt( this.form.day, 10 );
				var hour = parseInt( this.form.hour, 10 );
				var minute = parseInt( this.form.minute, 10 );

				if (
					isNaN( year ) ||
					isNaN( month ) ||
					isNaN( day ) ||
					isNaN( hour ) ||
					isNaN( minute )
					) {

					alert( "Invalid date parts." );
					return;

				}

				var target = new Date(
					year,
					( month - 1 ), // Adjust for normal human mental model.
					day,
					hour,
					minute
				);

				this.$router.push( "/countdown/" + target.getTime() );

			}
		}
	};

</script>
