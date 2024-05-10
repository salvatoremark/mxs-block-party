/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { boxWidth, fontSize, textAlign, textInput, styleclass } = attributes;
	const inlineStyles = {
		maxWidth: boxWidth + "vw",
		fontSize: fontSize + "vw",
		textAlign: textAlign,
	};

	const blockProps = useBlockProps.save({
		className: styleclass,
		style: inlineStyles,
	});

	return <div {...blockProps}>{textInput}</div>;
}
