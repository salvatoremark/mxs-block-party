/**
 * WordPress dependencies
 */
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';

function Edit( {
	attributes: { boxWidth, fontSize, textAlign, textInput },
	setAttributes,
} ) {
	const inlineStyles = {
		maxWidth: boxWidth + 'vw',
		fontSize: fontSize + 'vw',
		textAlign: textAlign,
	};
	const blockProps = useBlockProps( {
		className: 'wrapper',
		style: inlineStyles,
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( textAlign ) => setAttributes( { textAlign } ) }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', metadata.texdomain ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Text to Slice' ) }
						value={ textInput }
						onChange={ ( textInput ) =>
							setAttributes( { textInput } )
						}
					/>
					<RangeControl
						label={ __( 'Font Size', metadata.texdomain ) }
						value={ fontSize }
						onChange={ ( fontSize ) =>
							setAttributes( { fontSize } )
						}
						min={ 3 }
						max={ 15 }
					/>
					<RangeControl
						label={ __( 'Box Width', metadata.texdomain ) }
						value={ boxWidth }
						onChange={ ( boxWidth ) =>
							setAttributes( { boxWidth } )
						}
						min={ 3 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>
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
export default Edit;
