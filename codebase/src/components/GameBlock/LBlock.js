import Block from './Block';

export default class LBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFA500');
    this.shapeMatrix = [
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ]
    ];
  }
}
