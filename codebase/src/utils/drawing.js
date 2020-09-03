/**
 * * Draws an image to the HTML canvas context.
 * @param {object} context | Canvas context to draw on
 * @param {HTMLElement} image | Image element to draw to the canvas
 * @param {number} x | x position to begin drawing
 * @param {number} y | y pos
 * @param {number} width | x direction length of the image
 * @param {number} height | y direction length of the image 
 * @param {number} rotation | rotation in degrees
 */
export const drawImage = (
  context,
  image,
  x,
  y,
  width,
  height,
  rotation = 0
) => {
  // save the canvas context so that we can restore translations
  context.save();
  context.translate(x, y);

  if (rotation > 0) {
    // calculate offset based on rotation angle
    const xOffset = rotation > 90 ? -width : 0;
    const yOffset = rotation > 180 ? 0 : -height;

    // rotate the canvas and translate origin to account for rotation
    context.rotate((rotation * Math.PI) / 180);
    context.translate(xOffset, yOffset);
  }

  // draw the image on the new canvas origin
  context.drawImage(image, 1, 1, width - 2, height - 2);

  // restore the canvas context
  context.restore();
};

/**
 * * Draw a box to the HTML canvas context.
 * @param {object} context | Canvas context to draw on
 * @param {number} x | x position to begin drawing
 * @param {number} y | y pos
 * @param {number} width | x direction length of the image
 * @param {number} height | y direction length of the image 
 * @param {string} fill | optional fill colour, will fill in the box
 */
export const drawBox = (context, x, y, width, height, fill = null) => {
  context.strokeRect(x, y, width, height); // draw the box outline

  if (fill) {
    context.fillStyle = fill;
    context.fillRect(x + 1, y + 1, width - 2, height - 2); // draw the box color, slightly smaller than the outline
  }
};
