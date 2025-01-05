import GithubIcon from "@/assets/GithubIcon";
import styles from './githubbutton.module.css';
import {handleSignInWithGithub} from "@/utils/handleSignInWithGithub";

interface GithubButtonProps {
  mode: "SINGUP" | "SIGNIN";
}

export default function GithubButton({mode}: GithubButtonProps) {
  return (
    <button type={"button"} className={styles.button} onClick={handleSignInWithGithub}>
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