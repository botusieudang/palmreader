import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import RNFS from 'react-native-fs';

export type LanguageCode = 'vi' | 'en' | 'ko' | 'ja' | 'es' | 'pt' | 'fr' | 'de' | 'hi' | 'ar';

type Dictionary = Record<string, string>;
type Resources = Record<LanguageCode, Dictionary>;

const resources: Resources = {
    vi: require('./locales/vi.json'),
    en: require('./locales/en.json'),
    ko: require('./locales/ko.json'),
    ja: require('./locales/ja.json'),
    es: require('./locales/es.json'),
    pt: require('./locales/pt.json'),
    fr: require('./locales/fr.json'),
    de: require('./locales/de.json'),
    hi: require('./locales/hi.json'),
    ar: require('./locales/ar.json'),
};

export const translateForLanguage = (lang: LanguageCode, key: string): string => {
    const dict = resources[lang] ?? resources.en;
    const v = (dict as any)[key];
    if (typeof v === 'string') return v;
    const en = (resources.en as any)[key];
    if (typeof en === 'string') return en;
    return (resources.en as any)[key] || String(key);
};

type I18nContextType = {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>('en');
    const [hydrated, setHydrated] = useState(false);

    // Load saved language on mount to avoid defaulting to English
    useEffect(() => {
        const load = async () => {
            try {
                const path = `${RNFS.DocumentDirectoryPath}/language_selected_flag.json`;
                const exists = await RNFS.exists(path);
                if (exists) {
                    const txt = await RNFS.readFile(path, 'utf8');
                    const data = JSON.parse(txt || '{}');
                    const saved = (data?.lang || data?.language) as LanguageCode | undefined;
                    if (saved && (resources as any)[saved]) {
                        setLanguageState(saved);
                    }
                }
            } catch { }
            setHydrated(true);
        };
        load();
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        // Persist selection
        (async () => {
            try {
                const path = `${RNFS.DocumentDirectoryPath}/language_selected_flag.json`;
                await RNFS.writeFile(path, JSON.stringify({ selected: true, lang }), 'utf8');
            } catch { }
        })();
    };

    const value = useMemo<I18nContextType>(() => {
        const dict = resources[language] ?? resources.en;
        const t = (key: string) => {
            const v = (dict as any)[key];
            if (typeof v === 'string') return v;
            const en = (resources.en as any)[key];
            if (typeof en === 'string') return en;
            return (resources.en as any)[key] || String(key);
        };
        return { language, setLanguage, t };
    }, [language]);

    if (!hydrated) return null;
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return ctx;
};


