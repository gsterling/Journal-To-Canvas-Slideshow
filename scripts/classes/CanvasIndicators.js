export class CanvasIndicators {
    static async setUpIndicators(foundTileData, tileDoc) {
        if (!tileDoc) {
            ui.notifications.error("No tile doc was provided.");
            return;
        }
        let type = "unlinked";
        if (foundTileData) {
            type = foundTileData.isBoundingTile ? "frame" : "art";
        }
        await CanvasIndicators.createTileIndicator(tileDoc, type);
        await CanvasIndicators.hideTileIndicator(tileDoc);
    }

    static async getColors() {
        let colors = {};
        let settingsColors = await game.JTCS.utils.getSettingValue("artGallerySettings", "indicatorColorData.colors");
        // let colors = { ...game.settings.get("journal-to-canvas-slideshow", "tileIndicatorColors") };
        colors.frameTileColor = settingsColors.frameTileColor || "#ff3300";
        colors.artTileColor = settingsColors.artTileColor || "#2f2190";
        colors.unlinkedTileColor = settingsColors.unlinkedTileColor || "#a2ff00";
        return colors;
    }
    static async createTileIndicator(tileDocument, type = "art") {
        if (!tileDocument) {
            ui.notifications.warn("Tile document not supplied.");
            return;
        }
        let tileDimensions = {
            width: tileDocument.data.width,
            height: tileDocument.data.height,
            x: tileDocument.data.x,
            y: tileDocument.data.y,
        };
        let tileObject = tileDocument.object;

        if (tileObject.overlayContainer) {
            //destroy the overlayContainer PIXI Container stored on the tileObject
            tileObject.overlayContainer.destroy();

            //delete the property itself that was storing it
            delete tileObject.overlayContainer;
        }
        let colors = await CanvasIndicators.getColors();
        let color;
        let fillAlpha = 0.5;
        let lineWidth;
        switch (type) {
            case "frame":
                color = colors.frameTileColor;
                fillAlpha = 0.5;
                lineWidth = 15;
                break;
            case "art":
                color = colors.artTileColor;
                fillAlpha = 0.5;
                lineWidth = 5;
                break;
            case "unlinked":
                color = colors.unlinkedTileColor;
                fillAlpha = 0.5;
                lineWidth = 15;
            case "default":
                break;
        }
        // console.warn("Our color is ", colors);
        // color = 0xff0000;
        // color =
        // fillAlpha = 0.2;
        color = color.substring(1);
        color = `0x${color}`;
        color = parseInt(color);
        // console.warn("Color is", color);
        // color = PIXI.utils.string2hex(color); //convert string hex format

        tileObject.overlayContainer = tileObject.addChild(new PIXI.Container());
        let overlayGraphic = new PIXI.Graphics();
        let whiteColor = 0xffffff;
        overlayGraphic.beginFill(whiteColor, fillAlpha);
        // overlayGraphic.fillStyle(color, fillAlpha);
        overlayGraphic.lineStyle(lineWidth, color, 1);
        overlayGraphic.tint = color;
        overlayGraphic.drawRect(0, 0, tileDimensions.width, tileDimensions.height);
        overlayGraphic.endFill();
        tileObject.overlayContainer.addChild(overlayGraphic);
        tileObject.overlayContainer.alpha = 0;
    }

    static async showTileIndicator(tileDocument, alpha = 1) {
        if (!tileDocument) {
            console.warn("Tile document not supplied.");
            return;
        }
        let tileObject = tileDocument.object;
        if (tileObject.overlayContainer) {
            tileObject.overlayContainer.alpha = alpha;
            console.log(tileObject.overlayContainer.children[0]);
        } else {
            console.error("No overlay container found");
        }
    }
    static async hideTileIndicator(tileDocument) {
        if (!tileDocument) {
            console.warn("No tile document supplied");
            return;
        }
        let tileObject = tileDocument.object;

        if (tileObject.overlayContainer) {
            tileObject.overlayContainer.alpha = 0;
        } else {
            console.error("No overlay container found");
        }
    }
    static deleteTileIndicator(tileDocument) {}
}
