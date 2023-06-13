'use client';

type Props = {};
import Container from '@/components/Container';
import Flex from '@/components/Flex';
import PaymentForm from '../PaymentForm';
import { useEffect, useState } from 'react';
import testApiCall from '@/lib/helper';
export default function page({}: Props) {
  const [operator, setOperator] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputAmount, setInputAmount] = useState(1);
  const [formData, setFormData] = useState({});

  console.log(operator);
  useEffect(() => {
    setOperator(sessionStorage.getItem('operator') || '');
  }, []);

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
          operator={operator}
          inputPhoneNumber={inputPhoneNumber}
          setInputPhoneNumber={setInputPhoneNumber}
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
        />
      </Flex>
    </Container>
  );
}
