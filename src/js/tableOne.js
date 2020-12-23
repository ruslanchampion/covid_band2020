let objTotalConfirmed = {}
let typeTimeView = 'Total';
let typeAmount = 'absolute';
let findCountry = '';

function getTotalConfirmed() {
	fetch("https://cors-anywhere.herokuapp.com/http://api.covid19api.com/summary")
		.then(response => response.json())
		.then(data => {
			objTotalConfirmed = data;
			addCountyInfo();
			updateView();
		});
}

function addCountyInfo() {
	let allPopulation = 0;
	for (countryData of objTotalConfirmed.Countries) {
		for (countryInfo of objPopulation) {
			if (countryData.Country === countryInfo.name) {
				countryData.flag = countryInfo.flag;
				countryData.population = countryInfo.population;
				allPopulation += countryInfo.population;
			}
		}
	}
	objTotalConfirmed.Global.population = allPopulation;
}

let objPopulation = {};

function getPopulation() {
	fetch("https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name;population;flag")
		.then(response => response.json())
		.then(data => {
			objPopulation = data;
			console.log(objPopulation);
		})
}

document.addEventListener("DOMContentLoaded", function () {
	getPopulation();
	getTotalConfirmed();
});

const basedOn100thdPopulation = document.querySelector('#basedOn100thdPopulation');
const totalInTheCountry = document.querySelector('#totalInTheCountry');
const perAllTime = document.querySelector('#perAllTime');
const perDay = document.querySelector('#perDay');

basedOn100thdPopulation.addEventListener("click", function (event) {
	basedOn100thdPopulation.classList.add('addVisit');
	totalInTheCountry.classList.remove('addVisit');
	typeAmount = '100thd';
	updateView();
});

totalInTheCountry.addEventListener("click", function (event) {
	totalInTheCountry.classList.add('addVisit');
	basedOn100thdPopulation.classList.remove('addVisit');
	typeAmount = 'absolute';
	updateView();
});

perAllTime.addEventListener("click", function (event) {
	perAllTime.classList.add('addVisit');
	perDay.classList.remove('addVisit');
	typeTimeView = 'Total';
	updateView();
});

perDay.addEventListener("click", function (event) {
	perDay.classList.add('addVisit');
	perAllTime.classList.remove('addVisit');
	typeTimeView = 'New';
	updateView();
});

function fillGlobalInfo() {
	const globalInfo = document.querySelector('#globalInfo');
	let globalInfoText = typeAmount === '100thd' ? 'based on 100thd population' : 'total in the country';
	globalInfo.innerHTML = 'Global ' + globalInfoText;

	let timeText = typeTimeView === 'Total' ? ' per all time' : ' per day';

	const globalAmount__confirmed = document.querySelector('#globalAmount__confirmed');
	globalAmount__confirmed.innerHTML = getTotalConfirmedInfo(objTotalConfirmed.Global) + timeText;

	const globalAmount__deaths = document.querySelector('#globalAmount__deaths');
	globalAmount__deaths.innerHTML = getTotalDeathsInfo(objTotalConfirmed.Global) + timeText;

	const globalAmount__recovered = document.querySelector('#globalAmount__recovered');
	globalAmount__recovered.innerHTML = getTotalRecoveredInfo(objTotalConfirmed.Global) + timeText;
}

function createCountryInfo() {
	for (countryData of objTotalConfirmed.Countries) {
		if (countryData.population) {
			createRegionElement(countryData);
		}
	}
}

function createRegionElement(countryData) {
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

function clearListcountryData() {
	document.querySelector('#region').innerHTML = '';
	document.querySelector('#globalInfo').innerHTML = '';
}

function updateView() {
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