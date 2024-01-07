import styles from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles.load_more_btn}>
      <input
        className={styles.button}
        type="button"
        value="Load more"
        onClick={onClick}
      />
    </div>
  );
};

export default Button;
