import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

const { height, width } = Dimensions.get('screen');

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${height * 0.06}px;
  background: #e3dfd9;
  border-radius: 20px;
  border-width: 2px;
  border-color: #e3dfd9;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #58769e;
    `}
`;

export const TextInputMaskedDate = styled(TextInputMask)`
  flex: 1;
  color: black;
  font-size: 14px;
  font-family: 'OpenSans-Regular';

  padding-left: ${width * 0.04}px;
`;
