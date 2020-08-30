import Block from './Block';

export default class ZBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FF0000');
    this.shapeMatrix = [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ]
    ];
  }
}
