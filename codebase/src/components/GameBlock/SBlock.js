import Block from './Block';

export default class ZBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#008000');

    // Create images to display in each block of the shape
    var image1 = document.createElement('img');
    image1.src =
      'https://images.jordanchappell.com/projects/jordantris/s_block/block_1.gif';
    var image2 = document.createElement('img');
    image2.src =
      'https://images.jordanchappell.com/projects/jordantris/s_block/block_2.gif';
    var image3 = document.createElement('img');
    image3.src =
      'https://images.jordanchappell.com/projects/jordantris/s_block/block_3.gif';
    var image4 = document.createElement('img');
    image4.src =
      'https://images.jordanchappell.com/projects/jordantris/s_block/block_4.gif';

    this.shapeMatrix = [
      [
        [0, image3, image4],
        [image1, image2, 0],
        [0, 0, 0]
      ],
      [
        [image1, 0, 0],
        [image2, image3, 0],
        [0, image4, 0]
      ]
    ];
  }
}
