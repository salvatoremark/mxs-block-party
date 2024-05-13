import { useBlockProps } from '@wordpress/block-editor';

export default function Save( {
	attributes: {
		countdownDate,
		countdownHeading,
		countdownMessage,
		countdownUnitsDelimeter,
		countdownHeadingFontSize,
		countdownFontSize,
		textAlign,
		boxWidth,
	},
} ) {
	const inlineStyles = {
		maxWidth: boxWidth + 'rem',
	};
	const blockProps = useBlockProps.save( {
		className: `has-text-align-${ textAlign }`,
		style: inlineStyles,
	} );

	return (
		<>
			<article { ...blockProps }>
				<h6
					style={ {
						fontSize: countdownHeadingFontSize + 'rem',
					} }
				>
					{ countdownHeading }
				</h6>
				<div
					id="mxs-countdown"
					style={ {
						fontSize: countdownFontSize + 'rem',
					} }
				>
					<span id="days"></span>
					<span id="hours"></span>
					<span id="minutes"></span>
					<span id="seconds"></span>
				</div>
			</article>

			{ /* Values for Javascript access  */ }
			<input id="countdownDate" type="hidden" value={ countdownDate } />
			<input
				id="countdownMessage"
				type="hidden"
				value={ countdownMessage }
			/>
			<input
				id="countdownUnitsDelimeter"
				type="hidden"
				value={ countdownUnitsDelimeter }
			/>
		</>
	);
}
