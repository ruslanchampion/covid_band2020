export function setValueToStorage(name, value) {
	localStorage.setItem(name, JSON.stringify(value));
}

export function getValueFromStorage(name, substr = null) {
	return JSON.parse(localStorage.getItem(name) || substr);
}

export function delValueFromStorage(name) {
	localStorage.removeItem(name);
}

export function checkLocalStorage(name) {
	if (localStorage.getItem(name) !== null) {
		return true;
	}
	return false;
}
