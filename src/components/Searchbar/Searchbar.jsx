import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const searchString = event.currentTarget.lastChild.value;

    if (searchString === '') {
      toast.error('The search field should not be empty.', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    this.props.onSubmit(searchString);
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button className={styles.button} type="submit">
            <span className={styles.button_label}></span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
