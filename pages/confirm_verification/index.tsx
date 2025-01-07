import Link from 'next/link';
import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {applyActionCode} from "firebase/auth";

import LogoIcon from "@/assets/LogoIcon";

import TitleSubtitle from "@/components/TitleSubtitle";
import Aside from '@/components/Aside';

import styles from '../index.module.css';
import {auth} from '../../firebaseConfig';

export default function ConfirmVerification() {
  const router = useRouter();
  const {oobCode} = router.query;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (oobCode) {
      setLoading(false); // Parar o carregamento quando o código for definido
    }
  }, [oobCode]);

  const handleVerifyEmail = async () => {
    if (!oobCode) {
      console.error("Código de verificação não encontrado!");
      return;
    }

    try {
      await applyActionCode(auth, oobCode as string);
      await router.push('/');
    } catch (error) {
      console.error("Erro ao verificar o email:", error);
    }
  };

  return (
    <section className={styles.sign_container}>
      <Aside/>
      <div className={styles.form_container}>
        <form>
          <LogoIcon/>
          <TitleSubtitle title={'Confirm your verification'}
                         subtitle={''}/>
          <button className={'purple_button'} onClick={handleVerifyEmail} type={'button'} margin>Confirmar
            Verificação
          </button>
        </form>
      </div>
    </section>
  )
}