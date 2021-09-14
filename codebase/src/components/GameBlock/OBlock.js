import Block from './Block';

export default class OBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFFF00');

    // Create images to display in each block of the shape
    var image1 = document.createElement('img');
    image1.src =
      'https://images.jordanchappell.com/projects/jordantris/o_block/block_1.gif';
    var image2 = document.createElement('img');
    image2.src =
      'https://images.jordanchappell.com/projects/jordantris/o_block/block_2.gif';
    var image3 = document.createElement('img');
    image3.src =
      'https://images.jordanchappell.com/projects/jordantris/o_block/block_3.gif';
    var image4 = document.createElement('img');
    image4.src =
      'https://images.jordanchappell.com/projects/jordantris/o_block/block_4.gif';

    this.shapeMatrix = [
      [
        [image1, image2],
        [image4, image3]
      ]
    ];
  }
}
