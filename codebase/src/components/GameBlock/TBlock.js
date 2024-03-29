import Block from './Block';
import Image1 from '../../images/t_block/block_1.gif';
import Image2 from '../../images/t_block/block_2.gif';
import Image3 from '../../images/t_block/block_3.gif';
import Image4 from '../../images/t_block/block_4.gif';

export default class TBLock extends Block {
  constructor(context, blockSize) {
    super(context, blockSize, '#800080');

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
        [image1, image2, image3],
        [0, image4, 0],
        [0, 0, 0]
      ],
      [
        [0, 0, image1],
        [0, image4, image2],
        [0, 0, image3]
      ],
      [
        [0, 0, 0],
        [0, image4, 0],
        [image3, image2, image1]
      ],
      [
        [image3, 0, 0],
        [image2, image4, 0],
        [image1, 0, 0]
      ]
    ];
  }

  static preLoadImages() {
    Block.preLoadImages('tblock', [Image1, Image2, Image3, Image4]);
  }
}
