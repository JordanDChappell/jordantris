import Block from './Block';

export default class TBLock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#800080');
    this.shapeMatrix = [
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1]
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0]
      ]
    ];
  }
}
