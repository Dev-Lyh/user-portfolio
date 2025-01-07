import {useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from './auth_action.module.css'
import LogoIcon from "@/assets/LogoIcon";

export default function AuthAction() {
  const router = useRouter();
  const {mode, oobCode} = router.query;

  useEffect(() => {
    if (!mode || !oobCode) return;

    switch (mode) {
      case "resetPassword":
        // Redireciona para a página de redefinição de senha
        router.replace(`/reset_password?oobCode=${oobCode}`);
        break;
      case "verifyEmail":
        // Redireciona para a página de verificação de email
        router.replace(`/confirm_verification?oobCode=${oobCode}`);
        break;
      default:
        // Redireciona para uma página de erro ou genérica
        router.replace("/error");
    }
  }, [mode, oobCode, router]);
  return (
    <section className={styles.container_redirect}>
      <LogoIcon/>
      <h1>Redirecting...</h1>
      <div className={styles.circle_redirect}>
        <div className={styles.internal_circle_redirect}></div>
      </div>
    </section>
  )
}