import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';

export const useFirebaseAuth = (auth: Auth) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
};
