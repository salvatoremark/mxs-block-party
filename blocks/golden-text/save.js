/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';

export default function Save( {
	attributes: { boxWidth, fontSize, textAlign, textInput },
} ) {
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
				<div className="bg">
					{ __( textInput, metadata.texdomain ) }
				</div>
				<div className="fg">
					{ __( textInput, metadata.texdomain ) }
				</div>
			</div>
		</>
	);
}
