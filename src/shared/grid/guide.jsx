import React, { PureComponent } from 'react';
import Grid from './grid';
import styles from './guide.module.css';

class GridGuide extends PureComponent {
  state = {
    show: false,
    fill: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ keyCode, metaKey }) => {
    if (keyCode === 186 && metaKey) {
      this.setState(({ show }) => ({
        show: !show,
      }));
    } else if (keyCode === 222 && metaKey && this.state.show) {
      this.setState(({ fill }) => ({
        fill: !fill,
      }));
    }
  };

  render() {
    const { opacity = 0.5 } = this.props;
    const { show, fill } = this.state;

    return (
      show && (
        <div className={styles.container} style={{ opacity }}>
          <Grid className={styles.grid} debug={fill}>
            {Array(12)
              .fill()
              .map((_, i) => (
                <div className={styles.column} key={i}>
                  {i + 1}
                </div>
              ))}
          </Grid>
        </div>
      )
    );
  }
}

export default GridGuide;
