import {
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const provider = new GithubAuthProvider();

export function handleSignInWithGithub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);

      if (!credential) {
        return null;
      }

      const token = credential.accessToken;

      const userObject = result.user;

      return userObject;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const errorObject = {
        errorCode,
        errorMessage,
      };

      return errorObject;
    });
}
