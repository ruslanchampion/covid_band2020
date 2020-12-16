import 'regenerator-runtime/runtime';

const covidDataOfAllCountries = 'https://disease.sh/v3/covid-19/countries';

export const getData = async function () {
	const response = await fetch(covidDataOfAllCountries);
	return response.json();
};

// test
export const postData = async function () {
	const response = await fetch(covidDataOfAllCountries);
	return response.json();
};
export const resetData = async function () {
	const response = await fetch(covidDataOfAllCountries);
	return response.json();
};
