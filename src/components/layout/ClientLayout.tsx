'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FluidCursor from '../ui/FluidCursor';
import ScrollToTop from '../ui/ScrollToTop';
import CookieBanner from '../ui/CookieBanner';
import VirtualAssistant from '../ui/VirtualAssistant';
import { Toaster } from 'sonner';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <FluidCursor />
            <Navbar />
            <main id="main-content">
                {children}
            </main>
            <Footer />
            <ScrollToTop />
            <VirtualAssistant />
            <CookieBanner />
            <Toaster
                position="top-right"
                theme="dark"
                richColors
                closeButton
            />
        </>
    );
}
