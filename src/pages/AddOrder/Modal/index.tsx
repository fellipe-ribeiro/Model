import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Modal,
  Container,
  ContainerMessage,
  TextMessage,
  Icon,
  OptionsContainer,
  OptionContainerAdd,
  OptionContainerBack,
  TextOptions,
} from './styles';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const ModalAddOrder: React.FC<Props> = ({ visible, onDismiss }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleAddNewOrder = useCallback(() => {
    onDismiss();
    navigation.replace('AddOrder', {
      titleName: 'Novo Pedido',
    });
  }, [navigation, onDismiss]);

  const handleBack = useCallback(() => {
    onDismiss();
    navigation.navigate('Dashboard');
  }, [navigation, onDismiss]);

  return (
    <Modal visible={visible}>
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ContainerMessage>
          <TextMessage>Pedido Adicionado</TextMessage>
          <Icon name="check" size={60} color="white" />
          <OptionsContainer>
            <OptionContainerAdd onPress={handleAddNewOrder}>
              <Icon name="plus" size={16} color="white" />
              <TextOptions>Adicionar</TextOptions>
            </OptionContainerAdd>
            <OptionContainerBack onPress={handleBack}>
              <Icon name="arrow-left" size={16} color="white" />
              <TextOptions>Voltar</TextOptions>
            </OptionContainerBack>
          </OptionsContainer>
        </ContainerMessage>
      </Container>
    </Modal>
  );
};

export default ModalAddOrder;
