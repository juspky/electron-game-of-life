import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 30px 30px;
    background-color: ${props => props.theme.mainSecondary};
`;

export default class MenuModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Modal onClick={(e) => e.stopPropagation()}>
          {this.props.children}
        </Modal>
    );
  }
}