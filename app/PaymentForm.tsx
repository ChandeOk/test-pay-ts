import React, { useEffect, useState } from 'react';
import {
  PaymentFormStyled,
  PaymentFormLogo,
  FromStyled,
  InputPhoneStyled,
  InputAmountStyled,
  FormPayButton,
} from '../components/PaymentFormStyled';
import { NumericFormat, PatternFormat } from 'react-number-format';
import Flex from '../components/Flex';
import { useRouter } from 'next/navigation';
type Props = {
  inputPhoneNumber: string;
  setInputPhoneNumber: (phone: string) => void;
  inputAmount: number;
  setInputAmount: (amount: number) => void;
  operator: string | null;
  setData: (req: {}) => void;
  testApiCall: (req: Req) => Promise<{ ok: boolean; amount: number; phone: string }>;
};

function PaymentForm({
  inputPhoneNumber,
  setInputPhoneNumber,
  inputAmount,
  setInputAmount,
  operator,
  setData,
  testApiCall,
}: Props) {
  const [isValid, setIsValid] = useState(false);
  const [success, setSuccess] = useState(true);
  const router = useRouter();

  const imgUrl = `./${operator}.svg`;

  useEffect(() => {
    const validPhoneLength = 10;
    const ValidAmount = inputAmount >= 1 && inputAmount <= 1000;
    if (ValidAmount && inputPhoneNumber.length === validPhoneLength) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputPhoneNumber, inputAmount]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const data = { amount: inputAmount, phone: inputPhoneNumber };
      const req = { method: 'POST', body: data };

      const res = await testApiCall(req);
      setData({ ...req, ok: res.ok });
      if (!res.ok) {
        throw new Error('NOPE');
      }
      setSuccess(true);
      // router.push('/test-pay-ts');
      location.href = 'https://chandeok.github.io/test-pay-ts';
    } catch (e) {
      console.log(e);
      setSuccess(false);
    }
  };

  return (
    <PaymentFormStyled onSubmit={handleSubmit}>
      {/* <PaymentFormExit onClick={reset}>X</PaymentFormExit> */}
      <PaymentFormLogo src={imgUrl} alt='logo' />
      <FromStyled>
        <PatternFormat
          format='+7 (###) ### ####'
          customInput={InputPhoneStyled}
          allowEmptyFormatting
          mask='_'
          value={inputPhoneNumber}
          onValueChange={(values) => {
            setInputPhoneNumber(values.value);
          }}
          name='phone'
        />
        <NumericFormat
          value={inputAmount}
          suffix={'₽'}
          customInput={InputAmountStyled}
          isAllowed={(values) => {
            if (values.floatValue) {
              return values.floatValue >= 1 && values.floatValue <= 1000;
            }
            return false;
          }}
          onValueChange={(values) => {
            if (values.floatValue) setInputAmount(values.floatValue);
          }}
          name='amount'
        />
        {isValid ? (
          <FormPayButton type='submit'>Оплатить</FormPayButton>
        ) : (
          <Flex>
            <h3
              style={{
                maxWidth: '80%',
                fontSize: '1rem',
                fontWeight: '400',
                padding: '2rem',
                color: 'darkred',
              }}
            >
              Введите номер телефона и сумму(от 1р. до 1000р)
            </h3>
          </Flex>
        )}
        {!success && <p>Что-то не так, попробуйте снова</p>}
      </FromStyled>
    </PaymentFormStyled>
  );
}

export default PaymentForm;
