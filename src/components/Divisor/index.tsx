import React from 'react';

import { DivisorSpace } from './styles';

interface DivisorProps {
  space: number;
}

const Divisor: React.FC<DivisorProps> = ({ space }) => {
  return <DivisorSpace space={space} />;
};

export default Divisor;
