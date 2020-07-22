import Block from './Block';

export default class SquareBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFD500');
    this.shapeMatrix = [
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
      ]
    ];
  }
}
