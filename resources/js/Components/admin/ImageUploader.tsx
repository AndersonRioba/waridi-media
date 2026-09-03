import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
    value?: string | null;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    value = '',
    onChange,
    label = 'Upload Image',
    description = 'JPG, PNG, WebP up to 50MB',
    className = '',
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            const res = await fetch('/admin/media/upload', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                },
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Upload failed');
            }

            const data = await res.json();
            if (data.url) {
                onChange(data.url);
            }
        } catch (err: any) {
            setUploadError(err.message || 'Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-xs uppercase font-semibold text-[#1A1A1A]">
                    {label}
                </label>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Preview Thumbnail */}
                {value ? (
                    <div className="relative group w-32 h-32 rounded-xl overflow-hidden border border-[#E8DFC8] bg-[#FBF6EC] shrink-0">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove image"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="w-32 h-32 rounded-xl border-2 border-dashed border-[#E8DFC8] flex flex-col items-center justify-center text-[#A8A49C] bg-[#FAF8F2] shrink-0">
                        <ImageIcon size={28} className="mb-1 text-[#C9A227]/60" />
                        <span className="text-[10px] uppercase font-semibold tracking-wider">No image</span>
                    </div>
                )}

                {/* Upload & URL Box */}
                <div className="flex-1 w-full space-y-2.5">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Image URL or upload a file directly..."
                            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227] bg-white"
                        />

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleInputChange}
                            className="hidden"
                        />

                        <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2.5 bg-[#F5EFE1] hover:bg-[#E8DFC8] text-[#1A1A1A] rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-50 cursor-pointer border border-[#E8DFC8]"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin text-[#8A6A16]" />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={14} className="text-[#8A6A16]" />
                                    <span>Browse File</span>
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-[11px] text-[#7A766E]">
                        {description}. You can click <strong>Browse File</strong> to upload directly from your device, or paste a direct image URL.
                    </p>

                    {uploadError && (
                        <p className="text-xs text-red-600">{uploadError}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
