export const fallbackLng = 'ru';
export const languages = [fallbackLng, 'en', 'uz'];
export const defaultNS = 'home';

export function getOptions(lang = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
