//import { ILanguageState, LanguageSupported, SubscriptionState } from "@/types";
import { Subscription } from '@/types/Subscription';
import { create } from 'zustand';

const LANGUAGES_IN_FREE = 2;

export type LanguagesSupported =
  | 'en'
  | 'de'
  | 'es'
  | 'fr'
  | 'hi'
  | 'ja'
  | 'la'
  | 'ru'
  | 'zh'
  | 'ar';

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  ja: 'Japanese',
  la: 'Latin',
  ru: 'Russian',
  zh: 'Mandarin',
  ar: 'Arabic',
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: 'en',
  setLanguage: (language: LanguagesSupported) => {
    set({ language });
  },
  getLanguages: (isPro: boolean) => {
    //If the User is Pro, return all supported languages
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    //if not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    //If the User is Pro, return null
    if (isPro) return [];

    //if not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
