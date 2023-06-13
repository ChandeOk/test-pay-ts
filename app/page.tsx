'use client';
import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Flex from '@/components/Flex';
import data from '../lib/data';
import Card from './Card';
import Success from '@/components/SuccessStyled';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [operator, setOperator] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<{
    method: string;
    body: { amount: number; phone: string };
    ok: boolean;
  }>({ method: 'fail', body: { amount: 0, phone: 'fail' }, ok: false });
  const router = useRouter();

  useEffect(() => {
    setFormData(
      JSON.parse(
        sessionStorage.getItem('formData') ||
          '{ "method": "fail", "body": { "amount": 0, "phone": "fail" }, "ok": false }'
      )
    );
  }, []);

  useEffect(() => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      sessionStorage.setItem('formData', '');
      setFormData(
        JSON.parse(
          sessionStorage.getItem('formData') ||
            '{ "method": "fail", "body": { "amount": 0, "phone": "fail" }, "ok": false }'
        )
      );
    }, 3000);
  }, [showForm]);

  const [animationStart, setAnimationStart] = useState(false);
  const delay = () => {
    setTimeout(() => {
      setShowMenu(false);
      setAnimationStart(false);
      setShowForm(true);
    }, 1000);
  };
  const handleCardClick = (item: Data) => {
    setOperator(item.name);
    sessionStorage.setItem('operator', item.name);
    setAnimationStart(true);
    delay();
    router.push('/paymentForm');
  };

  return (
    <>
      {showMenu && (
        <Container animationStart={animationStart}>
          <Flex>
            {data.map((item, i) => (
              <Card key={i} item={item} handleCardClick={handleCardClick} />
            ))}
          </Flex>
        </Container>
      )}
      {formData.ok && showSuccess && (
        <Success>
          <p>Успешно!</p>
          <p>Сумма: {formData.body.amount}</p>
          <p>Номер: {formData.body.phone}</p>
        </Success>
      )}
    </>
  );
}
