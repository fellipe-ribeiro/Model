import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Input from '../../components/Input';

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

interface LoginFormData {
  email: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { signIn, signOut, user } = useAuth();

  const handleLogin = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque suas credenciais.',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <ContainerData>
            <AddOrderContainer>
              <AddOrderTitle>Adicionar um novo pedido:</AddOrderTitle>
              <AddOrderButton onPress={() => {}}>
                <AddOrderIcon name="plus" size={26} color="#ffffff" />
              </AddOrderButton>
            </AddOrderContainer>
            <StageTitle>Listagem dos setores:</StageTitle>
            <ContainerButtons>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Modelagem',
                  });
                }}
              >
                <IconCustom name="modelagem" size={36} color="#58769e" />
                <IconText>Modelagem</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Corte',
                  });
                }}
              >
                <IconCustom name="corte" size={36} color="#58769e" />
                <IconText>Corte</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Preparação',
                  });
                }}
              >
                <IconCustom name="preparacao" size={36} color="#58769e" />
                <IconText>Preparação</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Costura',
                  });
                }}
              >
                <IconCustom name="costura" size={36} color="#58769e" />
                <IconText>Costura</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Acabamento',
                  });
                }}
              >
                <IconCustom name="acabamento" size={36} color="#58769e" />
                <IconText>Acabamento</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Pronto',
                  });
                }}
              >
                <IconCustom name="pronto" size={36} color="#58769e" />
                <IconText>Pronto</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Entregue',
                  });
                }}
              >
                <IconCustom name="entregue" size={36} color="#58769e" />
                <IconText>Entregue</IconText>
              </ContainerButton>
              <ContainerButton
                onPress={() => {
                  navigation.navigate('List', {
                    titleName: 'Todos',
                  });
                }}
              >
                <IconCustom name="todos" size={36} color="#58769e" />
                <IconText>Todos</IconText>
              </ContainerButton>
            </ContainerButtons>
          </ContainerData>
        </Container>
      </ScrollView>

      <BottomNavigation />
    </>
  );
};

export default Dashboard;
