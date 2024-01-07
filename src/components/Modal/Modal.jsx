import { createPortal } from 'react-dom';
import { Component } from 'react';

import styles from './modal.module.css';

const modal = document.querySelector('#modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickModal = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { item } = this.props;

    return createPortal(
      <div className={styles.overlay} onClick={this.handleClickModal}>
        <div className={styles.modal}>
          <img
            src={item.getAttribute('datafullscreenurl')}
            alt={item.getAttribute('alt')}
          />
        </div>
      </div>,
      modal
    );
  }
}

export default Modal;
