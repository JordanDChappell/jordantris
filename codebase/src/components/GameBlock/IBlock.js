import Block from './Block';

export default class IBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#00FFFF');

    // Create images to display in each block of the shape
    // var image1 = document.createElement('img');
    // image1.src =
    //   'https://images.jordanchappell.com/projects/jordantris/i_block/block_1.gif';
    // var image2 = document.createElement('img');
    // image2.src =
    //   'https://images.jordanchappell.com/projects/jordantris/i_block/block_2.gif';
    // var image3 = document.createElement('img');
    // image3.src =
    //   'https://images.jordanchappell.com/projects/jordantris/i_block/block_3.gif';
    // var image4 = document.createElement('img');
    // image4.src =
    //   'https://images.jordanchappell.com/projects/jordantris/i_block/block_4.gif';

    this.shapeMatrix = [
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
      ],
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ];
  }
}
