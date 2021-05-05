/* eslint-disable no-shadow */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useField } from '@unform/core';

import {
  TextInputMaskProps,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';

import { Container, TextInputMaskedDate } from './styles';

interface InputProps extends TextInputMaskProps {
  name: string;
  type: TextInputMaskTypeProp;
  options: TextInputMaskOptionProp;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputMaskAddOrder: React.ForwardRefRenderFunction<
  InputRef,
  InputProps
> = ({ name, refInput, type, options, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);

  const [data, setData] = useState('');

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <TextInputMaskedDate
        type={type}
        options={options}
        keyboardType="numeric"
        autoCorrect={false}
        refInput={refInput}
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#9c948d"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={data}
        onChangeText={value => {
          inputValueRef.current.value = value;
          setData(value);
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(InputMaskAddOrder);
