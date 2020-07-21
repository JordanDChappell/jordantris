import Tetro from './Tetro';
import Zetro from './Zetro';
import Sqetro from './Sqetro';
import Letro from './Letro';

export default function createTetromino(shape, context, size) {
  switch (shape) {
    case 'z': {
      return new Zetro(context, size);
    }
    case 't': {
      return new Tetro(context, size);
    }
    case 'square': {
      return new Sqetro(context, size);
    }
    case 'l': {
      return new Letro(context, size);
    }
    default: {
      return null;
    }
  }
}
