import { objTotalConfirmed, typeTimeView, typeAmount } from './data.component.js';

export function createCountryInfo() {
	for (countryData of objTotalConfirmed.Countries) {
		if (countryData.population) {
			createRegionElement(countryData);
		}
	}
}

export function createRegionElement(countryData) {
	const divRegionsData = document.querySelector('#region');
	const divRegionsBlockOne = document.createElement("div");
	divRegionsBlockOne.classList.add("blockOneCountry");
	const divRegionDetails = document.createElement("div");
	divRegionDetails.classList.add("propertiesCountry");

	const pCountryName = document.createElement("p");
	pCountryName.classList.add("cdr");
	pCountryName.innerHTML = countryData.Country;

	const pTotalConfirmed = document.createElement("p");
	pTotalConfirmed.classList.add("confirmed");
	pTotalConfirmed.innerHTML = getTotalConfirmedInfo(countryData);

	const pTotalDeaths = document.createElement("p");
	pTotalDeaths.classList.add("deaths");
	pTotalDeaths.innerHTML = getTotalDeathsInfo(countryData);

	const pTotalRecovered = document.createElement("p");
	pTotalRecovered.classList.add("recovered");
	pTotalRecovered.innerHTML = getTotalRecoveredInfo(countryData);

	divRegionsData.appendChild(divRegionsBlockOne);
	divRegionsBlockOne.appendChild(pCountryName);
	divRegionsBlockOne.appendChild(divRegionDetails);
	divRegionDetails.appendChild(pTotalConfirmed);
	divRegionDetails.appendChild(pTotalDeaths);
	divRegionDetails.appendChild(pTotalRecovered);



	// const divRegionsData = document.querySelector('#region');

	// const divRegionsBlockOne = document.createElement("div");
	// divRegionsBlockOne.classList.add("blockOneCountry");

	// const pCountryName = document.createElement("p");
	// pCountryName.classList.add("cdr");
	// pCountryName.innerHTML = countryData.Country;


	// const divRegionDetails = document.createElement("div");
	// divRegionDetails.classList.add("propertiesCountry");

	// const pTotalConfirmed = document.createElement("p");
	// pTotalConfirmed.classList.add("confirmed");
	// pTotalConfirmed.innerHTML = getTotalConfirmedInfo(countryData);

	// const pTotalDeaths = document.createElement("p");
	// pTotalDeaths.classList.add("deaths");
	// pTotalDeaths.innerHTML = getTotalDeathsInfo(countryData);

	// const pTotalRecovered = document.createElement("p");
	// pTotalRecovered.classList.add("recovered");
	// pTotalRecovered.innerHTML = getTotalRecoveredInfo(countryData);


	// divRegionsData.appendChild(divRegionsBlockOne);
	// divRegionsData.appendChild(divRegionDetails);

	// divRegionsBlockOne.appendChild(pCountryName);

	// divRegionDetails.appendChild(pTotalConfirmed);
	// divRegionDetails.appendChild(pTotalDeaths);
	// divRegionDetails.appendChild(pTotalRecovered);
}

function getTotalConfirmedInfo(countryData) {
	return 'Confirmed: ' + calc100thd(countryData[typeTimeView + 'Confirmed']);
}

function getTotalDeathsInfo(countryData) {
	return 'Deaths: ' + calc100thd(countryData[typeTimeView + 'Deaths']);
}

function getTotalRecoveredInfo(countryData) {
	return 'Recovered: ' + calc100thd(countryData[typeTimeView + 'Recovered']);
}

function calc100thd(value) {
	if (typeAmount === '100thd') {
		value *= 100000 / countryData.population;
	}
	return Math.round(value * 100) / 100;
}

export function clearListcountryData() {
	document.querySelector('#region').innerHTML = '';
	document.querySelector('#globalInfo').innerHTML = '';
}