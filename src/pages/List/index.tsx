import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

import {
  Container,
  SortContainer,
  SortTitle,
  SortButtonClient,
  SortButtonDepartureDate,
  SortIcon,
  SortText,
  OrdersList,
  ContainerData,
  ItemContainer,
  InfoContainerAll,
  InfoContainer,
  InfoText,
  InfoContent,
  InfoDivisor,
} from './styles';
import api from '../../services/api';

export interface Order {
  id: string;
  user_id: string;
  client: string;
  modelName: string;
  type: string;
  sector: string;
  departureDate: Date;
  departureDateFormated: string;
}
interface RouteParams {
  titleName: string;
}

const Dashboard: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const navigation = useNavigation();

  const [orders, setOrders] = useState<Order[]>([]);
  const [scrollSortDate, setScrollSortDate] = useState(false);
  const [scrollSortClient, setScrollSortClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState(true);
  const [selectedClient, setSelectedClient] = useState(false);

  const flatlistRef = useRef<FlatList<Order>>(null);

  useEffect(() => {
    if (routeParams.titleName === 'Todos') {
      api.get('orders').then(response => {
        const ordersSorted = response.data.sort((a: Order, b: Order) => {
          return +new Date(b.departureDate) - +new Date(a.departureDate);
        });
        setOrders([...ordersSorted]);
        setScrollSortDate(false);
      });
    } else {
      api
        .get(`orders/sector?sectorName=${routeParams.titleName}`)
        .then(response => {
          const ordersSorted = response.data.sort((a: Order, b: Order) => {
            return +new Date(b.departureDate) - +new Date(a.departureDate);
          });
          setOrders([...ordersSorted]);
          setScrollSortDate(false);
        });
    }
  }, [routeParams.titleName]);

  const handleSortByClient = useCallback(() => {
    setSelectedClient(true);
    setSelectedDate(false);

    if (routeParams.titleName === 'Todos') {
      if (!scrollSortClient) {
        api.get('orders').then(response => {
          const ordersSorted = response.data.sort((a: Order, b: Order) => {
            return a.client.localeCompare(b.client);
          });
          setOrders([...ordersSorted]);
        });
      }

      if (scrollSortClient) {
        api.get('orders').then(response => {
          const ordersSorted = response.data.sort((a: Order, b: Order) => {
            return b.client.localeCompare(a.client);
          });
          setOrders([...ordersSorted]);
        });
      }
    } else {
      if (!scrollSortClient) {
        api
          .get(`orders/sector?sectorName=${routeParams.titleName}`)
          .then(response => {
            const ordersSorted = response.data.sort((a: Order, b: Order) => {
              return a.client.localeCompare(b.client);
            });
            setOrders([...ordersSorted]);
          });
      }

      if (scrollSortClient) {
        api
          .get(`orders/sector?sectorName=${routeParams.titleName}`)
          .then(response => {
            const ordersSorted = response.data.sort((a: Order, b: Order) => {
              return b.client.localeCompare(a.client);
            });
            setOrders([...ordersSorted]);
          });
      }
    }

    setScrollSortClient(!scrollSortClient);
    flatlistRef.current?.scrollToIndex({ index: 0 });
  }, [routeParams.titleName, scrollSortClient]);

  const handleSortByDate = useCallback(() => {
    setSelectedClient(false);
    setSelectedDate(true);

    if (routeParams.titleName === 'Todos') {
      if (!scrollSortDate) {
        api.get('orders').then(response => {
          const ordersSorted = response.data.sort((a: Order, b: Order) => {
            return +new Date(a.departureDate) - +new Date(b.departureDate);
          });
          setOrders([...ordersSorted]);
        });
      }
      if (scrollSortDate) {
        api.get('orders').then(response => {
          const ordersSorted = response.data.sort((a: Order, b: Order) => {
            return +new Date(b.departureDate) - +new Date(a.departureDate);
          });
          setOrders([...ordersSorted]);
        });
      }
    } else {
      if (!scrollSortDate) {
        api
          .get(`orders/sector?sectorName=${routeParams.titleName}`)
          .then(response => {
            const ordersSorted = response.data.sort((a: Order, b: Order) => {
              return +new Date(a.departureDate) - +new Date(b.departureDate);
            });
            setOrders([...ordersSorted]);
          });
      }
      if (scrollSortDate) {
        api
          .get(`orders/sector?sectorName=${routeParams.titleName}`)
          .then(response => {
            const ordersSorted = response.data.sort((a: Order, b: Order) => {
              return +new Date(b.departureDate) - +new Date(a.departureDate);
            });
            setOrders([...ordersSorted]);
          });
      }
    }

    setScrollSortDate(!scrollSortDate);
    flatlistRef.current?.scrollToIndex({ index: 0 });
  }, [routeParams.titleName, scrollSortDate]);

  return (
    <>
      <Header />

      <Container>
        <SortContainer>
          <SortTitle>Ordenar por:</SortTitle>
          <SortButtonClient onPress={() => handleSortByClient()}>
            <SortIcon
              name="users"
              size={18}
              color={selectedClient ? '#58769e' : '#746b62'}
            />
            <SortText selected={selectedClient}>Cliente</SortText>
          </SortButtonClient>
          <SortButtonDepartureDate onPress={() => handleSortByDate()}>
            <SortIcon
              name="calendar"
              size={18}
              color={selectedDate ? '#58769e' : '#746b62'}
            />
            <SortText selected={selectedDate}>Sáida</SortText>
          </SortButtonDepartureDate>
        </SortContainer>
        <OrdersList
          ref={flatlistRef}
          data={orders}
          keyExtractor={order => order.id}
          renderItem={({ item: order }) => (
            <ContainerData>
              <ItemContainer
                onPress={() => {
                  navigation.navigate('ListOne', {
                    titleName: 'Pedido',
                    orderID: order.id,
                    userID: order.user_id,
                  });
                }}
              >
                <InfoContainerAll>
                  <InfoContainer>
                    <InfoText>Cliente: </InfoText>
                    <InfoContent>{order.client}</InfoContent>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoText>Modelo: </InfoText>
                    <InfoContent>{order.modelName}</InfoContent>
                  </InfoContainer>
                  <InfoDivisor />
                  <InfoContainer>
                    <InfoText>Tipo: </InfoText>
                    <InfoContent>{order.type}</InfoContent>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoText>Setor: </InfoText>
                    <InfoContent>{order.sector}</InfoContent>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoText>Data de saída: </InfoText>
                    <InfoContent>
                      {format(new Date(order.departureDate), 'dd/MM/yyyy')}
                    </InfoContent>
                  </InfoContainer>
                </InfoContainerAll>
              </ItemContainer>
            </ContainerData>
          )}
        />
      </Container>

      <BottomNavigation />
    </>
  );
};

export default Dashboard;
