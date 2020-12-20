import create from './create';
import { getDataCountries } from './Data';
import Card from './Card';

const tableTitle = [
	'Cases by country',
	'Tests by country',
	'Death by country',
	'Recovered by country',
];

const dataCases = ['cases', 'tests', 'deaths', 'recovered'];

const colorOfNumbers = ['red', 'aqua', 'black', 'green'];

export default class Table {
	constructor() {
		this.data = [];
		this.currentCase = 0;
		this.isData = false;
		this.inputValue = '';
		this.card = new Card();
	}

	handleMethods() {
		const input = document.querySelector('.search-input');

		getDataCountries()
			.then((data) => {
				this.data = data;

				if (this.data.length > 0) {
					input.removeAttribute('disabled');
				}

				this.createTable();

				this.setTableData(this.data);

				this.setListeners();
			})
			.catch((err) => alert(err));

		this.card.handleMethods();

		return this;
	}

	setListeners() {
		const input = document.querySelector('.search-input');
		const toggleBtns = document.querySelectorAll('.table-btn');
		const statCountries = document.querySelectorAll('.statistic-country');

		input.addEventListener('input', this.filterSearch);

		toggleBtns.forEach((btn) => btn.addEventListener('click', this.switchCase));

		statCountries.forEach((country) => {
			country.addEventListener('click', this.handleCountry);
		});
	}

	removeListeners() {
		const input = document.querySelector('.search-input');
		const toggleBtns = document.querySelectorAll('.table-btn');
		const statCountries = document.querySelectorAll('.statistic-country');

		input.removeEventListener('input', this.filterSearch);

		toggleBtns.forEach((btn) => btn.removeEventListener('click', this.switchCase));

		statCountries.forEach((country) => {
			country.removeEventListener('click', this.handleCountry);
		});
	}

	createTable = () => {
		const tableContainer = document.querySelector('.table-container');

		create(
			'table',
			'table-1 table-hover table-dark',
			[
				create('thead', 'thead', [
					create('tr', null, [
						create('button', 'btn btn-prev table-btn', '', null, ['data-toggle', 'prev']),
						create('span', 'table-title', `${tableTitle[this.currentCase]}`),
						create('button', 'btn btn-next table-btn', '', null, ['data-toggle', 'next']),
					]),
				]),
			],
			tableContainer
		);
	};

	setTableData(data = this.data) {
		const table = document.querySelector('.table-1');
		const tbody = create('tbody', 'tbody', null, table);

		const sortData = this.sortData(data);
		console.log(sortData);

		sortData.forEach((element) => {
			create(
				'tr',
				'statistic-country',
				[
					create(
						'td',
						'count-of-cases',
						this.changeDisplayOfNumbers(element[dataCases[this.currentCase]]),
						null,
						['data-color', `${colorOfNumbers[this.currentCase]}`]
					),
					create('td', 'country', `${element.country}`),
					create('td', null, [
						create('img', 'country-flag', null, null, [
							'src',
							`${this.isBelarus(element.countryInfo.flag)}`,
						]),
					]),
				],
				tbody,
				['data-country', `${element.country}`]
			);
		});
	}

	removeTableData = () => {
		const removeData = document.querySelector('.tbody');
		removeData.remove();
	};

	sortData(data) {
		data.sort((a, b) => (a[dataCases[this.currentCase]] < b[dataCases[this.currentCase]] ? 1 : -1));
		return data;
	}

	filterData = () => this.data.filter((el) => el.country.toLowerCase().includes(this.inputValue));

	filterSearch = (event) => {
		this.inputValue = event.target.value.toLowerCase();

		console.log(this.filterData());

		this.removeTableData();
		this.removeListeners();

		this.setTableData(this.filterData());
		this.setListeners();
	};

	switchCase = (event) => {
		const title = document.querySelector('.table-title');

		const { currentTarget } = event;
		console.log(currentTarget.dataset.toggle);

		const value = currentTarget.dataset.toggle;

		if (value === 'next') {
			this.currentCase += 1;
			if (this.currentCase === tableTitle.length) {
				this.currentCase = 0;
			}
		} else {
			this.currentCase -= 1;
			if (this.currentCase === -1) {
				this.currentCase = tableTitle.length - 1;
			}
		}

		title.innerHTML = `${tableTitle[this.currentCase]}`;

		this.removeTableData();
		this.removeListeners();

		if (this.inputValue === '') {
			this.setTableData();
		} else {
			this.setTableData(this.filterData());
		}

		this.setListeners();
	};

	handleCountry = (event) => {
		const { currentTarget } = event;
		const data = this.data.find((item) => item.country === currentTarget.dataset.country);
		console.log(data);

		this.card.removeDataInfo();
		this.card.changeNumberInfo(data);
	};

	changeDisplayOfNumbers = (number) => number.toLocaleString();

	isBelarus = (src) => {
		if (src.includes('by.png')) {
			return 'img/by.png';
		}
		return src;
	};
}
