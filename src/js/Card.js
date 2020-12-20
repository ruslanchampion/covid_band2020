import create from './create';
import { getDataAll } from './Data';

const categoryOfInfo = ['cases', 'deaths', 'recovered', 'tests'];
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
				this.changeNumberInfo(this.data);

				this.setListeners();
			})
			.catch((err) => alert(err));

		return this;
	}

	setListeners() {
		const toggleBtns = document.querySelectorAll('.card-btn');

		toggleBtns.forEach((btn) => btn.addEventListener('click', this.switchCase));
	}

	createCard = () => {
		const infoContainer = document.querySelector('.info-container');

		create(
			'div',
			'title',
			[
				create('button', 'btn btn-prev card-btn', null, null, ['data-toggle', 'prev']),
				create('div', 'title-text', `Global ${categoryOfInfo[this.currentNumberOfCategory]}`),
				create('button', 'btn btn-next card-btn', null, null, ['data-toggle', 'next']),
			],
			infoContainer
		);
	};
	// !TODO change name of method

	changeNumberInfo = (data) => {
		const infoContainer = document.querySelector('.info-container');

		if (data) {
			this.selectedCountry = data;
		}

		create(
			'div',
			'info-numbers',
			this.changeDisplayOfNumbers(
				this.selectedCountry[categoryOfInfo[this.currentNumberOfCategory]]
			),
			infoContainer,
			['data-color', `${colorOfNumbers[this.currentNumberOfCategory]}`]
		);
	};

	removeDataInfo = () => {
		const info = document.querySelector('.info-numbers');
		info.remove();
	};

	switchCase = (event) => {
		const { currentTarget } = event;
		const value = currentTarget.dataset.toggle;
		const title = document.querySelector('.title-text');

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

		title.innerHTML = `Global ${categoryOfInfo[this.currentNumberOfCategory]}`;

		this.removeDataInfo();
		this.changeNumberInfo();
	};

	changeDisplayOfNumbers = (number) => number.toLocaleString();
}
