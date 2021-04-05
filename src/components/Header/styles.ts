import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { height, width } = Dimensions.get('screen');

export const HeaderContainer = styled.View`
  height: 90px;
  background: #ded7cd;
  justify-content: center;

  padding-bottom: 12px;
  padding-top: 12px;
`;

export const HeaderContainerData = styled.View`
  width: 85%;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  align-self: center;
`;

export const HeaderContainerCanGoBack = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const IconSingoutContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const IconSingout = styled(FeatherIcon)``;

export const HeaderDescription = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 20px;
  color: #4f4841;
  text-align: center;
  align-self: center;

  margin-left: auto;
  margin-right: auto;
`;

export const HeaderTitleContainer = styled.View`
  align-self: center;

  margin-right: auto;
  margin-top: 2%;
`;

export const HeaderTitleGreeting = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 18px;
  color: #4f4841;
  text-align: left;
`;

export const HeaderTitleUser = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 18px;
  color: #58769e;
  text-align: center;
  align-self: center;
`;

export const AvatarContainer = styled.View``;

export const AvatarImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
`;
