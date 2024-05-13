/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { DatePicker } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import './editor.scss';

export default function Edit( {
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
	setAttributes,
} ) {
	const inlineStyles = {
		maxWidth: boxWidth + 'rem',
	};
	const blockProps = useBlockProps( {
		className: `has-text-align-${ textAlign }`,
		style: inlineStyles,
	} );
	const daysRef = useRef();
	const hoursRef = useRef();
	const minutesRef = useRef();
	const secondsRef = useRef();
	const countdownRef = useRef();

	let timer;

	const end = new Date( countdownDate );
	const _second = 1000;
	const _minute = _second * 60;
	const _hour = _minute * 60;
	const _day = _hour * 24;

	const showRemaining = () => {
		const now = new Date();
		const distance = end - now;
		if ( distance < 0 ) {
			clearInterval( timer );
			countdownRef.current.innerHTML = countdownMessage;
			return;
		}

		const days = Math.floor( distance / _day );
		const hours = Math.floor( ( distance % _day ) / _hour );
		const minutes = Math.floor( ( distance % _hour ) / _minute );
		const seconds = Math.floor( ( distance % _minute ) / _second );

		if (
			daysRef.current !== null &&
			typeof daysRef.current !== 'undefined'
		) {
			__(
				( daysRef.current.innerHTML = days + ' days' ),
				metadata.textdomain
			);
		}

		if (
			hoursRef.current !== null &&
			typeof hoursRef.current !== 'undefined'
		) {
			hoursRef.current.innerHTML = __(
				' ' + countdownUnitsDelimeter + ' ' + hours + ' hours',
				metadata.textdomain
			);
		}

		if (
			minutesRef.current !== null &&
			typeof minutesRef.current !== 'undefined'
		) {
			minutesRef.current.innerHTML = __(
				' ' + countdownUnitsDelimeter + ' ' + minutes + ' minutes',
				metadata.textdomain
			);
		}

		if (
			secondsRef.current !== null &&
			typeof secondsRef.current !== 'undefined'
		) {
			secondsRef.current.innerHTML = __(
				' ' + countdownUnitsDelimeter + ' ' + seconds + ' seconds',
				metadata.textdomain
			);
		}
	};

	useEffect( () => {
		timer = setInterval( showRemaining, 1000 );
		return () => clearInterval( timer );
	}, [
		countdownDate,
		countdownHeading,
		countdownMessage,
		countdownUnitsDelimeter,
		countdownFontSize,
		countdownHeadingFontSize,
	] );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( textAlign ) => setAttributes( { textAlign } ) }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Target Date' ) } initialOpen={ false }>
					<DatePicker
						currentDate={ countdownDate }
						onChange={ ( countdownDate ) =>
							setAttributes( { countdownDate } )
						}
					/>
				</PanelBody>

				<PanelBody title={ __( 'Settings' ) } initialOpen={ false }>
					<TextControl
						label="Heading"
						value={ countdownHeading }
						onChange={ ( countdownHeading ) =>
							setAttributes( { countdownHeading } )
						}
					/>

					<TextControl
						label="Target Date Message"
						value={ countdownMessage }
						onChange={ ( countdownMessage ) =>
							setAttributes( { countdownMessage } )
						}
					/>

					<TextControl
						label="Heading FontSize (rem)"
						value={ countdownHeadingFontSize }
						onChange={ ( countdownHeadingFontSize ) =>
							setAttributes( { countdownHeadingFontSize } )
						}
					/>
					<TextControl
						label="Countdown FontSize (rem)"
						value={ countdownFontSize }
						onChange={ ( countdownFontSize ) =>
							setAttributes( { countdownFontSize } )
						}
					/>

					<SelectControl
						label="Units Delimeter"
						value={ countdownUnitsDelimeter }
						options={ [
							{ label: '•', value: '•' },
							{ label: '>', value: '>' },
							{ label: ':', value: ':' },
							{ label: '|', value: '|' },
						] }
						onChange={ ( countdownUnitsDelimeter ) =>
							setAttributes( { countdownUnitsDelimeter } )
						}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Box Width"
						value={ boxWidth }
						onChange={ ( boxWidth ) =>
							setAttributes( { boxWidth } )
						}
						min={ 3 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>

			<article { ...blockProps }>
				{ countdownHeading && (
					<h6
						ref={ countdownRef }
						className={ `countdownText countdownHeadingFontSize-${ countdownHeadingFontSize }` }
						style={ {
							fontSize: countdownHeadingFontSize + 'rem',
						} }
					>
						{ __( countdownHeading, metadata.textdomain ) }
					</h6>
				) }
				<div
					id="mxs-countdown"
					style={ {
						fontSize: countdownFontSize + 'rem',
					} }
				>
					<span className="days" ref={ daysRef }></span>
					<span className="hours" ref={ hoursRef }></span>
					<span className="minutes" ref={ minutesRef }></span>
					<span className="seconds" ref={ secondsRef }></span>
				</div>
			</article>
		</>
	);
}
