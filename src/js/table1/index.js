import '../../style.scss';
import { updateView } from './search.component.js';

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