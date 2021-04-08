import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

interface DivisorProps {
  space: number;
}

const { height } = Dimensions.get('screen');

export const DivisorSpace = styled.View<DivisorProps>`
  ${props =>
    props.space &&
    css`
      height: ${height * props.space}px;
    `}
`;
