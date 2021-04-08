import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

interface DivisorProps {
  space: number;
}

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

export const Label = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: #4f4841;
  text-align: left;

  margin-top: 1%;
  margin-bottom: 1%;
  margin-right: auto;
`;

export const PickerContainer = styled.View`
  width: 100%;
  height: ${height * 0.06}px;
  background: #e3dfd9;
  border-radius: 20px;
  border-width: 2px;
  border-color: #e3dfd9;

  justify-content: center;
`;
