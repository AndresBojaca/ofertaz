"use client";

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header/Header';
import HeaderSimple from './Header/HeaderSimple';

interface HeaderProviderType {
  children: ReactNode;
}
const headerPaths = ['/','confirm-account', 'forgot-password', 'reset-password', 'profile','offers', 'applications'];
const simpleHeaderPaths = ['login', 'signup'];

export default function HeaderProvider({ children }: HeaderProviderType) {
  const pathname = usePathname();
  const showHeader = headerPaths.includes(pathname.split('/')[1] || '/'); ;
  const showHeaderSimple = simpleHeaderPaths.includes(pathname.split('/')[1] || '/');
  console.log(showHeaderSimple);

  return (
    <>
      {showHeader && <Header />} 
      {showHeaderSimple && <HeaderSimple />}
      {children}
    </>
  );
};
