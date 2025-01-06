import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebaseConfig';

export function handleSignInWithEmailAndPassword(email: string, password: string): Promise<object> {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userObject = userCredential.user;
        resolve(userObject); // Resolve a Promise com os dados do usuário
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorObject = {
          errorCode,
          errorMessage,
        };
        reject(errorObject); // Rejeita a Promise com o erro
      });
  });
}
