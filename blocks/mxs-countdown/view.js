document.addEventListener( 'DOMContentLoaded', () => {
	function CountdownTimer() {
		const countdownId = 'mxs-countdown';
		const countdownDate = document.getElementById( 'countdownDate' ).value;
		const countdownMessage =
			document.getElementById( 'countdownMessage' ).value;
		const countdownUnitsDelimeter = document.getElementById(
			'countdownUnitsDelimeter'
		).value;

		let timer;
		const end = new Date( countdownDate );
		const _second = 1000;
		const _minute = _second * 60;
		const _hour = _minute * 60;
		const _day = _hour * 24;

		function showRemaining() {
			const now = new Date();
			const distance = end - now;
			if ( distance < 0 ) {
				clearInterval( timer );
				document.getElementById( countdownId ).innerHTML =
					countdownMessage;
				return;
			}

			const days = Math.floor( distance / _day );
			const hours = Math.floor( ( distance % _day ) / _hour );
			const minutes = Math.floor( ( distance % _hour ) / _minute );
			const seconds = Math.floor( ( distance % _minute ) / _second );

			document.getElementById( 'days' ).innerHTML =
				days + ' days ' + countdownUnitsDelimeter + ' ';
			document.getElementById( 'hours' ).innerHTML =
				hours + ' hours ' + countdownUnitsDelimeter + ' ';
			document.getElementById( 'minutes' ).innerHTML =
				minutes + ' minutes ' + countdownUnitsDelimeter + ' ';
			document.getElementById( 'seconds' ).innerHTML =
				seconds + ' seconds';
		}

		timer = setInterval( showRemaining, 1000 );
	}
	CountdownTimer();
} )();
