import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-none border border-red-700 bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_2px_4px_rgba(220,38,38,0.2)] hover:shadow-[0_4px_10px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800 ${
                    disabled ? 'opacity-30 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
