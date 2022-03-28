import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json'
countries.registerLocale(enLocale);

const countriesObj = countries.getNames("en", {select: "official"});

export const countriesList = Object.entries(countriesObj).map(([key, value]) => {
    return {
        label: value,
        value: key
    }
});

