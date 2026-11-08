import React, { PureComponent } from 'react';
import styled from 'styled-components';
import _Grid from './grid';

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
        <Container $opacity={opacity}>
          <Grid $debug={fill}>
            {Array(12)
              .fill()
              .map((_, i) => (
                <Content key={i}>{i + 1}</Content>
              ))}
          </Grid>
        </Container>
      )
    );
  }
}

export default GridGuide;

const Container = styled.div`
  pointer-events: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 100;
  opacity: ${({ $opacity }) => $opacity};
`;

const Grid = styled(_Grid)`
  height: 100%;
`;

const Content = styled.div`
  outline: 1px solid rgba(255, 0, 0, 0.8);
  height: 100%;
`;
