import 'regenerator-runtime/runtime';

const covidDataOfAllCountries = 'https://disease.sh/v3/covid-19/countries';

const covidDataAtAll = 'https://disease.sh/v3/covid-19/all';

export const getDataCountries = async function a() {
	const response = await fetch(covidDataOfAllCountries);
	return response.json();
};

export const getDataAll = async function b() {
	const response = await fetch(covidDataAtAll);
	return response.json();
};
