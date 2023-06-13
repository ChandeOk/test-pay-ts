import React from 'react';
import { HeaderStyled, Logo } from '@/components/HeaderStyled';
type Props = {};

export default function Header({}: Props) {
  return (
    <HeaderStyled>
      <Logo src={'/logo.svg'} alt='logo' />
    </HeaderStyled>
  );
}
