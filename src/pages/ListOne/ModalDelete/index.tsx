import React from 'react';
import { StatusBar } from 'react-native';

import {
  Modal,
  Container,
  ContainerMessage,
  TextMessage,
  Icon,
} from './styles';

interface Props {
  visible: boolean;
}

const ModalDelete: React.FC<Props> = ({ visible }) => {
  return (
    <Modal visible={visible}>
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ContainerMessage>
          <TextMessage>Pedido Deletado</TextMessage>
          <Icon name="trash" size={60} color="white" />
        </ContainerMessage>
      </Container>
    </Modal>
  );
};

export default ModalDelete;
