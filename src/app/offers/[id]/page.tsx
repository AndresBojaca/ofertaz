'use client'

import { useEffect } from 'react'
import { usePathname, useParams } from 'next/navigation'
import Header from '@/components/Header/Header'


export default function NavigationEvents() {
  const pathname = usePathname()
  const params = useParams()

  useEffect(() => {
    const url = `${params}`
    console.log(url)
  }, [pathname, params])

  return (
    <>

    </>
  );
}