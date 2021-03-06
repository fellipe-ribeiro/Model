import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: #e3dfd9;
  border-radius: 30px;
  margin-bottom: 8px;
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

export const TextInput = styled.TextInput`
  flex: 1;
  color: black;
  font-size: 16px;
  font-family: 'OpenSans-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 12px;
  margin-left: 18px;
`;

export const EyeIconcontainer = styled.TouchableOpacity`
  margin-right: 5px;
`;
