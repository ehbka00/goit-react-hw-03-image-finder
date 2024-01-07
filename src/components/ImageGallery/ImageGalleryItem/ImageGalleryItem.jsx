import { Component } from 'react';
import styles from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClick = e => {
    this.props.onClick(e.target);
  };

  render() {
    const image = this.props.image;

    return (
      <li className={styles.item} onClick={this.handleClick}>
        <img
          className={styles.image}
          src={image.webformatURL}
          alt={image.user}
          datafullscreenurl={image.largeImageURL}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
