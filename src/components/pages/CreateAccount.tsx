import { createUserWithEmailAndPassword, getAuth, isSignInWithEmailLink, signInWithEmailLink, updateProfile } from 'firebase/auth';
import { FC, memo, useState } from 'react';

export const completeRegistration: FC = memo(() => {
  const auth = getAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration =async () => {
    const email = window.localStorage.getItem('emailForSignIn');
    
    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        if (email) {
          await signInWithEmailLink(auth, email, window.location.href);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: username});
          } else {
            throw new Error("email is not valid");
          }
        }
        // 成功後の処理... リダイレクトなど
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='鈴木 太郎' />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegistration}>登録する</button>
    </div>
  );
});