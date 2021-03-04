import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './en';

export default polyglotI18nProvider((locale) => {
	if (locale === 'fr') {
		return import('./fr').then((messages) => messages.default);
	}

	// Always fallback on english
	return englishMessages;
}, 'en');

export const supportedLocales: string[] = [ 'en', 'fr' ];
