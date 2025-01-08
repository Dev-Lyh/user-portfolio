import React from 'react'

import styles from './textarea.module.css';

interface TextareaProps {
  placeholder: string;

  onChangeValue(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export default function Textarea({placeholder, onChangeValue}: TextareaProps) {

  return (
    <>
      <textarea className={styles.input} placeholder={placeholder} onChange={onChangeValue}></textarea>
    </>
  )
}