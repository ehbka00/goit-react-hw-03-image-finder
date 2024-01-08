import { Component } from 'react';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { getGalleryItems } from '../api.js';

export class App extends Component {
  state = {
    images: [],
    searchString: '',
    isLoading: false,
    page: 1,
    showModal: false,
    currentItem: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchString: prevSearchString, page: prevPage } = prevState;
    const { searchString: currentSearchString, page: currentPage } = this.state;

    if (prevSearchString !== currentSearchString || currentPage !== prevPage) {
      this.setState({ isLoading: true });
      try {
        const response = getGalleryItems(currentSearchString, currentPage);
        response
          .then(response => {
            if (response.status === 200) return response.data;
            Promise.reject(new Error('Something went wrong'));
          })
          .then(images => {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              isLoading: false,
            }));
          })
          .catch(() => {
            this.setState({ isLoading: false });
          });
      } catch (error) {
        console.log(error.message);
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = searchString => {
    this.setState({
      images: [],
      searchString: searchString,
      isLoading: true,
      page: 1,
      showModal: false,
      currentItem: {},
    });
  };

  handleClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleItemClick = item => {
    this.setState({
      currentItem: item,
      showModal: true,
    });
  };

  render() {
    const { images, isLoading, showModal, currentItem } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onClick={this.handleItemClick} />
        {showModal && <Modal onClose={this.toggleModal} item={currentItem} />}
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleClick} />}
      </>
    );
  }
}
