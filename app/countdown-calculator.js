
// I calculate the delta in Sleeps and Time between two different dates (given UTC
// milliseconds). The calculation is done using the client's native Timezone. As such,
// calculations may change slightly while traveling.
export class CountdownCalculator {

	// I initialize the countdown calculator service.
	constructor() {

		this.SECOND_MS = 1000;
		this.MINUTE_MS = ( this.SECOND_MS * 60 );
		this.HOUR_MS = ( this.MINUTE_MS * 60 );
		this.DAY_MS = ( this.HOUR_MS * 24 );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I calculate the delta between the given dates (UTC milliseconds). If a FROM date
	// is not provided, the current date is used as the default.
	calculate( toUtc, fromUtc ) {

		var countdown = {
			sleeps: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			time: 0
		};

		var msDelta = ( toUtc - ( fromUtc || Date.now() ) );

		// If we've already reached / passed our target date, return defaults.
		if ( msDelta < 0 ) {

			return( countdown );

		}

		// At this point, we know that we have a calculation to perform. Let's convert to
		// a robust Date object so that we can access date-parts.
		var toDate = new Date( toUtc );

		// When we calculate parts of the delta, each unit should only contain the
		// remainder of the time not accounted for in the previous units. So, for
		// example, the MINUTES unit should never be more than 60 as anything more than
		// 60 will have already been accounted for in the HOURS unit. To do this, we are
		// going to keep taking the greater unites out of the msDelta value and then
		// using the remainder to calculate the lesser units.
		countdown.time = msDelta;
		countdown.hours = Math.floor( msDelta / this.HOUR_MS );

		// Remove HOURS from remainder.
		msDelta -= ( countdown.hours * this.HOUR_MS );

		countdown.minutes = Math.floor( msDelta / this.MINUTE_MS );

		// Remove MINUTES from remainder.
		msDelta -= ( countdown.minutes * this.MINUTE_MS );

		countdown.seconds = Math.floor( msDelta / this.SECOND_MS );

		// Sleeps are a bit fuzzy to calculate since it's just as much about when the
		// countdown is taking place as it is about how much countdown is remaining. To
		// keep things simple, we'll consider any crossing of MIDNIGHT to indicate a
		// increment of sleep. As such, we know that the number of sleeps should be AT
		// LEAST the number of 24-hours blocks we have. Every 24-hour block is guaranteed
		// to cross midnight once.
		countdown.sleeps = Math.floor( countdown.time / this.DAY_MS );

		// Now that we know how many times the delta exceed 24-hours, we have to see
		// where the start and end times fall. It's possible that they will fall in such
		// a way that we have one more sleep than expected. For example, if we have a
		// 25-hour period that starts at 11:00 AM, it will only cross midnight once.
		// However, if the same 25-hour period starts at 23:30, it will cross midnight
		// twice (accounting for one additional sleep). To calculate this, we will remove
		// all of the 24-hours blocks from the middle of the delta, leaving us with just
		// the "shoulder" times.
		var msShoulders = ( countdown.time - ( countdown.sleeps * this.DAY_MS ) );

		// Now that we've removed the inner 24-hour blocks (that we know cross midnight
		// at least once), we only have the times on either side. At this point, we can 
		// see if the "shoulder" times cross the midnight line.
		var fromDayOfWeek = toDate.getDay();
		var toDayOfWeek = new Date( toDate.getTime() + msShoulders ).getDay();

		// If the two "shoulder" times fall on different days of the week, we need to
		// add an additional sleep to our count.
		if ( fromDayOfWeek !== toDayOfWeek ) {

			countdown.sleeps += 1;

		}

		return( countdown );

	}

}
