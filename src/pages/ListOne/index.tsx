/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { format } from 'date-fns';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import ModalDelete from './ModalDelete';

import api from '../../services/api';

import {
  Container,
  ContainerData,
  TitleText,
  OrderContainer,
  OrderContainerInfo,
  OrderText,
  OrderTextContent,
  OrderDivisor,
  ButtonsContainer,
  ButtonDeleteOrder,
  ButtonChangeOrder,
  ButtonMoveOrder,
  Icon,
  IconText,
} from './styles';

interface RouteParams {
  orderID: string;
  userID: string;
  titleName: string;
}

export interface Order {
  id: string;
  user_id: string;
  client: string;
  modelName: string;
  type: string;
  entryDate: string;
  entryDateFormated: string;
  departureDate: Date;
  departureDateFormated: string;
  modelingTime: Date;
  modelingTimeFormated: string;
  cuttingTime: Date;
  cuttingTimeFormated: string;
  setupTime: Date;
  setupTimeFormated: string;
  sewingTime: Date;
  sewingTimeFormated: string;
  finishingTime: Date;
  finishingTimeFormated: string;
  readyDate: Date;
  readyDateFormated: string;
  deliveredDate: Date;
  deliveredDateFormated: string;
  numberOfPieces: number;
  sector: string;
  rawMaterial: string;
  changed: string;
}

export interface User {
  id: string;
  name: string;
}

const ListOne: React.FC = () => {
  const { user } = useAuth();

  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [order, setOrder] = useState<Order>({} as Order);
  const [userOrder, setUserOrder] = useState<User>({} as User);

  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [moveDisabled, setMoveDisabled] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    api.get(`orders/byid?id=${routeParams.orderID}`).then(response => {
      const orderData = response.data;
      setOrder(orderData);
      if (
        orderData.changed === 'T' ||
        orderData.user_id !== user.id ||
        orderData.sector === 'Entregue'
      ) {
        setDeleteDisabled(true);
      }
      if (orderData.user_id !== user.id || orderData.sector === 'Entregue') {
        setEditDisabled(true);
      }
      if (orderData.sector === 'Entregue') {
        setMoveDisabled(true);
      }
    });

    api.get(`users/byid?id=${routeParams.userID}`).then(response => {
      const user = response.data;
      setUserOrder(user);
    });
  }, [routeParams.orderID, routeParams.userID, user.id]);

  const navigationBackModalDelete = useCallback(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  }, [navigation]);

  const handleDelete = useCallback(() => {
    return Alert.alert('Deletar', 'Deseja realmente deletar o pedido?', [
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await api
              .delete('orders', {
                data: {
                  id: order.id,
                  client: order.client,
                  modelName: order.modelName,
                  sector: order.sector,
                },
              })
              .then(
                response => {
                  console.log(response.data);
                  setShowModalDelete(true);
                  navigationBackModalDelete();
                },
                error => {
                  console.log(error.response.data);
                  Alert.alert(
                    'Erro na deleção de pedido',
                    `Ocorreu um erro ao realizar a adição do pedido: ${error.response.data}`,
                  );
                },
              );
          } catch (err) {
            console.log(err);
            Alert.alert(
              'Erro na deleção de pedido',
              `Ocorreu um erro ao realizar a adição do pedido: ${err}`,
            );
          }
        },
        style: 'default',
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }, [
    navigationBackModalDelete,
    order.client,
    order.id,
    order.modelName,
    order.sector,
  ]);

  return (
    <>
      <ModalDelete visible={showModalDelete} />
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <ContainerData>
            <TitleText>Pedido selecionado:</TitleText>
            <OrderContainer>
              <OrderContainerInfo>
                <OrderText>Cliente: </OrderText>
                <OrderTextContent>{order?.client}</OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Modelo: </OrderText>
                <OrderTextContent>{order?.modelName}</OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Criado por: </OrderText>
                <OrderTextContent>{userOrder.name}</OrderTextContent>
              </OrderContainerInfo>
              <OrderDivisor />
              <OrderContainerInfo>
                <OrderText>Tipo: </OrderText>
                <OrderTextContent>{order.type}</OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Número de peças: </OrderText>
                <OrderTextContent>{order.numberOfPieces}</OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Material: </OrderText>
                <OrderTextContent>{order.rawMaterial}</OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Setor atual: </OrderText>
                <OrderTextContent>{order.sector}</OrderTextContent>
              </OrderContainerInfo>
              <OrderDivisor />
              <OrderContainerInfo>
                <OrderText>Data Modelagem: </OrderText>
                <OrderTextContent>
                  {order.modelingTime
                    ? format(new Date(order.modelingTime), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Corte: </OrderText>
                <OrderTextContent>
                  {order.cuttingTime
                    ? format(new Date(order.cuttingTime), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Preparação: </OrderText>
                <OrderTextContent>
                  {order.setupTime
                    ? format(new Date(order.setupTime), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Costura: </OrderText>
                <OrderTextContent>
                  {order.sewingTime
                    ? format(new Date(order.sewingTime), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Acabamento: </OrderText>
                <OrderTextContent>
                  {order.finishingTime
                    ? format(new Date(order.finishingTime), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Pronto: </OrderText>
                <OrderTextContent>
                  {order.readyDate
                    ? format(new Date(order.readyDate), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Data Entregue: </OrderText>
                <OrderTextContent>
                  {order.deliveredDate
                    ? format(new Date(order.deliveredDate), 'dd/MM/yyyy')
                    : null}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderContainerInfo>
                <OrderText>Alterado: </OrderText>
                <OrderTextContent>
                  {order.changed === 'T' ? 'Sim' : 'Não'}
                </OrderTextContent>
              </OrderContainerInfo>
              <OrderDivisor />
              <ButtonsContainer>
                <ButtonDeleteOrder
                  disabled={deleteDisabled}
                  onPress={handleDelete}
                >
                  <Icon
                    name="trash"
                    size={28}
                    color={deleteDisabled ? '#c0c0c0' : '#4f4841'}
                  />
                  <IconText disabled={deleteDisabled}>Deletar</IconText>
                </ButtonDeleteOrder>
                <ButtonChangeOrder disabled={editDisabled}>
                  <Icon
                    name="edit"
                    size={28}
                    color={editDisabled ? '#c0c0c0' : '#4f4841'}
                  />
                  <IconText disabled={editDisabled}>Editar</IconText>
                </ButtonChangeOrder>
                <ButtonMoveOrder disabled={editDisabled}>
                  <Icon
                    name="forward"
                    size={28}
                    color={moveDisabled ? '#c0c0c0' : '#4f4841'}
                  />
                  <IconText disabled={editDisabled}>Mover</IconText>
                </ButtonMoveOrder>
              </ButtonsContainer>
            </OrderContainer>
          </ContainerData>
        </Container>
      </ScrollView>

      <BottomNavigation />
    </>
  );
};

export default ListOne;
