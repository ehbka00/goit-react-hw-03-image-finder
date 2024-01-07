import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { getGalleryItems } from '../../api.js';

import styles from './imageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps) {
    const { searchString: prevSearchString, page: prevPage } = prevProps;
    const { searchString: currentSearchString, page: currentPage } = this.props;
    const page = this.props.page;

    if (prevSearchString !== currentSearchString || currentPage !== prevPage) {
      this.props.onLoading({ images: [], isLoading: true });
      try {
        const response = getGalleryItems(currentSearchString, page);
        response
          .then(response => {
            if (response.status === 200) return response.data;
            Promise.reject(new Error('Something went wrong'));
          })
          .then(images => {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
            }));
            this.props.onLoading({ images: images.hits, isLoading: false });
          })
          .catch(() => {
            this.setState({ images: [], isLoading: false });
            this.props.onLoading({ images: [], isLoading: false });
          });
      } catch (error) {
        console.log(error.message);
        this.setState({ images: [], isLoading: false });
      }
    }
  }

  handleItemClick = item => {
    this.props.onClick(item);
  };

  render() {
    const { images } = this.state;

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
