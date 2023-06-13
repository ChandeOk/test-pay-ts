'use client';

type Props = {};
import Container from '@/components/Container';
import Flex from '@/components/Flex';
import PaymentForm from '../PaymentForm';
import { useEffect, useState } from 'react';
import testApiCall from '@/lib/helper';
export default function page({}: Props) {
  const operator = useState(() => sessionStorage.getItem('operator'));
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputAmount, setInputAmount] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (formData) {
      sessionStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);
  return (
    <Container>
      <Flex>
        <PaymentForm
          testApiCall={testApiCall}
          setData={setFormData}
          operator={operator[0]}
          inputPhoneNumber={inputPhoneNumber}
          setInputPhoneNumber={setInputPhoneNumber}
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
        />
      </Flex>
    </Container>
  );
}
