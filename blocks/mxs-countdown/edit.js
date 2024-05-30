import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import {
	DatePicker,
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';

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
		maxWidth: `${ boxWidth }rem`,
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

		if ( daysRef.current !== null && daysRef.current !== undefined ) {
			daysRef.current.innerHTML = `${ days } ${ __(
				'days',
				'mxs-countdown'
			) }`;
		}

		if ( hoursRef.current !== null && hoursRef.current !== undefined ) {
			hoursRef.current.innerHTML = ` ${ countdownUnitsDelimeter } ${ hours } ${ __(
				'hours',
				'mxs-countdown'
			) }`;
		}

		if ( minutesRef.current !== null && minutesRef.current !== undefined ) {
			minutesRef.current.innerHTML = ` ${ countdownUnitsDelimeter } ${ minutes } ${ __(
				'minutes',
				'mxs-countdown'
			) }`;
		}

		if ( secondsRef.current !== null && secondsRef.current !== undefined ) {
			secondsRef.current.innerHTML = ` ${ countdownUnitsDelimeter } ${ seconds } ${ __(
				'seconds',
				'mxs-countdown'
			) }`;
		}
	};

	useEffect( () => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					onChange={ ( newTextAlign ) =>
						setAttributes( { textAlign: newTextAlign } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Target Date' ) } initialOpen={ false }>
					<DatePicker
						currentDate={ countdownDate }
						onChange={ ( newCountdownDate ) =>
							setAttributes( { countdownDate: newCountdownDate } )
						}
					/>
				</PanelBody>

				<PanelBody title={ __( 'Settings' ) } initialOpen={ false }>
					<TextControl
						label={ __( ' Heading', 'mxs-countdown' ) }
						value={ countdownHeading }
						onChange={ ( newCountdownHeading ) =>
							setAttributes( {
								countdownHeading: newCountdownHeading,
							} )
						}
					/>

					<TextControl
						label={ __( ' Target Date Message', 'mxs-countdown' ) }
						value={ countdownMessage }
						onChange={ ( newCountdownMessage ) =>
							setAttributes( {
								countdownMessage: newCountdownMessage,
							} )
						}
					/>

					<TextControl
						label={ __(
							' Heading Font Size (rem)',
							'mxs-countdown'
						) }
						value={ countdownHeadingFontSize }
						onChange={ ( newCountdownHeadingFontSize ) =>
							setAttributes( {
								countdownHeadingFontSize:
									newCountdownHeadingFontSize,
							} )
						}
					/>
					<TextControl
						label={ __(
							' Countdown Font Size (rem)',
							'mxs-countdown'
						) }
						value={ countdownFontSize }
						onChange={ ( newCountdownFontSize ) =>
							setAttributes( {
								countdownFontSize: newCountdownFontSize,
							} )
						}
					/>

					<SelectControl
						label={ __( ' Units Delimeter', 'mxs-countdown' ) }
						value={ countdownUnitsDelimeter }
						options={ [
							{ label: '•', value: '•' },
							{ label: '>', value: '>' },
							{ label: ':', value: ':' },
							{ label: '|', value: '|' },
						] }
						onChange={ ( newCountdownUnitsDelimeter ) =>
							setAttributes( {
								countdownUnitsDelimeter:
									newCountdownUnitsDelimeter,
							} )
						}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __( ' Box Width', 'mxs-countdown' ) }
						value={ boxWidth }
						onChange={ ( newBoxWidth ) =>
							setAttributes( { boxWidth: newBoxWidth } )
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
							fontSize: `${ countdownHeadingFontSize }rem`,
						} }
					>
						{ countdownHeading }
					</h6>
				) }
				<div
					id="mxs-countdown"
					style={ {
						fontSize: `${ countdownFontSize }rem`,
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
