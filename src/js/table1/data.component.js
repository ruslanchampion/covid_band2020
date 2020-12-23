import { updateView } from './search.component.js';

let objTotalConfirmed = {}
let typeTimeView = 'Total';
let typeAmount = 'absolute';
let findCountry = '';

function getTotalConfirmed() {
	fetch("http://api.covid19api.com/summary")
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
	fetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag")
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

export { objTotalConfirmed, typeTimeView, typeAmount, findCountry, objPopulation };