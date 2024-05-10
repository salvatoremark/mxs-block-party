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
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import metadata from "./block.json";

export default function Edit({ attributes, setAttributes }) {
	const { boxWidth, fontSize, textAlign, textInput, styleclass } = attributes;
	const inlineStyles = {
		maxWidth: boxWidth + "vw",
		fontSize: fontSize + "vw",
		textAlign: textAlign,
	};
	const blockProps = useBlockProps({
		className: styleclass,
		style: inlineStyles,
	});

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(textAlign) => setAttributes({ textAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={__("Settings", metadata.texdomain)}
					initialOpen={true}
				>
					<TextControl
						label={__("Text")}
						value={textInput}
						onChange={(textInput) => setAttributes({ textInput })}
					/>
					<SelectControl
						label={__("Style", metadata.texdomain)}
						value={styleclass}
						options={[
							{
								label: __("Elegant", metadata.texdomain),
								value: "elegantshadow",
							},
							{ label: __("Deep", metadata.texdomain), value: "deepshadow" },
							{ label: __("Inset", metadata.texdomain), value: "insetshadow" },
							{ label: __("Retro", metadata.texdomain), value: "retroshadow" },
						]}
						onChange={(styleclass) => {
							setAttributes({ styleclass });
						}}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Font Size"
						value={fontSize}
						onChange={(fontSize) => setAttributes({ fontSize })}
						min={3}
						max={15}
					/>
					<RangeControl
						label="Box Width"
						value={boxWidth}
						onChange={(boxWidth) => setAttributes({ boxWidth })}
						min={3}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>{__(textInput, metadata.textdomain)}</div>
		</>
	);
}
