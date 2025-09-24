'use client';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    Icon: LucideIcon;
    title: string;
    value: string | number;
    href: string;
    iconColorClass?: string;
}

export default function StatCard({ Icon, title, value, href, iconColorClass = 'text-brand-blue' }: StatCardProps) {
    return (
        <Link href={href} className="group block">
            <div className="bg-white neo-card p-6 text-center hover:bg-gray-50 transition-colors h-full">
                <Icon className={`w-12 h-12 mx-auto mb-4 group-hover:text-brand-pink transition-colors ${iconColorClass}`} />
                <div className="text-4xl font-black text-brand-black mb-2">{value}</div>
                <div className="font-black text-gray-600 uppercase text-sm">{title}</div>
            </div>
        </Link>
    );
}