/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { parseISO, isBefore, isAfter } from 'date-fns';

import Picker from 'react-native-picker-select';

import { MaskService } from 'react-native-masked-text';

import * as Yup from 'yup';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import InputAddOrder from './InputAddOrder';
import InputMaskAddOrder from './InputMaskAddOrder';
import Button from '../../components/Button';
import Divisor from '../../components/Divisor';
import ModalAddOrder from './Modal';

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
  sectorDate: string;
  sectorDateFormated: string;
  entryDate: string;
  entryDateFormated: string;
  departureDate: string;
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

interface DataOrder {
  client: any;
  modelName: any;
  type: any;
  entryDate: any;
  departureDate: any;
  numberOfPieces: any;
  sector: any;
  rawMaterial: any;
  modelingTime?: any;
  cuttingTime?: any;
  setupTime?: any;
  sewingTime?: any;
  finishingTime?: any;
  readyDate?: any;
  deliveredDate?: any;
}

const AddOrder: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const [typeValue, setTypeValue] = useState('Produção');
  const [sectorValue, setSectorValue] = useState('Modelagem');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maskedInputRef = useRef<any>({});

  const modelInputRef = useRef<TextInput>(null);
  const rawMaterialInputRef = useRef<TextInput>(null);

  const handlePostAddOrder = useCallback(
    async (
      client,
      modelName,
      type,
      entryDate,
      departureDate,
      numberOfPieces,
      sector,
      sectorDate,
      rawMaterial,
    ) => {
      let modelingTime = null;
      let cuttingTime = null;
      let setupTime = null;
      let sewingTime = null;
      let finishingTime = null;
      let readyDate = null;
      let deliveredDate = null;

      switch (sector) {
        case 'Modelagem':
          modelingTime = sectorDate;
          // dataOrder = Object.assign(modelingTime);
          break;
        case 'Corte':
          cuttingTime = sectorDate;
          // dataOrder = Object.assign(cuttingTime);
          break;
        case 'Preparação':
          setupTime = sectorDate;
          // dataOrder = Object.assign(setupTime);
          break;
        case 'Costura':
          sewingTime = sectorDate;
          // dataOrder = Object.assign(sewingTime);
          break;
        case 'Acabamento':
          finishingTime = sectorDate;
          // dataOrder = Object.assign(finishingTime);
          break;
        case 'Pronto':
          readyDate = sectorDate;
          // dataOrder = Object.assign(readyDate);
          break;
        case 'Entregue':
          deliveredDate = sectorDate;
          // dataOrder = Object.assign(deliveredDate);
          break;
        default:
          break;
      }
      const dataOrder = {
        client,
        modelName,
        type,
        entryDate,
        departureDate,
        numberOfPieces,
        sector,
        rawMaterial,
        modelingTime,
        cuttingTime,
        setupTime,
        sewingTime,
        finishingTime,
        readyDate,
        deliveredDate,
      };
      await api.post('/orders', dataOrder).then(
        response => {
          console.log(response.data);
          setShowModal(true);
        },
        error => {
          console.log(error.response.data);
          Alert.alert(
            'Erro na adição de pedido',
            'Ocorreu um erro ao realizar a adição do pedido, cheque as informações.',
          );
        },
      );
    },
    [],
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const reciveRef = useCallback((name: string, ref: any) => {
    const data = { ...maskedInputRef.current, [name]: ref };
    maskedInputRef.current = data;
  }, []);

  const FormatStringData = useCallback(data => {
    const dia = data.split('/')[0];
    const mes = data.split('/')[1];
    const ano = data.split('/')[2];

    return `${ano}-${`0${mes}`.slice(-2)}-${`0${dia}`.slice(-2)}`;
  }, []);

  const handleAddOrder = useCallback(
    async (data: Order): Promise<void | {}> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          client: Yup.string().required('Cliente obrigatório'),
          modelName: Yup.string().required('Nome do modelo obrigatório'),
          entryDate: Yup.string().required('Data de entrada obrigatória'),
          departureDate: Yup.string().required('Data de saída obrigatória'),
          rawMaterial: Yup.string().required('Material é obrigatório'),
          numberOfPieces: Yup.number().required(
            'Número de peças é obrigatório',
          ),
          sectorDate: Yup.string().required('Data do setor obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (
          !MaskService.isValid('datetime', data.entryDate, {
            format: 'DD/MM/YYYY',
          })
        ) {
          return Alert.alert('Data de entrada inválida');
        }

        if (
          !MaskService.isValid('datetime', data.departureDate, {
            format: 'DD/MM/YYYY',
          })
        ) {
          return Alert.alert('Data de saida inválida');
        }

        if (
          !MaskService.isValid('datetime', data.sectorDate, {
            format: 'DD/MM/YYYY',
          })
        ) {
          return Alert.alert('Data de saida do setor inválida');
        }

        const entryDateFormated = FormatStringData(data.entryDate);
        const departureDateFormated = FormatStringData(data.departureDate);
        const sectorDateFormated = FormatStringData(data.sectorDate);

        const parsedEntryDate = parseISO(entryDateFormated);
        const parsedDepartureDate = parseISO(departureDateFormated);
        const parsedSectorDate = parseISO(sectorDateFormated);

        const past = isAfter(parsedEntryDate, parsedDepartureDate);
        const sectorPast = isAfter(parsedSectorDate, parsedDepartureDate);
        const sectorBefore = isBefore(parsedSectorDate, parsedEntryDate);

        if (past) {
          return Alert.alert('Data de entrada maior que a data de saída');
        }

        if (sectorPast) {
          return Alert.alert(
            'Data de entrada do setor maior que a data de saída',
          );
        }

        if (sectorBefore) {
          return Alert.alert(
            'Data de saída do setor menor que a data de entrada',
          );
        }

        Alert.alert(
          'Confirmar Pedido?',
          `Cliente: ${data.client}\nModelo: ${data.modelName}\nData de entrada: ${data.entryDate}\nData de saída: ${data.departureDate}\nMaterial: ${data.rawMaterial}\nNúmero de  peças: ${data.numberOfPieces}\nTipo: ${typeValue}\nSetor: ${sectorValue}\nData  de saída  do Sertor: ${data.sectorDate}`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Confirmar',
              onPress: () =>
                handlePostAddOrder(
                  data.client,
                  data.modelName,
                  typeValue,
                  entryDateFormated,
                  departureDateFormated,
                  data.numberOfPieces,
                  sectorValue,
                  sectorDateFormated,
                  data.rawMaterial,
                ),
              style: 'default',
            },
          ],
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return {};
        }

        Alert.alert(
          'Erro na adição de pedido',
          'Ocorreu um erro ao realizar a adição do pedido, cheque as informações.',
        );
      }
      return {};
    },
    [FormatStringData, handlePostAddOrder, sectorValue, typeValue],
  );

  const toggleModal = useCallback(() => {
    setShowModal(value => !showModal);
  }, [showModal]);

  return (
    <>
      <ModalAddOrder visible={showModal} onDismiss={toggleModal} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Header />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <ContainerData>
              <TitleText>Adicione um pedido:</TitleText>
              <Form ref={formRef} onSubmit={handleAddOrder}>
                <Label>Cliente: </Label>
                <InputAddOrder
                  name="client"
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder="Digite o nome do cliente"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    modelInputRef.current?.focus();
                  }}
                />
                <Label>Modelo: </Label>
                <InputAddOrder
                  ref={modelInputRef}
                  name="modelName"
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder="Digite o nome do cliente"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    maskedInputRef.current.entryDate.focus();
                  }}
                />
                <Label>Data de entrada: </Label>
                <InputMaskAddOrder
                  type="datetime"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  refInput={ref => reciveRef('entryDate', ref)}
                  name="entryDate"
                  placeholder="Digite a data de entrada"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    maskedInputRef.current.departureDate.focus();
                  }}
                />
                <Label>Data de saída: </Label>
                <InputMaskAddOrder
                  type="datetime"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  refInput={ref => reciveRef('departureDate', ref)}
                  name="departureDate"
                  placeholder="Digite a data de saída"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    rawMaterialInputRef.current?.focus();
                  }}
                />
                <Label>Material: </Label>
                <InputAddOrder
                  ref={rawMaterialInputRef}
                  name="rawMaterial"
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder="Digite o material utilizado"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    maskedInputRef.current.numberOfPieces.focus();
                  }}
                />
                <Label>Número de peças: </Label>
                <InputMaskAddOrder
                  refInput={ref => reciveRef('numberOfPieces', ref)}
                  type="only-numbers"
                  options={{}}
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
                      setTypeValue(value);
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
                      setSectorValue(value);
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
                  type="datetime"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  name="sectorDate"
                  placeholder="Digite a data de saída do setor"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
                <Divisor space={0.02} />
                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Criar pedido
                </Button>
                <Divisor space={0.03} />
              </Form>
            </ContainerData>
          </Container>
        </ScrollView>
        {!keyboardVisible && <BottomNavigation />}
      </KeyboardAvoidingView>
    </>
  );
};

export default AddOrder;
