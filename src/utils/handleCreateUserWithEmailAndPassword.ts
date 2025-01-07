import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebaseConfig';

export function handleCreateUserWithEmailAndPassword(
  email: string,
  password: string
): Promise<object> {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userObject = userCredential.user;

        resolve(userObject)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const errorObject = {
          errorCode,
          errorMessage
        }

        reject(errorObject)
      });
  })
}
