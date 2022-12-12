/** Dispatch event on click outside of node */
export function clickOutside (element, callbackFunction) {
	// console.log('clickOutside element', element)
	function onClick (event) {
		if (!element.contains(event.target)) {
			callbackFunction()
		}
	}

	document.body.addEventListener('click', onClick)

	return {
		update (newCallbackFunction) {
			callbackFunction = newCallbackFunction
		},
		destroy () {
			document.body.removeEventListener('click', onClick)
		}
	}
}
