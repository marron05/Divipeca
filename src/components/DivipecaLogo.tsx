import React from 'react';
import { IMAGES } from '../data/divipecaData';

interface DivipecaLogoProps {
  className?: string;
}

export const DivipecaLogo: React.FC<DivipecaLogoProps> = ({
  className = 'h-12 w-auto',
}) => {
  return (
    <img
      src={IMAGES.logoPlaque}
      alt="Logo oficial DIVIPECA — Desde 1990 · Rif: J-060038278"
      className={`object-contain select-none block ${className}`}
    />
  );
};
