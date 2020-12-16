import create from './create';
import { getData } from './Data';

const tableTitle = [
	'Cases by country',
	'Tests by country',
	'Death by country',
	'Recovered by country',
];

const dataCases = ['cases', 'tests', 'deaths', 'recovered'];

export default class Table {
	constructor() {
		this.dataCases = [];
    this.searchEnter = '';
    this.currentCase = 0;
    this.isData = false;
	}

	handleMethods() {
    const input = document.querySelector('.search-input');
    
		getData().then((data) => {
			// !TODO refactor
			data.forEach((item) => {
        this.dataCases.push(item);
        if (this.dataCases.length > 0) {
          input.removeAttribute('disabled');
        }
      });

			this.createTable();

			this.setTableData(this.dataCases);

			this.setListeners();
		}).catch(err => alert(err));

		return this;
	}

  setListeners() {
    const input = document.querySelector('.search-input');
    const btnsSwitch = document.querySelectorAll('.btn');

    input.addEventListener('input', this.filterSearch);
      
    btnsSwitch.forEach((btn) => btn.addEventListener('click', this.switchCase))

  }

	createTable = () => {
		const tableContainer = document.querySelector('.table-container');

		create(
			'table',
			'table table-hover table-dark',
			[
				create('thead', 'thead', [
					create('tr', null, [
						create(
							'th',
							'table-head',
							[
								create('button', 'btn btn-prev', '',null,['data-toggle','prev']),
								create('span', 'table-title', `${tableTitle[this.currentCase]}`),
								create('button', 'btn btn-next', '',null,['data-toggle','next']),
							],
							null,
							['colspan', 3],
							['data-case', `${dataCases[this.currentCase]}`]
						),
					]),
				]),
			],
			tableContainer
		);
	};

	setTableData(data  = this.dataCases) {
		const table = document.querySelector('.table');
		const tbody = create('tbody', 'tbody', null, table);

		const sortData = this.sortData(data);
		console.log(sortData);

		sortData.forEach((element) => {
			create(
				'tr',
				'statistic-country',
				[
					create('td', 'count-of-cases', `${element.[dataCases[this.currentCase]]}`),
					create('td', 'country', `${element.country}`),
					create('td', null, [
						create('img', 'country-flag', null, null, [
							'src',
							`${element.countryInfo.flag}`,
						]),
					]),
				],
				tbody,['data-country',`${element.country}`]
			);
		});
	}

	removeTableData = () => {
		const removeData = document.querySelector('.tbody');
		removeData.remove();
	};

	sortData(data) {
		data.sort((a, b) => (a.[dataCases[this.currentCase]] < b.[dataCases[this.currentCase]] ? 1 : -1));
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
  
  switchCase = (event) => {
    const title = document.querySelector('.table-title');

    const {currentTarget} = event;
    console.log(currentTarget.dataset.toggle);

    const value = currentTarget.dataset.toggle;

    if (value === 'next') {
      this.currentCase += 1;
      if (this.currentCase === tableTitle.length) {
        this.currentCase = 0;
      }
    }else {
      this.currentCase -= 1;
      if (this.currentCase === -1) {
        this.currentCase = tableTitle.length - 1;
      }
    }
    title.innerHTML = `${tableTitle[this.currentCase]}`
    this.removeTableData();
    this.setTableData();
  }

}
