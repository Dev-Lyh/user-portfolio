import React, {useState} from 'react'
import styles from '../index.module.css'
import TitleSubtitle from "@/components/TitleSubtitle";
import LogoIcon from "@/assets/LogoIcon";
import Input from "@/components/Input";
import {useRouter} from 'next/router'
import {handleInputChange} from "@/utils/handleInputChange";

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const router = useRouter()

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
          <TitleSubtitle title={'Choose new password'} subtitle={'Enter your new password and you’re all set.'}/>
          <Input type="password" placeholder='Enter a new password'
                 onChangeValue={handleInputChange(setPassword)}
                 mode={'CREATE'} inputValue={password}/>
          <Input type="password" placeholder='Re-enter the new password'
                 onChangeValue={handleInputChange(setRePassword)}
                 mode={'NORMAL'} inputValue={rePassword}/>
          <button
            className={'purple_button'}
            onClick={() => router.push('/')}
            type={'button'}
          >
            Reset password
          </button>
        </form>
      </div>
    </section>
  );
}