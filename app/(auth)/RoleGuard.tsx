'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!isLoading && !user) {
            router.push('/login');
            return;
        }


        if (user && !allowedRoles.includes(user.profile.role)) {

            router.push('/temas');
        }
    }, [user, isLoading, allowedRoles, router]);


    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
            </div>
        );
    }


    if (user && allowedRoles.includes(user.profile.role)) {
        return <>{children}</>;
    }


    return (
        <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
        </div>
    );
}