"use client";

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { useEffect } from "react";
import { Role } from '@/lib/roles';

export default function withAuth<P extends React.ComponentPropsWithoutRef<any>>(
  Component: React.ComponentType<P>,
  allowedRoles: Role[]
): React.FC<P> {
  return (props: P) => {
    const { role, isAuthenticated } = useSelector((state: RootState) => state.session);
    console.log(isAuthenticated, role);
    
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated || !allowedRoles.includes(role!)) {
        router.push('/login');
      }
    }, [isAuthenticated, role]);

    if (!isAuthenticated || !allowedRoles.includes(role!)) {
      return null;
    }

    return <Component {...props} />;
  };
}

