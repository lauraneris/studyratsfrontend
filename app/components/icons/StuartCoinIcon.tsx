import React from "react";

type Props = { className?: string; title?: string };

export default function StuartCoinIcon({ className = "h-6 w-6", title = "StuartCoin" }: Props) {
    return (
        <img
            src="/imagens/stuartcoin.svg"
            alt={title}
            className={`shrink-0 select-none pointer-events-none ${className}`}
            draggable={false}
        />
    );
}