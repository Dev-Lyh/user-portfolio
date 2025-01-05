import React, {useState} from 'react'
import styles from '../index.module.css'
import TitleSubtitle from "@/components/TitleSubtitle";
import LogoIcon from "@/assets/LogoIcon";
import Input from "@/components/Input";
import Link from 'next/link';
import {handleInputChange} from "@/utils/handleInputChange";

export default function ForgetPassword() {
  const [email, setEmail] = useState('')

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