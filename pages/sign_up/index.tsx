import React, {useState} from 'react';
import Link from 'next/link';
import {sendEmailVerification} from 'firebase/auth';
import {handleCreateUserWithEmailAndPassword} from '@/utils/handleCreateUserWithEmailAndPassword'
import {handleInputChange} from "@/utils/handleInputChange";

import LogoIcon from "@/assets/LogoIcon";

import TitleSubtitle from "@/components/TitleSubtitle";
import GithubButton from "@/components/GithubButton";
import Input from "@/components/Input";
import Separator from "@/components/Separator";
import Aside from '@/components/Aside';

import styles from '../index.module.css';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  function handleIsDisabled() {
    setIsDisabled(false)
  }

  return (
    <section className={styles.sign_container}>
      <Aside/>
      <div className={styles.form_container}>
        <form>
          <LogoIcon/>
          <TitleSubtitle title={'Create your account'} subtitle={'Enter the fields below to get started'}/>
          <GithubButton mode={'SIGNUP'}/>
          <Separator/>
          <Input type="email" placeholder='Enter email' onChangeValue={handleInputChange(setEmail)} mode={'NORMAL'}
                 inputValue={email}/>
          <Input type="password" placeholder='Enter a new password' onChangeValue={handleInputChange(setPassword)}
                 mode={'CREATE'} inputValue={password} handleIsDisabled={handleIsDisabled}/>
          <button
            className={'purple_button'}
            onClick={() => handleCreateUserWithEmailAndPassword(email, password).then(res => sendEmailVerification(res)).catch(err => console.error(err))}
            disabled={isDisabled}
            type={"button"}
          >
            Create account
          </button>
          <Link href={'/'} className={styles.link_forgot_password}>
            <mark>Already have an account?</mark>
            Log in</Link>
        </form>
      </div>
    </section>
  );
}