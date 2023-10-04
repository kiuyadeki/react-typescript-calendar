import { errorSelector, useSetRecoilState } from 'recoil'
import { errorState, loadingState, userState } from '../recoil/AuthState'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const useManageAuthState = () => {
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);
  const [currentUser, currentLoading, currentError] = useAuthState(auth);

  useEffect(() => {
    setUser(currentUser);
    setLoading(currentLoading);
    setError(currentError);
  }, [currentUser, currentLoading, currentError]);
}