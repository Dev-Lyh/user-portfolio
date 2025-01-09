import React from 'react'

import styles from './textarea.module.css';

interface TextareaProps {
  placeholder: string;
  inputValue: string;

  onChangeValue(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export default function Textarea({placeholder, onChangeValue, inputValue}: TextareaProps) {

  return (
    <>
      <textarea className={styles.input} placeholder={placeholder} onChange={onChangeValue}
                value={inputValue}></textarea>
    </>
  )
}