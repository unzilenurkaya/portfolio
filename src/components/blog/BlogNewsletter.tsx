'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

export default function BlogNewsletter() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success(t('contact.success'));
        setEmail('');
        setIsSubmitting(false);
    };

    return (
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-white/5 to-transparent border border-white/10 relative overflow-hidden group">
            {/* Decorative Orbs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors" />

            <div className="relative z-10 max-w-xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                    {t('blog.newsletterTitle')}
                </h3>
                <p className="text-gray-400 mb-8">
                    {t('blog.newsletterDesc')}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('contact.emailPlaceholder')}
                        required
                        className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        className="whitespace-nowrap"
                    >
                        {t('blog.subscribe')}
                    </Button>
                </form>
            </div>
        </div>
    );
}
