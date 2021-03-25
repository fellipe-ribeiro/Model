import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface TextIconColor {
  selected: boolean;
}

export const BottomContainer = styled.View`
  width: 100%;

  height: 90px;
  background: #ded7cd;
`;

export const BottomContainerData = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 4%;
`;

export const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin-left: 9.7%;
`;

export const IconHome = styled(FontAwesomeIcon)``;

export const IconHomeText = styled.Text<TextIconColor>`
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  color: #746b62;
  text-align: center;
  align-self: center;

  ${props =>
    props.selected &&
    css`
      color: #58769e;
    `}
`;

export const IconProfile = styled(FontAwesomeIcon)``;

export const IconProfileText = styled.Text<TextIconColor>`
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  color: #746b62;
  text-align: center;
  align-self: center;

  ${props =>
    props.selected &&
    css`
      color: #58769e;
    `}
`;

export const IconNotification = styled(FontAwesomeIcon)``;

export const IconNotificationContainer = styled.TouchableOpacity`
  position: absolute;

  top: -3%;
  left: 55%;
`;

export const NotificationAlertContainer = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: red;

  align-items: center;
  justify-content: center;
`;

export const NotificationAlertText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 10px;
  color: #ffffff;
  text-align: center;
  align-self: center;
`;

export const IconNotificationText = styled.Text<TextIconColor>`
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  color: #746b62;
  text-align: center;
  align-self: center;

  ${props =>
    props.selected &&
    css`
      color: #58769e;
    `}
`;

export const IconSingOut = styled(FontAwesomeIcon)``;

export const IconSingOutText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  color: #746b62;
  text-align: center;
  align-self: center;
`;
