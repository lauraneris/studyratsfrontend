"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';
import TemasHeader from '@/app/components/layout/TemasHeader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [pathname, router]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        {pathname === '/temas' ? <TemasHeader /> : <Header />}


        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}