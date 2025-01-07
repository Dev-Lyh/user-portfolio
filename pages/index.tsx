import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router'

import {handleSignInWithEmailAndPassword} from '@/utils/handleSignInWithEmailAndPassword'
import {handleInputChange} from '@/utils/handleInputChange'
import {auth} from '../firebaseConfig'

import LogoIcon from "@/assets/LogoIcon";

import TitleSubtitle from "@/components/TitleSubtitle";
import GithubButton from "@/components/GithubButton";
import Input from "@/components/Input";
import Separator from "@/components/Separator";
import Aside from '@/components/Aside';

import styles from './index.module.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser)
  }, []);

  return (
    <section className={styles.sign_container}>
      <Aside/>
      <div className={styles.form_container}>
        <form>
          <LogoIcon/>
          <TitleSubtitle title={'Login to account'} subtitle={'Enter your credentials to access your account'}/>
          <GithubButton mode={'SIGNIN'}/>
          <Separator/>
          {
            error && <strong className={styles.error_message}>Account not found. Create an account.</strong>
          }
          <Input type="email" placeholder='Enter email' onChangeValue={handleInputChange(setEmail)} mode={'NORMAL'}
                 inputValue={email}/>
          <Input type="password" placeholder='Enter a password' onChangeValue={handleInputChange(setPassword)}
                 mode={'NORMAL'} inputValue={password}/>
          <Link href={'/forgot_password'} className={styles.link_forgot_password} style={{textAlign: 'right'}}>Forgot
            password</Link>
          <button
            className={'purple_button'}
            type={"button"}
            onClick={() => handleSignInWithEmailAndPassword(email, password).then(res => router.push({
              pathname: `/profile_settings/${res.uid}`,
            })).catch(err => setError(err))}>Sign
            In
          </button>
          <Link href={'/sign_up'} className={styles.link_forgot_password}>
            <mark>Not a member?</mark>
            Create an account</Link>
        </form>
      </div>
    </section>
  )
}
