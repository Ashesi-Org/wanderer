import { UserContext } from '@/contexts/userContext';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

const WithAuthHoc = ({ children }: { children: any }) => {
  const { user, isUserLoading } = useContext(UserContext);

  const router = useRouter();

  if (!user?.id && !isUserLoading) {
    router.push('/login');
  }

  return children;
  
};

export default WithAuthHoc;
