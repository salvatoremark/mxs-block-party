/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import icon from "./assets/icon.svg";
import metadata from "./block.json";

/**
 * All files containing `style` keyword are bundled together. The code
 * gets applied both to the frontend and the editor.
 */
import "./style.scss";

/**
 * Once the DOM is fully loaded, check if the 'textInput' attribute
 * is empty. If it is, the update button for the post is disabled.
 * Conversely, if the attribute has content, the button is enabled.
 * This precaution ensures that the block remains visible and easily
 * modifiable or removable
 */
wp.domReady(() => {
	let updateButtonIsLocked = false;

	// Subscribe to editor state changes.
	wp.data.subscribe(() => {
		const textInputIsEmpty = wp.data
			.select("core/block-editor")
			.getBlocks()
			.filter((block) => {
				return (
					block.name == metadata.name && !block.attributes.textInput.length
				);
			});

		if (textInputIsEmpty.length && updateButtonIsLocked == false) {
			updateButtonIsLocked = true;
			wp.data.dispatch("core/editor").lockPostSaving("textInputRequired");
		}

		if (!textInputIsEmpty.length && updateButtonIsLocked) {
			updateButtonIsLocked = false;
			wp.data.dispatch("core/editor").unlockPostSaving("textInputRequired");
		}
	});
});

registerBlockType(metadata.name, {
	edit,
	save,
	icon: <img src={icon} width="25px" alt="" />,
});
