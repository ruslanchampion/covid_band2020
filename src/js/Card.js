import create from './create';
import { getDataAll } from './Data';

const categoryOfInfo = ['cases', 'tests', 'deaths', 'recovered'];

const colorOfNumbers = ['red', 'aqua', 'black', 'green'];

export default class Card {
	constructor() {
		this.data = [];
		this.currentNumberOfCategory = 0;
		this.selectedCountry = {};
	}

	handleMethods() {
		getDataAll()
			.then((data) => {
				this.data = data;

				this.createCard();
				this.changeInfoNumbers(this.data);

				this.setListeners();
			})
			.catch((err) => alert(err));

		return this;
	}

	setListeners() {
		const toggleBtns = document.querySelectorAll('.card-btn');

		toggleBtns.forEach((btn) => btn.addEventListener('click', this.switchCase));
	}

	createCard = (country) => {
		const cardContainer = document.querySelector('.card-container');
		let titleText = '';

		if (country) {
			titleText = country;
		} else {
			titleText = 'Global';
		}

		create(
			'div',
			'title',
			[
				create('button', 'btn btn-prev card-btn', null, null, ['data-toggle', 'prev']),
				create('div', 'title-text', `${titleText} ${categoryOfInfo[this.currentNumberOfCategory]}`),
				create('button', 'btn btn-next card-btn', null, null, ['data-toggle', 'next']),
			],
			cardContainer
		);
	};

	changeInfoNumbers = (data) => {
		const cardContainer = document.querySelector('.card-container');

		if (data) {
			this.selectedCountry = data;
			this.countryName = data.country;
		}

		create(
			'div',
			'info-numbers',
			this.changeDisplayOfNumbers(
				this.selectedCountry[categoryOfInfo[this.currentNumberOfCategory]]
			),
			cardContainer,
			['data-color', `${colorOfNumbers[this.currentNumberOfCategory]}`]
		);
	};

	removeDataInfo = () => {
		const info = document.querySelector('.info-numbers');
		info.remove();
	};

	removeTitle = () => {
		const title = document.querySelector('.title');
		title.remove();
	};

	switchCase = (event) => {
		const { currentTarget } = event;
		const value = currentTarget.dataset.toggle;
		const title = document.querySelector('.title-text');
		let titleCase = '';

		if (value === 'next') {
			this.currentNumberOfCategory += 1;
			if (this.currentNumberOfCategory === categoryOfInfo.length) {
				this.currentNumberOfCategory = 0;
			}
		} else {
			this.currentNumberOfCategory -= 1;
			if (this.currentNumberOfCategory === -1) {
				this.currentNumberOfCategory = categoryOfInfo.length - 1;
			}
		}

		if (this.countryName) {
			titleCase = this.countryName;
		} else {
			titleCase = 'Global';
		}

		title.innerHTML = `${titleCase} ${categoryOfInfo[this.currentNumberOfCategory]}`;

		this.removeDataInfo();
		this.changeInfoNumbers();
	};

	changeDisplayOfNumbers = (number) => number.toLocaleString();
}
