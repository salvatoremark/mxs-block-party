/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';

function Save( { attributes: { boxWidth, fontSize, textAlign, textInput } } ) {
	const inlineStyles = {
		maxWidth: boxWidth + 'vw',
		fontSize: fontSize + 'vw',
		textAlign,
	};
	const blockProps = useBlockProps.save( {
		className: 'wrapper',
		style: inlineStyles,
	} );

	return (
		<>
			<div { ...blockProps }>
				<div className="top">
					{ __( textInput, metadata.textdomain ) }
				</div>
				<div className="bottom" aria-hidden="true">
					{ __( textInput, metadata.textdomain ) }
				</div>
			</div>
		</>
	);
}
export default Save;
