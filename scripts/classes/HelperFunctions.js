import { artGalleryDefaultSettings } from "../settings.js";
export class HelperFunctions {
    static MODULE_ID = "journal-to-canvas-slideshow";

    static resetArtGallerySettings() {
        HelperFunctions.setSettingValue("artGallerySettings", artGalleryDefaultSettings, "", true);
    }
    static async swapTools(layerName = "background", tool = "select") {
        ui.controls.controls.find((c) => c.layer === layerName).activeTool = tool;

        let ourLayer = game.canvas.layers.find((l) => l.options.name === layerName);
        if (ourLayer) {
            if (ourLayer && !ourLayer.active) {
                ourLayer?.activate();
            } else {
                ui.controls.render(true);
            }
        } else {
            console.error("Can't find that layer", ourLayer);
        }
    }

    /**
     *  Sets a value, using the "flattenObject" and "expandObject" utilities to reach a nested property
     * @param {String} settingName - the name of the setting
     * @param {*} updateData - the value you want to set a property to
     * @param {String} nestedKey - a string of dot-separated values to refer to a nested property
     */
    static async setSettingValue(settingName, updateData, nestedKey = "", isFormData = false) {
        if (isFormData) {
            let currentSettingData = game.settings.get(HelperFunctions.MODULE_ID, settingName);
            updateData = expandObject(updateData); //get expanded object version of formdata keys, which were strings in dot notation previously
            updateData = mergeObject(currentSettingData, updateData);
            // let updated = await game.settings.set(HelperFunctions.MODULE_ID, settingName, currentSettingData);
            // console.warn(updated);
        }
        if (nestedKey) {
            let settingData = game.settings.get(HelperFunctions.MODULE_ID, settingName);
            setProperty(settingData, nestedKey, updateData);
            await game.settings.set(HelperFunctions.MODULE_ID, settingName, settingData);
        } else {
            await game.settings.set(HelperFunctions.MODULE_ID, settingName, updateData);
        }
    }

    static async getSettingValue(settingName, nestedKey = "") {
        let settingData = game.settings.get(HelperFunctions.MODULE_ID, settingName);
        if (settingData) {
            if (nestedKey) {
                let nestedSettingData = getProperty(settingData, nestedKey);

                return nestedSettingData;
            }
            return settingData;
        } else {
            console.error("Cannot find setting with name " + settingName);
        }
    }

    static async checkSettingEquals(settingName, compareToValue) {
        if (game.settings.get(HelperFunctions.MODULE_ID, settingName) == compareToValue) {
            return true;
        }
        return false;
    }

    static async showWelcomeMessage() {
        let d = new Dialog({
            title: "Welcome Message",
            content: `<div><p>
			<h2>Journal To Canvas Slideshow Has Updated</h2>
			<ol style="list-style-type:decimal">
				<li><a href="https://youtu.be/t4NX55vs9gU">Watch the tutorial video here</a></li><br>
				<li>Please check the module's settings and reselect your prefered options, as the settings have changed</li><br>
				<li>Please recreate your Display Scene, or replace the tile in your display scene with a "Display Tile" (see tutorial video for how-to)</li><br>
				<li>Please create all Display Tiles from now on using the "Create Display Tile" button under the Tile controls.</li><br>
				<li>Note that Display Tiles now are "flagged" by the script and no longer need to be the very first tile in the scene, so you can add it after other tiles</li><br>
			</ol>
		</p>
		<p>The welcome message can be turned on and off in the module settings, but will be enabled after updates to inform you of important changes.</p>
		</div> `,
            buttons: {
                disable: {
                    label: "Disable Welcome Message",
                    callback: DisableWelcomeMessage,
                },
                continue: {
                    label: "Continue without Disabling",
                },
            },
        });
        d.render(true);
    }

    static async disableWelcomeMessage() {
        //disable the welcome message
        await HelperFunctions.setSettingValue("showWelcomeMessage", false);
    }

    /**
     *
     * @param {Object} templateData - the data to be passed to the popover
     * @param {Application} parentApp - the parent application rendering the popover
     * @param {Object} position - an object containing the position of the element that called for this popover (for tooltips and such)
     */
    static async createPopover(templateData, parentApp, position) {
        let popoverTemplate = game.JTCS.templates["popover"];
        let renderedHTML = await renderTemplate(popoverTemplate, templateData);
        parentApp.element.append(renderedHTML);
        let popoverElement = parentApp.element.find(".popover");
        popoverElement.css({ position: "absolute" });
        popoverElement.offset({ top: position.top, left: position.left });
        return popoverElement;
    }

    static async createDialog(title, templatePath, data) {
        const options = {
            width: 600,
            height: 250,
        };
        let renderedHTML = await renderTemplate(templatePath, data);
        let d = new Dialog(
            {
                title: title,
                content: renderedHTML,
                buttons: data.buttons,
            },
            options
        ).render(true);
    }
    static async createEventActionObject(name, callback, shouldRenderAppOnAction = false) {
        return {
            name: name,
            callback: callback,
            shouldRenderAppOnAction: shouldRenderAppOnAction,
        };
    }
}
