import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

export const Modal = styled.Modal`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${height}px;
  background-color: gray;
`;

export const ContainerMessage = styled.View`
  align-items: center;
  position: absolute;
  height: ${height * 0.24}px;
  width: ${width * 0.62}px;
  background: green;
  elevation: 3;

  border: 2px;
  border-color: green;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const TextMessage = styled.Text`
  color: white;
  font-size: 21px;
  font-family: 'OpenSans-Bold';
  text-align: center;

  margin-bottom: 5%;
`;

export const Icon = styled(FontAwesomeIcon)``;
