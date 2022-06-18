import i18n from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_PT } from "./pt/translations";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.use(backend)
	.init({
		resources: {
			en: {
				translation: TRANSLATIONS_EN,
			},
			pt: {
				translation: TRANSLATIONS_PT,
			},
		},

		interpolation: {
			format: function (value, format, lng) {
				if (value instanceof Date) return moment(value).format(format);
				return value;
			},
			escapeValue: false,
		},
		fallbackLng: "pt",
		debug: false,
		saveMissing: true,
	});

export { i18n };
