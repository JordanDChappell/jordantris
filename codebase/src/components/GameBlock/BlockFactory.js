import TBLock from './TBlock';
import ZBlock from './ZBLock';
import OBlock from './OBlock';
import LBlock from './LBlock';
import IBlock from './IBlock';
import SBlock from './SBlock';
import JBlock from './JBlock';

/**
 * * Block shape factory, creates and returns the require game pieces.
 * @param {string} shape | Single char value to reference a block shape
 * @param {object} context | HTML canvas context to draw the shapes on
 * @param {number} size | Size in pixels of each square block that makes up a shape
 */
export default function CreateBlock(shape, context, size) {
  switch (shape) {
    case 'Z': {
      return new ZBlock(context, size);
    }
    case 'T': {
      return new TBLock(context, size);
    }
    case 'S': {
      return new SBlock(context, size);
    }
    case 'L': {
      return new LBlock(context, size);
    }
    case 'I': {
      return new IBlock(context, size);
    }
    case 'J': {
      return new JBlock(context, size);
    }
    case 'O': {
      return new OBlock(context, size);
    }
    default: {
      return null;
    }
  }
}
