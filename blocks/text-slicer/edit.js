/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, RangeControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import metadata from "./block.json";

function Edit(props) {
	const { attributes, setAttributes } = props;
	const inlineStyles = {
		maxWidth: attributes.boxWidth + "vw",
		fontSize: attributes.fontSize + "vw",
		textAlign: attributes.textAlign,
	};
	const blockProps = useBlockProps({
		className: "wrapper",
		style: inlineStyles,
	});

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={attributes.textAlign}
					onChange={(textAlign) => setAttributes({ textAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={__("CONTROLS", metadata.texdomain)}
					initialOpen={true}
				>
					<TextControl
						label={__("Text")}
						value={attributes.textInput}
						onChange={(textInput) => setAttributes({ textInput })}
					/>

					<RangeControl
						label="Font Size"
						value={attributes.fontSize}
						onChange={(fontSize) => setAttributes({ fontSize })}
						min={3}
						max={15}
					/>
					<RangeControl
						label="Box Width"
						value={attributes.boxWidth}
						onChange={(boxWidth) => setAttributes({ boxWidth })}
						min={3}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="top">
					{__(attributes.textInput, metadata.textdomain)}
				</div>
				<div className="bottom" aria-hidden="true">
					{__(attributes.textInput, metadata.textdomain)}
				</div>
			</div>
		</>
	);
}
export default Edit;
