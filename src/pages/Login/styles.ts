import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerData = styled.View`
  width: 85%;
  align-items: center;
  justify-content: flex-end;
`;

export const ContainerLogo = styled.View`
  align-items: center;
`;

export const ImgLogo = styled.ImageBackground.attrs({
  source: require('../../assets/Model-logos_transparent.png'),
})`
  width: ${width * 1.1}px;
  height: ${height * 0.32}px;
`;

export const LoginText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 24px;
  color: #58769e;
  text-align: center;
  margin-bottom: 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 18px;
`;

export const ForgotPasswordText = styled.Text`
  color: #4f4841;
  font-size: 16px;
  font-family: 'OpenSans-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  left: 0;
  bottom: 0;
  right: 0;

  border-top-width: 1px;
  border-color: #d0c5b5;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #58769e;
  font-size: 18px;
  font-family: 'OpenSans-Regular';
  margin-left: 16px;
`;
