import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background: #58769e;
  border-radius: 30px;

  justify-content: center;
  align-items: center;

  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  color: #ded7cd;
  font-size: 18px;
`;
