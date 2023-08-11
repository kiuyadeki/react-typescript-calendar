import { getAuth } from 'firebase/auth';
import { FC, memo } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

const auth = getAuth();
export const Home: FC = memo(() => {
  const {user, loading} = useFirebaseAuth(auth);
  if (loading) {
    return <p>Loading ...</p>
  }

  if (user) {
    return <p>hey {user.email}</p>;
  } else {
    return <p>Please sign in.</p>
  }
});
