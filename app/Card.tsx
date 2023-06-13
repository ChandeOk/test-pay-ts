'use client';
import React, { useState } from 'react';
import { CardImageStyled, CardStyled } from '../components/CardStyled';
type Props = {
  item: Data;
  handleCardClick: (item: Data) => void;
};

function Card({ item, handleCardClick }: Props) {
  const imgUrl = `/out/${item.name}.svg`;
  return (
    <CardStyled item={item} onClick={() => handleCardClick(item)}>
      <CardImageStyled src={imgUrl} />
    </CardStyled>
  );
}

export default Card;
