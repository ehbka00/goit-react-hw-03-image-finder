import { Component } from 'react';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

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
    const currentPage = this.state.page;
    const prevPage = prevState.page;

    if (prevPage !== currentPage) {
      this.setState({ isLoading: true });
    }
  }

  handleSubmit = searchString => {
    this.setState({ searchString });
  };

  handleLoadingMore = response => {
    this.setState({ images: response.images, isLoading: response.isLoading });
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
    const { images, isLoading, searchString, page, showModal, currentItem } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          searchString={searchString}
          page={page}
          onLoading={this.handleLoadingMore}
          onClick={this.handleItemClick}
        />
        {showModal && <Modal onClose={this.toggleModal} item={currentItem} />}
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleClick} />}
      </>
    );
  }
}
