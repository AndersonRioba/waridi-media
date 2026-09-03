import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-none border border-[#E8DFC8] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition duration-200 ease-in-out hover:bg-[#FBF6EC] hover:border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 ${
                    disabled ? 'opacity-30 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
