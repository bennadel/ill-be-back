
<style scoped src="./home.component.less" />

<template>

	<div class="home-view">
		<form @submit.prevent="setupCountdown()" class="content">

			<h1 class="title">
				When Will You Be Back?
			</h1>

			<div class="fields">
				<input type="string" v-model="form.year" placeholder="YYYY" class="field" />
				<input type="string" v-model="form.month" placeholder="MM" class="field" />
				<input type="string" v-model="form.day" placeholder="DD" class="field" />
				<span class="seperator">
					@
				</span>
				<input type="string" v-model="form.hour" placeholder="HH" class="field" />
				<input type="string" v-model="form.minute" placeholder="NN" class="field" />
			</div>

			<button type="submit" class="submit">
				Start Counting
			</button>

		</form>
	</div>

</template>

<script>
	
	export default {
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
			setupCountdown() {

				var year = parseInt( this.form.year, 10 );
				var month = parseInt( this.form.month, 10 );
				var day = parseInt( this.form.day, 10 );
				var hour = parseInt( this.form.hour, 10 );
				var minute = parseInt( this.form.minute, 10 );
console.log( this.form );
console.log( year, month, day, hour, minute );
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
