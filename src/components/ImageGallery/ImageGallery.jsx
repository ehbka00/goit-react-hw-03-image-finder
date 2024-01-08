import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

import styles from './imageGallery.module.css';

class ImageGallery extends Component {
  handleItemClick = item => {
    this.props.onClick(item);
  };

  render() {
    const { images } = this.props;

    return (
      <>
        {images.length > 0 && (
          <ul className={styles.gallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={this.handleItemClick}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ImageGallery;
