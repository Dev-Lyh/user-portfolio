import GithubIcon from "@/assets/GithubIcon";
import styles from './githubbutton.module.css';
import {handleSignInWithGithub} from "@/utils/handleSignInWithGithub";
import {useRouter} from 'next/router';

interface GithubButtonProps {
  mode: "SINGUP" | "SIGNIN";
}

export default function GithubButton({mode}: GithubButtonProps) {
  const router = useRouter();

  return (
    <button type={"button"} className={styles.button}
            onClick={() => handleSignInWithGithub().then(res => router.push({
              pathname: '/profile_settings',
              query: {uid: res.uid}
            })).catch(err => console.error(err))}>
      <GithubIcon/>
      {
        mode === "SIGNIN" ?
          <p>Sign in with Github</p>
          :
          <p>Sign up with Github</p>
      }
    </button>
  )
}