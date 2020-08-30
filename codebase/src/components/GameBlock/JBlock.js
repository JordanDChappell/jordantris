import Block from './Block';

export default class JBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#0000FF');
    this.shapeMatrix = [
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
      ]
    ];
  }
}
