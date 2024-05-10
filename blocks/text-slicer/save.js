/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import metadata from "./block.json";

function Save(props) {
	const { attributes } = props;
	const inlineStyles = {
		maxWidth: attributes.boxWidth + "vw",
		fontSize: attributes.fontSize + "vw",
		textAlign: attributes.textAlign,
	};
	const blockProps = useBlockProps.save({
		className: "wrapper",
		style: inlineStyles,
	});

	return (
		<>
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
export default Save;
