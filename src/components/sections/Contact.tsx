'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormValues } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { socialLinks } from '@/data/social';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('sending');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Success simulation
    console.log(data);
    setStatus('success');
    reset();
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              {/* Email Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl text-primary">
                  ✉️
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:unzileenurkaya@gmail.com" className="text-white text-lg hover:text-primary transition-colors">
                    unzileenurkaya@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl text-secondary">
                  📍
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    {t('about.location')}
                  </p>
                  <p className="text-white text-lg">{t('about.locationValue')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <p className="text-white font-medium mb-4">Sosyal Medya</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all"
                  >
                    {/* Simple Icon Placeholders */}
                    {social.icon === 'linkedin' && 'in'}
                    {social.icon === 'github' && 'gh'}
                    {social.icon === 'twitter' && 'x'}
                    {social.icon === 'email' && '@'}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl border border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('contact.name')}
                  placeholder={t('contact.namePlaceholder')}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label={t('contact.email')}
                  placeholder={t('contact.emailPlaceholder')}
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              
              <Input
                label={t('contact.subject')}
                placeholder={t('contact.subjectPlaceholder')}
                error={errors.subject?.message}
                {...register('subject')}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  {t('contact.message')}
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={status === 'sending'}
                disabled={status === 'success'}
              >
                {status === 'success' ? t('contact.success') : t('contact.send')}
              </Button>

              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">
                  {t('contact.error')}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
