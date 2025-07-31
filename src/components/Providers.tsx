'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeUser } from '@/store/slices/userSlice';

function UserInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserInitializer>
        {children}
      </UserInitializer>
    </Provider>
  );
}