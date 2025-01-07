import React, {useState} from 'react'
import Link from 'next/link';
import {handleInputChange} from "@/utils/handleInputChange";

import LogoIcon from "@/assets/LogoIcon";

import TitleSubtitle from "@/components/TitleSubtitle";
import Input from "@/components/Input";
import Aside from '@/components/Aside'

import styles from '../index.module.css'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')

  return (
    <section className={styles.sign_container}>
      <Aside/>
      <div className={styles.form_container}>
        <form>
          <LogoIcon/>
          <TitleSubtitle title={'Forgot password'} subtitle={'We’ll email you instructions to reset your password'}/>
          <Input type="email" placeholder='Enter email' onChangeValue={handleInputChange(setEmail)} mode={'NORMAL'}
                 inputValue={email}/>
          <button
            className={'purple_button'}>
            Send mail
          </button>
          <Link href={'/'} className={styles.link_forgot_password}>
            Back to Login</Link>
        </form>
      </div>
    </section>
  );
}