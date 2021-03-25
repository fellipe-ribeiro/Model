import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

import {
  Container,
  ContainerData,
  StageTitle,
  ContainerButtons,
  ContainerButton,
  IconCustom,
  IconText,
  AddOrderContainer,
  AddOrderTitle,
  AddOrderButton,
  AddOrderIcon,
} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <ContainerData />
        </Container>
      </ScrollView>

      <BottomNavigation />
    </>
  );
};

export default Dashboard;
