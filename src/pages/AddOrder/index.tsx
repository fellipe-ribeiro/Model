import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { format } from 'date-fns';

import Picker from 'react-native-picker-select';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import InputAddOrder from './InputAddOrder';
import InputMaskAddOrder from './InputMaskAddOrder';
import Button from '../../components/Button';
import Divisor from '../../components/Divisor';

import {
  Container,
  ContainerData,
  TitleText,
  Label,
  PickerContainer,
} from './styles';
import api from '../../services/api';

interface RouteParams {
  orderID: string;
}

export interface Order {
  id: string;
  user_id: string;
  client: string;
  modelName: string;
  type: string;
  entryDate: string;
  entryDateFormated: string;
  departureDate: Date;
  departureDateFormated: string;
  modelingTime: Date;
  modelingTimeFormated: string;
  cuttingTime: Date;
  cuttingTimeFormated: string;
  setupTime: Date;
  setupTimeFormated: string;
  sewingTime: Date;
  sewingTimeFormated: string;
  finishingTime: Date;
  finishingTimeFormated: string;
  readyDate: Date;
  readyDateFormated: string;
  deliveredDate: Date;
  deliveredDateFormated: string;
  numberOfPieces: number;
  sector: string;
  rawMaterial: string;
  changed: string;
}

const AddOrder: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [valueType, setValueType] = useState('');

  return (
    <>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <ContainerData>
            <TitleText>Adicione um pedido:</TitleText>
            <Form onSubmit={() => {}}>
              <Label>Cliente: </Label>
              <InputAddOrder
                name="client"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Digite o nome do cliente"
                returnKeyType="next"
              />
              <Label>Modelo: </Label>
              <InputAddOrder
                name="modelName"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Digite o nome do cliente"
                returnKeyType="next"
              />
              <Label>Data de entrada: </Label>
              <InputMaskAddOrder
                name="entryDate"
                placeholder="Digite a data de entrada"
                returnKeyType="next"
              />
              <Label>Data de saída: </Label>
              <InputMaskAddOrder
                name="departureDate"
                placeholder="Digite a data de saída"
                returnKeyType="next"
              />
              <Label>Material: </Label>
              <InputAddOrder
                name="rawMaterial"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Digite o material utilizado"
                returnKeyType="next"
              />
              <Label>Digite o número de peças: </Label>
              <InputAddOrder
                name="numberOfPieces"
                autoCorrect={false}
                keyboardType="numeric"
                placeholder="Digite o número de peças"
                returnKeyType="next"
              />
              <Label>Tipo: </Label>
              <PickerContainer>
                <Picker
                  placeholder={{}}
                  onValueChange={value => {
                    setValueType(value);
                  }}
                  items={[
                    { label: 'Produção', value: 'Produção' },
                    { label: 'Desenvolvimento', value: 'Desenvolvimento' },
                  ]}
                />
              </PickerContainer>
              <Label>Setor: </Label>
              <PickerContainer>
                <Picker
                  placeholder={{}}
                  onValueChange={value => {
                    setValueType(value);
                  }}
                  items={[
                    { label: 'Modelagem', value: 'Modelagem' },
                    { label: 'Corte', value: 'Corte' },
                    { label: 'Preparação', value: 'Preparação' },
                    { label: 'Costura', value: 'Costura' },
                    { label: 'Acabamento', value: 'Acabamento' },
                    { label: 'Pronto', value: 'Pronto' },
                    { label: 'Entregue', value: 'Entregue' },
                  ]}
                />
              </PickerContainer>
              <Label>Data de saída do setor: </Label>
              <InputMaskAddOrder
                name="sectorDate"
                placeholder="Digite a data de saída do setor"
                returnKeyType="send"
              />
              <Divisor space={0.02} />
              <Button>Criar pedido</Button>
              <Divisor space={0.03} />
            </Form>
          </ContainerData>
        </Container>
      </ScrollView>

      <BottomNavigation />
    </>
  );
};

export default AddOrder;
