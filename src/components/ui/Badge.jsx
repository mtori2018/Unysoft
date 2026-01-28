import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-danger text-white hover:bg-danger/80",
    outline: "text-slate-950 border-slate-200",
    success: "border-transparent bg-accent text-white hover:bg-accent/80",
    warning: "border-transparent bg-warning text-white hover:bg-warning/80",
};

export function Badge({ className, variant = "default", ...props }) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
                badgeVariants[variant],
                className
            )}
            {...props}
        />
    );
}
