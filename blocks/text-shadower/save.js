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
	attributes: { boxWidth, fontSize, textAlign, textInput, styleclass },
} ) {
	const inlineStyles = {
		maxWidth: boxWidth + 'vw',
		fontSize: fontSize + 'vw',
		textAlign,
	};

	const blockProps = useBlockProps.save( {
		className: styleclass,
		style: inlineStyles,
	} );

	return <div { ...blockProps }>{ __( textInput, metadata.texdomain ) }</div>;
}
