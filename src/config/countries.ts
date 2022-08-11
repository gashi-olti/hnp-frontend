const allCountries = require('i18n-iso-countries');
allCountries.registerLocale(require('i18n-iso-countries/langs/sq.json'));

export interface CountryInterface {
  key: string;
  value: string;
}

const availableContries = ['AL'];
const allCountriesObj = allCountries.getNames('sq', { select: 'official' });

const countries: CountryInterface[] = Object.keys(allCountriesObj)
  .filter((country) => availableContries.includes(country))
  .map((key) => ({ key, value: allCountriesObj[key] }));

export default countries;
