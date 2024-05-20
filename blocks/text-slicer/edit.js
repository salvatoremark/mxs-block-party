/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

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
		textAlign,
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
					title={ __( 'CONTROLS', metadata.texdomain ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Text', metadata.texdomain ) }
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
export default Edit;
