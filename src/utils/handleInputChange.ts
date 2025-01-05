/**
 * Função para lidar com mudanças em um input e atualizar o estado associado.
 * @param setter - Função de atualização do estado (React.Dispatch)
 * @returns Função que recebe o evento de mudança e atualiza o estado com o valor do input.
 */

import React from 'react';

export function handleInputChange(setter: React.Dispatch<React.SetStateAction<string>>) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value || '');
  };
}