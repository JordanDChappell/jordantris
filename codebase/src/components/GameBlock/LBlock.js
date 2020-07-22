import Block from './Block';

export default class LBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#72CB3B');
    this.shapeMatrix = [
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
      ],
      [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
      ]
    ];
  }
}