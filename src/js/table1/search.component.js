import { objTotalConfirmed, findCountry } from './data.component.js';
import { clearListcountryData, createCountryInfo, createRegionElement } from './countriesInfo.component.js';
import { fillGlobalInfo } from './globalInfo.component.js';

export function updateView() {
	clearListcountryData();
	if (findCountry === '') {
		createCountryInfo();
	} else {
		let findResult = findCountryData(findCountry);
		if (findResult === 'not found') {
			errorNotFindCountry();
		} else if (findResult.Country !== 'not found') {
			createRegionElement(findCountryData(findCountry));
		}
	}
	fillGlobalInfo();
}

function findCountryData(countryName) {
	for (countryData of objTotalConfirmed.Countries) {
		if (countryName === countryData.Country) {
			return countryData;
		}
	}
	return 'not found';
}

const searchCountry = document.querySelector('#searchCountry');
searchCountry.addEventListener("click", function (event) {
	clearListcountryData();
	fillGlobalInfo();
	findCountry = document.querySelector('#findCountry').value;
	let findResult = findCountryData(findCountry);
	if (findResult === 'not found') {
		errorNotFindCountry();
	} else if (findResult.Country !== 'not found') {
		createRegionElement(findCountryData(findCountry));
	}
});

const cleanCountry = document.querySelector('#cleanCountry');
cleanCountry.addEventListener("click", function (event) {
	findCountry = '';
	updateView();
	document.querySelector('#findCountry').value = '';
});

function errorNotFindCountry() {
	const divRegionsData = document.querySelector('#region');
	const divRegionsBlockOne = document.createElement("div");
	divRegionsBlockOne.classList.add("blockOneCountry");
	const divRegionDetails = document.createElement("div");
	divRegionDetails.classList.add("propertiesCountry");

	const pCountryName = document.createElement("p");
	pCountryName.classList.add("cdr");
	pCountryName.innerHTML = 'Error! Not found country. Write country again.';

	divRegionsBlockOne.appendChild(pCountryName);
	divRegionsBlockOne.appendChild(divRegionDetails);
	divRegionsData.appendChild(divRegionsBlockOne);
}