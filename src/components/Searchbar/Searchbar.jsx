import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchString: '',
  };

  handleChange = event => {
    this.setState({
      searchString: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchString === '') {
      toast.error('The search field should not be empty.', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    this.props.onSubmit(this.state.searchString);
  };

  render() {
    const { searchString } = this.state;

    return (
      <header className={styles.searchbar}>
        <form
          className={styles.form}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <button className={styles.button} type="submit">
            <span className={styles.button_label}></span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchString}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
