import Block from './Block';
import Image1 from '../../images/o_block/block_1.gif';
import Image2 from '../../images/o_block/block_2.gif';
import Image3 from '../../images/o_block/block_3.gif';
import Image4 from '../../images/o_block/block_4.gif';

export default class OBlock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFFF00');

    // Create images to display in each block of the shape
    var image1 = document.createElement('img');
    image1.src = Image1;
    var image2 = document.createElement('img');
    image2.src = Image2;
    var image3 = document.createElement('img');
    image3.src = Image3;
    var image4 = document.createElement('img');
    image4.src = Image4;

    this.shapeMatrix = [
      [
        [image1, image2],
        [image4, image3]
      ]
    ];
  }
}
