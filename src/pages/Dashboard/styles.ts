import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomIcon from '../../utils/CustomIcons/CustomIcon';

const { height, width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #f9f5f0;
`;

export const ContainerData = styled.View`
  width: 85%;

  justify-content: flex-end;

  margin-left: 2.1%;
`;

export const AddOrderContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  border-bottom-width: 1px;
  border-color: #d0c5b5;

  padding-bottom: 18px;
  padding-top: 18px;
`;

export const AddOrderTitle = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: #58769e;

  margin-right: auto;
`;

export const AddOrderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;

  border-radius: 20px;
  background: green;
  elevation: 3;

  align-items: center;
  justify-content: center;

  margin-right: 3%;
`;

export const AddOrderIcon = styled(FontAwesomeIcon)``;

export const StageTitle = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  color: #58769e;
  text-align: left;

  margin-right: auto;
  margin-top: 6%;
  margin-bottom: 3%;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-self: center;
  margin-top: 10px;
`;

export const ContainerButton = styled.TouchableOpacity`
  background: #f9f5f0;
  elevation: 3;
  width: ${width * 0.415}px;
  height: ${height * 0.1}px;

  border-radius: 10px;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
`;

export const IconCustom = styled(CustomIcon)``;

export const IconText = styled.Text`
  font-family: 'OpenSans-SemiBold';
  font-size: 16px;
  color: #58769e;
  text-align: center;
`;
