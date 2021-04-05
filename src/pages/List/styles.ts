import styled, { css } from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Order } from './index';

interface SortTextColor {
  selected: boolean;
}

const { height } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  background: #f9f5f0;
`;

export const SortContainer = styled.View`
  flex-direction: row;
  margin-left: 10%;
  margin-right: 10%;

  margin-top: 5%;
  margin-bottom: 5%;

  align-items: center;
`;

export const SortTitle = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 18px;
  color: #4f4841;
  text-align: left;
  padding-left: 2%;
`;

export const SortButtonClient = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const SortButtonDepartureDate = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const SortIcon = styled(FontAwesomeIcon)``;

export const SortText = styled.Text<SortTextColor>`
  font-family: 'OpenSans-Regular';
  font-size: 9px;
  color: #4f4841;
  text-align: left;

  ${props =>
    props.selected &&
    css`
      color: #58769e;
    `}
`;

export const OrdersList = styled(FlatList as new () => FlatList<Order>)`
  width: 100%;
`;

export const ContainerData = styled.View`
  width: 90%;
  padding-left: 10%;
  align-items: center;
`;

export const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${height * 0.175}px;

  elevation: 0.8;
  border-radius: 16px;
  background: #ffffff;

  margin-bottom: 10px;
`;

export const InfoContainerAll = styled.View`
  margin-left: 5%;
  margin-top: 5%;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const InfoText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 14px;
  color: #4f4841;
  text-align: left;
`;

export const InfoContent = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  color: #4f4841;
  text-align: left;
`;

export const InfoDivisor = styled.View`
  background: #746b62;
  width: 95%;
  height: 1px;

  margin-top: 4px;
  margin-bottom: 4px;
`;
