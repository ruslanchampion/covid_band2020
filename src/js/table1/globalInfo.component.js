import { objTotalConfirmed, typeTimeView } from './data.component.js';

export function fillGlobalInfo() {
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