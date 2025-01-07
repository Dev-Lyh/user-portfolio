import React, {useState, useEffect} from 'react'
import styles from '../index.module.css'
import TitleSubtitle from "@/components/TitleSubtitle";
import LogoIcon from "@/assets/LogoIcon";
import Input from "@/components/Input";
import {useRouter} from 'next/router'
import {handleInputChange} from "@/utils/handleInputChange";
import Aside from "@/components/Aside";
import {auth} from '../../firebaseConfig'
import {verifyPasswordResetCode, confirmPasswordReset} from "firebase/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const router = useRouter()

  const {oobCode, mode} = router.query;

  const handleResetPassword = async (newPassword: string) => {
    try {

      console.log({oobCode, mode})
      // Verifica se o código é válido
      await verifyPasswordResetCode(auth, oobCode as string);

      // Confirma a redefinição de senha
      await confirmPasswordReset(auth, oobCode as string, newPassword);

      console.log("Senha alterada com sucesso!");

      await router.push('/')

    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
    }
  };

  return (
    <section className={styles.sign_container}>
      <Aside/>
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
            onClick={() => handleResetPassword(password)}
            type={'button'}
          >
            Reset password
          </button>
        </form>
      </div>
    </section>
  );
}