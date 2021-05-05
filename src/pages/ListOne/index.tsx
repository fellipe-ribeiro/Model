import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';

import { string } from 'yup/lib/locale';
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

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
import api from '../../services/api';

interface RouteParams {
  orderID: string;
  userID: string;
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
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [order, setOrder] = useState<Order>({} as Order);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    api.get(`orders/byid?id=${routeParams.orderID}`).then(response => {
      const orderData = response.data;
      setOrder(orderData);
    });

    api.get(`users/byid?id=${routeParams.userID}`).then(response => {
      const user = response.data;
      setUser(user);
    });
  }, [routeParams.orderID, routeParams.userID]);

  return (
    <>
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
                <OrderTextContent>{user.name}</OrderTextContent>
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
                <ButtonDeleteOrder>
                  <Icon name="trash" size={28} color="#4f4841" />
                  <IconText>Deletar</IconText>
                </ButtonDeleteOrder>
                <ButtonChangeOrder>
                  <Icon name="edit" size={28} color="#4f4841" />
                  <IconText>Editar</IconText>
                </ButtonChangeOrder>
                <ButtonMoveOrder>
                  <Icon name="forward" size={28} color="#4f4841" />
                  <IconText>Mover</IconText>
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
