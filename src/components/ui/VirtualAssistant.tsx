'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { scrollToElement } from '@/lib/utils';

type AssistantIntent = 'projects' | 'cv' | 'blog' | 'contact' | 'about' | 'fallback';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

interface WakeCue {
  id: string;
  title: string;
  body: string;
}

type AssistantSection =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'certificates'
  | 'contact'
  | 'blog'
  | 'cv'
  | 'privacy';

const homeTargets: Record<Exclude<AssistantIntent, 'cv' | 'blog' | 'fallback'>, string> = {
  projects: 'projects',
  contact: 'contact',
  about: 'about',
};

export default function VirtualAssistant() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [activeSection, setActiveSection] = useState<AssistantSection>(() => getInitialSection(pathname));
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [wakeCue, setWakeCue] = useState<WakeCue | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messageCounter = useRef(1);
  const wakeCounter = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickActions = useMemo(
    () => [
      { intent: 'projects' as const, label: t('assistant.chips.projects') },
      { intent: 'cv' as const, label: t('assistant.chips.cv') },
      { intent: 'blog' as const, label: t('assistant.chips.blog') },
      { intent: 'contact' as const, label: t('assistant.chips.contact') },
    ],
    [t]
  );

  const floatingHints = useMemo(
    () => [
      t('assistant.prompts.projects'),
      t('assistant.prompts.blog'),
      t('assistant.prompts.cv'),
      t('assistant.prompts.contact'),
    ],
    [t]
  );

  const liveContext = useMemo(() => t(`assistant.context.${activeSection}`), [activeSection, t]);
  const personaLabel = useMemo(
    () =>
      pathname.startsWith('/blog')
        ? t('assistant.persona.analyst')
        : t('assistant.persona.guide'),
    [pathname, t]
  );

  useEffect(() => {
    if (isOpen || floatingHints.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setHintIndex((current) => (current + 1) % floatingHints.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [floatingHints, isOpen]);

  useEffect(() => {
    setActiveSection(getInitialSection(pathname));
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 22;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    const handleScroll = () => {
      setScrollOffset(Math.min(window.scrollY * 0.03, 18));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setDrift({ x: 0, y: 0 });
      return;
    }

    const intervalId = window.setInterval(() => {
      setDrift({
        x: Math.round((Math.random() - 0.5) * 18),
        y: Math.round((Math.random() - 0.5) * 14),
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sectionIds: AssistantSection[] = ['about', 'skills', 'projects', 'experience', 'certificates', 'contact'];
    const sectionElements = sectionIds
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry): entry is { id: AssistantSection; element: HTMLElement } => entry.element instanceof HTMLElement);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id as AssistantSection);
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.75],
      }
    );

    sectionElements.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const nextCue = {
      id: `wake-${wakeCounter.current++}`,
      title: t(`assistant.sections.${activeSection}`),
      body: liveContext,
    };

    setWakeCue(nextCue);

    const timeoutId = window.setTimeout(() => {
      setWakeCue((current) => (current?.id === nextCue.id ? null : current));
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [activeSection, isOpen, liveContext, t]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, messages, isThinking, isListening]);

  const toggleAssistant = () => {
    setIsOpen((current) => !current);
  };

  const navigate = (intent: AssistantIntent) => {
    if (intent === 'cv') {
      router.push('/cv');
      return;
    }

    if (intent === 'blog') {
      router.push('/blog');
      return;
    }

    if (intent === 'fallback') {
      return;
    }

    const targetId = homeTargets[intent];

    if (pathname === '/') {
      scrollToElement(targetId, 96);
      window.history.replaceState(null, '', `/#${targetId}`);
      return;
    }

    router.push(`/#${targetId}`);
  };

  const getReply = (intent: AssistantIntent) => t(`assistant.replies.${intent}`);

  const detectIntent = (value: string): AssistantIntent => {
    const normalized = value
      .toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .trim();

    if (/project|proje/.test(normalized)) return 'projects';
    if (/cv|resume|ozgecmis|özgecmis|özgeçmis|ozgeçmis/.test(normalized)) return 'cv';
    if (/blog|ai|openclaw|llm|yazi|yazı|article/.test(normalized)) return 'blog';
    if (/iletisim|iletişim|contact|mail|email/.test(normalized)) return 'contact';
    if (/hakkimda|hakkımda|about/.test(normalized)) return 'about';

    return 'fallback';
  };

  const appendExchange = (userText: string, intent: AssistantIntent) => {
    const baseId = `assistant-${messageCounter.current++}`;

    setMessages((current) => [
      ...current,
      { id: `${baseId}-user`, role: 'user', text: userText },
      { id: `${baseId}-assistant`, role: 'assistant', text: getReply(intent) },
    ]);

    navigate(intent);
  };

  const handleQuickAction = (intent: AssistantIntent) => {
    appendExchange(t(`assistant.prompts.${intent}`), intent);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isThinking) {
      return;
    }

    const intent = detectIntent(trimmedInput);
    const baseId = `assistant-${messageCounter.current++}`;
    setMessages((current) => [
      ...current,
      { id: `${baseId}-user`, role: 'user', text: trimmedInput },
    ]);
    setInput('');
    setIsOpen(true);
    setIsListening(false);

    if (intent !== 'fallback') {
      setMessages((current) => [...current, { id: `${baseId}-assistant`, role: 'assistant', text: getReply(intent) }]);
      navigate(intent);
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedInput,
          language,
          pathname,
          activeSection,
        }),
      });

      const data = (await response.json()) as { reply?: string; action?: AssistantIntent };
      const aiIntent = data.action || 'fallback';

      setMessages((current) => [
        ...current,
        {
          id: `${baseId}-assistant`,
          role: 'assistant',
          text: data.reply || getReply('fallback'),
        },
      ]);

      if (aiIntent !== 'fallback') {
        navigate(aiIntent);
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${baseId}-assistant`,
          role: 'assistant',
          text: getReply('fallback'),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-[80] flex items-end gap-3"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.55 + drift.x}px, ${mouseOffset.y * 0.45 - scrollOffset + drift.y}px, 0)`,
          transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.section
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(88vw,380px)] overflow-hidden rounded-[2rem] border border-[#f07445]/25 bg-[linear-gradient(180deg,rgba(15,10,7,0.98),rgba(8,6,4,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.52),0_0_0_1px_rgba(240,116,69,0.04)] backdrop-blur-xl"
            >
              <div className="relative overflow-hidden border-b border-[#f07445]/12 px-5 py-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,116,69,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(82,255,170,0.08),transparent_28%)]" />
                <div className="relative flex items-center gap-4">
                  <AssistantOrb compact activeSection={activeSection} mouseOffset={mouseOffset} isThinking={isThinking} />
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-[#f6ede7]">{t('assistant.name')}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#f07445]">
                      <span className="h-2 w-2 rounded-full bg-[#f07445] shadow-[0_0_12px_rgba(240,116,69,0.85)]" />
                      {personaLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAssistant}
                    className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[#d8c6b6] transition-all hover:border-[#f07445]/35 hover:text-white"
                    aria-label={t('assistant.closeLabel')}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="px-5 pb-5 pt-4">
                <p className="mb-4 text-sm leading-7 text-[#bda690]">{t('assistant.hint')}</p>

                <div className="mb-4 max-h-[250px] space-y-3 overflow-y-auto pr-1">
                  <div className="flex items-end gap-3">
                    <AssistantBadge />
                    <div className="max-w-[78%] rounded-[1.35rem] rounded-bl-md border border-[#f07445]/12 bg-[#17110d] px-4 py-3 text-sm leading-6 text-[#ead7c8]">
                      {t('assistant.intro')}
                    </div>
                  </div>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.role === 'assistant' && <AssistantBadge />}
                      <div
                        className={`max-w-[78%] rounded-[1.35rem] px-4 py-3 text-sm leading-6 ${
                          message.role === 'assistant'
                            ? 'rounded-bl-md border border-[#f07445]/12 bg-[#17110d] text-[#ead7c8]'
                            : 'rounded-br-md bg-[linear-gradient(135deg,#f07445,#d95e33)] text-white shadow-[0_12px_24px_rgba(240,116,69,0.24)]'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex items-end gap-3">
                      <AssistantBadge />
                      <div className="max-w-[78%] rounded-[1.35rem] rounded-bl-md border border-[#f07445]/12 bg-[#17110d] px-4 py-3 text-sm leading-6 text-[#ead7c8]">
                        {t('assistant.thinking')}
                      </div>
                    </div>
                  )}
                  {isListening && !isThinking && input.trim().length > 0 && (
                    <div className="flex items-end gap-3">
                      <AssistantBadge />
                      <div className="flex max-w-[78%] items-center gap-2 rounded-[1.35rem] rounded-bl-md border border-[#f07445]/12 bg-[#17110d] px-4 py-3 text-sm leading-6 text-[#ead7c8]">
                        <span>{t('assistant.listening')}</span>
                        <ListeningDots />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.intent}
                      type="button"
                      onClick={() => handleQuickAction(action.intent)}
                      className="rounded-full border border-[#f07445]/22 bg-[#130f0b] px-3.5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#d7ad87] transition-all hover:border-[#f07445]/55 hover:bg-[#20150f] hover:text-[#f7c39b]"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 rounded-[1.3rem] border border-white/10 bg-[#0d0a08] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <input
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                      setIsListening(event.target.value.trim().length > 0);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                    placeholder={t('assistant.placeholder')}
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#f2e6dc] outline-none placeholder:text-[#6f5644]"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#f07445,#d65e34)] text-white shadow-[0_10px_24px_rgba(240,116,69,0.32)] transition-transform hover:scale-105"
                    aria-label={t('assistant.sendLabel')}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M3.4 20.4 22 12 3.4 3.6v6.1L16 12 3.4 14.3v6.1Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="relative">
          <AnimatePresence>
            {!isOpen && wakeCue && (
              <motion.div
                key={wakeCue.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="absolute bottom-[102px] right-0 hidden w-[min(280px,78vw)] rounded-[1.4rem] border border-[#f07445]/25 bg-[linear-gradient(180deg,rgba(19,13,9,0.96),rgba(10,8,6,0.96))] px-4 py-3 text-sm text-[#ead7c8] shadow-[0_18px_40px_rgba(0,0,0,0.42)] md:block"
              >
                <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#f07445]">
                  {wakeCue.title}
                </div>
                <div className="leading-6">{wakeCue.body}</div>
                <div className="mt-3 border-t border-white/5 pt-3 text-xs text-[#b9977e]">
                  {floatingHints[hintIndex]}
                </div>
                <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-[#f07445]/20 bg-[#0d0906]" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.4, 0.18] }}
            transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 rounded-full border border-[#f07445]/35"
          />
          <motion.div
            animate={{ scale: [1, 1.32, 1], opacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.4 }}
            className="pointer-events-none absolute -inset-3 rounded-full border border-[#f07445]/20"
          />
          <motion.button
            type="button"
            onClick={toggleAssistant}
            whileHover={{ scale: 1.07, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="relative grid h-[84px] w-[84px] place-items-center rounded-full border border-[#f07445]/45 bg-[radial-gradient(circle_at_32%_28%,rgba(53,34,19,0.95),rgba(12,8,5,0.98)_66%)] shadow-[0_0_0_1px_rgba(240,116,69,0.08),0_16px_38px_rgba(0,0,0,0.46),0_0_28px_rgba(240,116,69,0.26)]"
            aria-label={isOpen ? t('assistant.closeLabel') : t('assistant.openLabel')}
          >
            <div className="absolute inset-[6px] rounded-full border border-[#f07445]/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
            <motion.div
              animate={{ y: [0, -2, 0], x: [0, 1.5, 0, -1.5, 0] }}
              transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              <AssistantOrb activeSection={activeSection} mouseOffset={mouseOffset} isThinking={isThinking} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  );
}

function ListeningDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: index * 0.14 }}
          className="h-1.5 w-1.5 rounded-full bg-[#f07445]"
        />
      ))}
    </div>
  );
}

function getInitialSection(pathname: string): AssistantSection {
  if (pathname === '/blog') return 'blog';
  if (pathname.startsWith('/blog/')) return 'blog';
  if (pathname === '/cv') return 'cv';
  if (pathname === '/privacy') return 'privacy';
  return 'hero';
}

function AssistantBadge() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-full border border-[#f07445]/25 bg-[#100b08] shadow-[0_0_18px_rgba(240,116,69,0.14)]">
      <svg className="h-5 w-5" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#140e09" stroke="#ee7443" strokeWidth="2" />
        <circle cx="32" cy="21" r="12" fill="#1b130d" stroke="#ee7443" strokeWidth="1.5" />
        <line x1="32" y1="8" x2="32" y2="5" stroke="#ee7443" strokeWidth="1.5" />
        <circle cx="32" cy="4" r="2" fill="#ee7443" />
        <ellipse cx="27" cy="21" rx="4" ry="4.8" fill="#08140b" />
        <ellipse cx="37" cy="21" rx="4" ry="4.8" fill="#08140b" />
        <ellipse cx="27" cy="21" rx="2.6" ry="3.2" fill="#42c86b" />
        <ellipse cx="37" cy="21" rx="2.6" ry="3.2" fill="#42c86b" />
        <circle cx="28" cy="19.8" r="1" fill="#fdfdfd" opacity="0.92" />
        <circle cx="38" cy="19.8" r="1" fill="#fdfdfd" opacity="0.92" />
        <path d="M25.5 28.5Q32 33 38.5 28.5" fill="none" stroke="#ee7443" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="24" y="34" width="16" height="11" rx="5.5" fill="#19120d" stroke="#ee744366" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

function AssistantOrb({
  compact = false,
  activeSection = 'hero',
  mouseOffset = { x: 0, y: 0 },
  isThinking = false,
}: {
  compact?: boolean;
  activeSection?: AssistantSection;
  mouseOffset?: { x: number; y: number };
  isThinking?: boolean;
}) {
  const sectionGlow = activeSection === 'blog'
    ? '#6de3ff'
    : activeSection === 'projects'
      ? '#f7a76d'
      : activeSection === 'contact'
        ? '#77f5b5'
        : '#f07445';
  const eyeShiftX = Math.max(-1.6, Math.min(1.6, mouseOffset.x * 0.08));
  const eyeShiftY = Math.max(-1.2, Math.min(1.2, mouseOffset.y * 0.08));
  const mouthPath = isThinking ? 'M31 36Q42 31 53 36' : 'M31 35Q42 42 53 35';

  return (
    <motion.div
      animate={{
        y: [0, -3, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
        scale: compact ? [1, 1.02, 1] : [1, 1.03, 1],
      }}
      transition={{ duration: compact ? 3.4 : 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      className={compact ? 'h-12 w-12' : 'h-16 w-16'}
    >
      <svg viewBox="0 0 84 84" aria-hidden="true">
        <defs>
          <radialGradient id="shellGlow" cx="30%" cy="28%">
            <stop offset="0%" stopColor="#312016" />
            <stop offset="72%" stopColor="#110b08" />
            <stop offset="100%" stopColor="#080604" />
          </radialGradient>
          <radialGradient id={`eyeGlow-${activeSection}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="#7ef4a2" />
            <stop offset="75%" stopColor="#33c566" />
            <stop offset="100%" stopColor="#0d2b16" />
          </radialGradient>
        </defs>
        <circle cx="42" cy="42" r="39" fill="url(#shellGlow)" stroke={sectionGlow} strokeWidth="2.2" />
        <circle cx="42" cy="27" r="15" fill="#17100b" stroke={sectionGlow} strokeWidth="1.6" />
        <line x1="42" y1="12" x2="42" y2="8" stroke={sectionGlow} strokeWidth="1.5" />
        <circle cx="42" cy="6.5" r="2.5" fill={sectionGlow} />
        <rect x="24" y="21" width="5.4" height="10" rx="2.7" fill="#1a120d" stroke={sectionGlow} strokeWidth="1" />
        <rect x="54.6" y="21" width="5.4" height="10" rx="2.7" fill="#1a120d" stroke={sectionGlow} strokeWidth="1" />
        <ellipse cx="35" cy="27" rx="4.6" ry="5.5" fill="#07120a" />
        <ellipse cx="49" cy="27" rx="4.6" ry="5.5" fill="#07120a" />
        <ellipse cx={35 + eyeShiftX} cy={27 + eyeShiftY} rx="3" ry="3.6" fill={`url(#eyeGlow-${activeSection})`} />
        <ellipse cx={49 + eyeShiftX} cy={27 + eyeShiftY} rx="3" ry="3.6" fill={`url(#eyeGlow-${activeSection})`} />
        <circle cx={36.2 + eyeShiftX * 0.7} cy={25.3 + eyeShiftY * 0.6} r="1.1" fill="#fff" opacity="0.95" />
        <circle cx={50.2 + eyeShiftX * 0.7} cy={25.3 + eyeShiftY * 0.6} r="1.1" fill="#fff" opacity="0.95" />
        <path d={mouthPath} fill="none" stroke={sectionGlow} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="31" y="46" width="22" height="14" rx="7" fill="#17110d" stroke={`${sectionGlow}66`} strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}
