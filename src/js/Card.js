import create from './create';
import { getDataAll } from './Data';

const categoryOfInfo = ['cases', 'deaths', 'recovered', 'tests'];

export default class Modal {
	constructor() {
		this.data = [];
		this.currentCase = 0;
	}

	handleMethods() {
		getDataAll()
			.then((data) => {
				this.data = data;

				this.createCard();
				this.changeNumberInfo();

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
				create('button', 'btn btn-prev card-btn', null, null, [
					'data-toggle',
					'prev',
				]),
				create('div', 'title-text', `Global ${categoryOfInfo[this.currentCase]}`),
				create('button', 'btn btn-next card-btn', null, null, [
					'data-toggle',
					'next',
				]),
			],
			infoContainer
		);
	};

	changeNumberInfo = () => {
		const infoContainer = document.querySelector('.info-container');
		create(
			'div',
			'info-numbers',
			`${this.data.[categoryOfInfo[this.currentCase]]}`,
			infoContainer
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
			this.currentCase += 1;
			if (this.currentCase === categoryOfInfo.length) {
				this.currentCase = 0;
			}
		} else {
			this.currentCase -= 1;
			if (this.currentCase === -1) {
				this.currentCase = categoryOfInfo.length - 1;
			}
    }
    
    title.innerHTML = `Global ${categoryOfInfo[this.currentCase]}`
    this.removeDataInfo();
    this.changeNumberInfo()
	};
}
