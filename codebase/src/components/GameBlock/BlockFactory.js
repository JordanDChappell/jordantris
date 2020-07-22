import TBLock from './TBlock';
import ZBlock from './ZBLock';
import SquareBlock from './SquareBlock';
import LBlock from './LBlock';
import IBlock from './IBlock';

/**
 * * Block shape factory, creates and returns the require game pieces.
 * @param {string} shape | Single char value to reference a block shape
 * @param {object} context | HTML canvas context to draw the shapes on
 * @param {number} size | Size in pixels of each square block that makes up a shape
 */
export default function createBlock(shape, context, size) {
  switch (shape) {
    case 'Z': {
      return new ZBlock(context, size);
    }
    case 'T': {
      return new TBLock(context, size);
    }
    case 'S': {
      return new SquareBlock(context, size);
    }
    case 'L': {
      return new LBlock(context, size);
    }
    case 'I': {
      return new IBlock(context, size);
    }
    default: {
      return null;
    }
  }
}
