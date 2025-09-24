'use client';
import { AlertTriangle } from 'lucide-react';

interface AlertProps {
    message: string;
}

export default function Alert({ message }: AlertProps) {
    return (
        <div className="border-4 border-orange-500 bg-orange-50 p-4 flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0" />
            <div className="font-sans text-orange-800">
                <strong className="font-black">ATENÇÃO:</strong> {message}
            </div>
        </div>
    );
}