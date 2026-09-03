import { BrandLogo } from '@/Components/public/BrandLogo';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EC] p-6">
            <div className="mb-6">
                <BrandLogo size="lg" showTagline={true} />
            </div>

            <div className="w-full max-w-md overflow-hidden bg-white p-8 rounded-3xl border border-[#E8DFC8] shadow-xl">
                {children}
            </div>
        </div>
    );
}
