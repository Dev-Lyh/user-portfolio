import React, {useState} from 'react'
import {handleSignInWithEmailAndPassword} from '../src/utils/handleSignInWithEmailAndPassword'
import styles from './index.module.css'
import TitleSubtitle from "@/components/TitleSubtitle";
import LogoIcon from "@/assets/LogoIcon";
import GithubButton from "@/components/GithubButton";
import Input from "@/components/Input";
import Link from 'next/link';
import Separator from "@/components/Separator";
import {handleInputChange} from '@/utils/handleInputChange'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className={styles.sign_container}>
      <aside className={styles.aside_container}>
        <strong>
          Easy Portfolio for Developer
        </strong>
        <p>
          As a web developer, having a portfolio is essential for showcasing your technical skills and attracting
          potential clients. A portfolio is a museum of your work, with past tech stacks, case studies, and your work
          history.
        </p>
      </aside>
      <div className={styles.form_container}>
        <form>
          <LogoIcon/>
          <TitleSubtitle title={'Login to account'} subtitle={'Enter your credentials to access your account'}/>
          <GithubButton mode={'SIGNIN'}/>
          <Separator/>
          <Input type="email" placeholder='Enter email' onChangeValue={handleInputChange(setEmail)} mode={'NORMAL'}
                 inputValue={email}/>
          <Input type="password" placeholder='Enter a password' onChangeValue={handleInputChange(setPassword)}
                 mode={'NORMAL'} inputValue={password}/>
          <Link href={'/forgot_password'} className={styles.link_forgot_password} style={{textAlign: 'right'}}>Forgot
            password</Link>
          <button
            className={'purple_button'}
            onClick={() => handleSignInWithEmailAndPassword(email, password).then(res => console.log(res)).catch(err => console.error(err))}>Sign
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
