import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #f9f5f0;
`;

export const ContainerData = styled.View`
  width: 85%;

  justify-content: flex-end;
`;

export const TitleText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 18px;
  color: #4f4841;
  text-align: left;

  margin-top: 5%;
  margin-bottom: 5%;
`;

export const OrderContainer = styled.View`
  background: #58769e;
  elevation: 8;
  border-radius: 30px;
  width: 100%;
  height: ${height * 0.465}px;
  padding: 16px;
`;

export const OrderContainerInfo = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const OrderText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 15px;
  color: #ffffff;
  text-align: left;
`;

export const OrderTextContent = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 15px;
  color: #ffffff;
  text-align: left;
`;

export const OrderDivisor = styled.View`
  background: #ffffff;
  width: 100%;
  height: 2px;

  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;

  width: 85%;

  align-items: center;

  margin-top: 16px;
  margin-bottom: 16px;
`;

export const ButtonDeleteOrder = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin-right: auto;
`;

export const ButtonChangeOrder = styled.TouchableOpacity`
  justify-content: center;
  margin-left: ${width * 0.24}px;
  margin-right: auto;
`;

export const ButtonMoveOrder = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const Icon = styled(FontAwesomeIcon)``;

export const IconText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 13px;
  color: #4f4841;
  text-align: left;
`;
