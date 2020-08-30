import Block from './Block';

export default class OBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFFF00');
    this.shapeMatrix = [
      [
        [1, 1],
        [1, 1]
      ]
    ];
  }
}
