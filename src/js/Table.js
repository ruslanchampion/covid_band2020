import create from './create';
import { getData } from './Data';

export default class Table {
	constructor() {
		this.dataCases = [];
		this.searchEnter = '';
	}

	handleMethods() {
		const input = document.querySelector('.search-input');
		getData().then((data) => {
			// !TODO refactor
			data.forEach((item) => this.dataCases.push(item));

			this.createTable();

			this.setTableData(this.dataCases);

			input.addEventListener('keydown', this.filterSearch);
			// console.log(this.dataCases);
		});

		return this;
	}

	createTable = () => {
		const tableContainer = document.querySelector('.table-container');

		create(
			'table',
			'table table-hover table-dark',
			[
				create('thead', null, [
					create('tr', null, [
						create('th', 'table-title', 'Cases by country', null, [
							'colspan',
							3,
						]),
					]),
				]),
			],
			tableContainer
		);
	};

	setTableData(data) {
		const table = document.querySelector('.table');
		const tbody = create('tbody', null, null, table);

		const sortData = this.sortData(data);
		console.log(sortData);

		sortData.forEach((element) => {
			create(
				'tr',
				'statistic-country',
				[
					create('td', 'count-of-cases', `${element.cases}`),
					create('td', 'country', `${element.country}`),
					create('td', null, [
						create('img', 'country-flag', null, null, [
							'src',
							`${element.countryInfo.flag}`,
						]),
					]),
				],
				tbody
			);
		});
	}

	removeTableData = () => {
		const removeData = document.querySelectorAll('.statistic-country');
		removeData.forEach((el) => el.remove());
	};

	sortData(data) {
		data.sort((a, b) => (a.cases < b.cases ? 1 : -1));
		return data;
	}

	filterSearch = (event) => {
		const value = event.target.value.toLowerCase();

		const filterArr = this.dataCases.filter((el) =>
			el.country.toLowerCase().includes(value)
		);

		console.log(filterArr);
		this.removeTableData();
		this.setTableData(filterArr);
	};
}
