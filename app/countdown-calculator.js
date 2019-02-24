
export class CountdownCalculator {

	constructor() {

		this.SECOND_MS = 1000;
		this.MINUTE_MS = ( this.SECOND_MS * 60 );
		this.HOUR_MS = ( this.MINUTE_MS * 60 );
		this.DAY_MS = ( this.HOUR_MS * 24 );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	calculate( toUtc, fromUtc ) {

		var countdown = {
			sleeps: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			time: 0
		};

		var now = new Date();
		var msDelta = ( toUtc - now.getTime() );

		if ( msDelta < 0 ) {

			return( countdown );

		}

		countdown.time = msDelta;
		countdown.hours = Math.floor( msDelta / this.HOUR_MS );

		msDelta -= ( countdown.hours * this.HOUR_MS );

		countdown.minutes = Math.floor( msDelta / this.MINUTE_MS );

		msDelta -= ( countdown.minutes * this.MINUTE_MS );

		countdown.seconds = Math.floor( msDelta / this.SECOND_MS );



		// Sleeps are a bit fuzzy to calculate since it's just as much about when the
		// countdown is taking place as it is how long the countdown is. To keep things
		// simple, we'll consider any crossing of MIDNIGHT to count as a sleep.
		countdown.sleeps = Math.floor( countdown.time / this.DAY_MS );

		var msShoulders = ( countdown.time - ( countdown.sleeps * this.DAY_MS ) );
		var fromDayOfWeek = now.getDay();
		var toDayOfWeek = new Date( now.getTime() + msShoulders ).getDay();

		if ( fromDayOfWeek !== toDayOfWeek ) {

			countdown.sleeps++;

		}

		return( countdown );

	}

}
