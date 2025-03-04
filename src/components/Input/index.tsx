import React, {useEffect} from 'react'

import CheckWhiteIcon from "@/assets/CheckWhiteIcon";
import CheckPurpleIcon from "@/assets/CheckPurpleIcon";

import styles from './input.module.css';

interface InputProps {
  type: string;
  placeholder: string;
  mode: 'NORMAL' | 'CREATE';
  inputValue: string;
  disabled?: boolean;

  handleIsDisabled?: () => void;

  onChangeValue(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Input({
                                type,
                                placeholder,
                                mode,
                                inputValue,
                                onChangeValue,
                                handleIsDisabled,
                                disabled
                              }: InputProps) {
  function hasLowercase(str: string): boolean {
    return /[a-z]/.test(str);
  }

  function hasUppercase(str: string): boolean {
    return /[A-Z]/.test(str);
  }

  function hasNumber(str: string): boolean {
    return /\d/.test(str);
  }

  function hasSpecialCharacter(str: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
  }

  function hasMinimumLength(str: string, minLength: number = 8): boolean {
    return str.length >= minLength;
  }

  useEffect(() => {
    if (type === 'password' && placeholder.includes('Enter a new password')) {
      if (
        hasLowercase(inputValue) &&
        hasSpecialCharacter(inputValue) &&
        hasUppercase(inputValue) &&
        hasMinimumLength(inputValue) &&
        hasNumber(inputValue)
      ) {
        handleIsDisabled?.();
      }
    }
  }, [type, placeholder, inputValue, handleIsDisabled]);

  return (
    <>
      <input className={styles.input} type={type} placeholder={placeholder} onChange={onChangeValue}
             style={{marginTop: placeholder.includes('Enter a new password') ? '2.6rem' : 0}}
             value={inputValue} disabled={disabled}/>
      {
        mode === 'CREATE' &&
        type === 'password' &&
        <div className={styles.container_requisites_password}>
          <div>
            {hasLowercase(inputValue) ? <CheckPurpleIcon/> : <CheckWhiteIcon/>}
            <p>one lower case character</p>
          </div>
          <div>
            {hasSpecialCharacter(inputValue) ? <CheckPurpleIcon/> : <CheckWhiteIcon/>}
            <p>one special character</p>
          </div>
          <div>
            {hasUppercase(inputValue) ? <CheckPurpleIcon/> : <CheckWhiteIcon/>}
            <p>one uppercase character</p>
          </div>
          <div>
            {hasMinimumLength(inputValue) ? <CheckPurpleIcon/> : <CheckWhiteIcon/>}
            <p>8 character minium</p>
          </div>
          <div>
            {hasNumber(inputValue) ? <CheckPurpleIcon/> : <CheckWhiteIcon/>}
            <p>one number</p>
          </div>
        </div>
      }
    </>
  )
}