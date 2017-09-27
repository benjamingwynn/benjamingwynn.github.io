/* eslint-env browser, es6 */

(function init () {
	"use strict"

	const ONE_SECOND = 10

	class Tag extends String {
		contains (value) {
			return this.indexOf(value) > -1
		}

		isValid () {
			return this.contains("<") && this.contains(">")
		}
	}

	function newEle (html) {
		const tag = new Tag(html)

		return document.createRange().createContextualFragment(tag.isValid() ? tag : `<span>${html}</span>`).children[0]
	}

	function appendEles (target, elements) {
		const fragment = document.createDocumentFragment()
			, nElements = elements.length

		let elementI

		for (elementI = 0; elementI < nElements; elementI += 1) {
			const element = elements[elementI]

			fragment.appendChild(typeof element === "string" ? newEle(element) : element)
		}

		target.appendChild(fragment)
	}

	class CopyWrapper extends HTMLElement {
		connectedCallback () {
			this.wraps = newEle("<div>")

			while (this.childNodes.length > 0) {
				this.wraps.appendChild(this.childNodes[0])
			}

			this.button = newEle("<button type='button' data-tooltip='Copy'>⎘</button>")
			this.input = newEle("<input style='display:none'>")

			this.button.addEventListener("click", (event) => {
				this.input.style.display = "block"
				this.input.value = this.wraps.innerText
				this.input.select()
				document.execCommand("copy")
				this.input.style.display = "none"
			})

			this.innerHTML = ""
			appendEles(this, [this.wraps, this.button, this.input])
		}
	}

	customElements.define("copy-wrapper", CopyWrapper)

	class TimerPart extends HTMLElement {
		// constructor () {
		// 	super()
		// }

		connectedCallback () {
			this.setAttribute("time", 0)
			this.updateHTML()
		}

		static get observedAttributes () {
			return ["time"]
		}

		tick () {
			const newTime = parseInt(this.getAttribute("time"), 10) + 1
				, maxTime = parseInt(this.getAttribute("max-time") || Infinity, 10)

			if (newTime > maxTime) {
				this.reset()

				return
			}

			this.setAttribute("time", newTime)
		}

		reset () {
			this.setAttribute("time", 0)

			if (this.onReset) {
				this.onReset(this)
			}
		}

		updateHTML () {
			this.innerHTML = this.getAttribute("time").padStart(2, "0") + this.getAttribute("post-unit")
		}

		attributeChangedCallback (attribute, oldValue, newValue) {
			if (attribute === "time") {
				this.updateHTML()
			}
		}
	}

	customElements.define("timer-part", TimerPart)

	class TimerBody extends HTMLElement {
		constructor () {
			super()

			this.counterH = newEle("<timer-part post-unit='h ' class='hours'>")
			this.counterM = newEle("<timer-part post-unit='m ' max-time='59' class='mins'>")
			this.counterS = newEle("<timer-part post-unit='s' max-time='59' class='secs'>")

			this.counterS.onReset = () => {
				this.counterM.tick()
			}

			this.counterM.onReset = () => {
				this.counterH.tick()
			}

			appendEles(this, [this.counterH, this.counterM, this.counterS])

			this.addEventListener("click", (event) => {
				if (this.getAttribute("ticking")) {
					this.removeAttribute("ticking")
				} else {
					this.setAttribute("ticking", true)
				}
			})
		}

		static get observedAttributes () {
			return ["ticking"]
		}

		attributeChangedCallback (attribute, oldValue, newValue) {
			// only count real changes
			if (newValue === oldValue) {
				return
			}

			if (attribute === "ticking") {
				if (newValue) {
					this._startTimer()
				} else {
					this._stopTimer()
				}
			}
		}

		onTimer () {
			this.counterS.tick()
		}

		_startTimer () {
			this.timer = setInterval(() => this.onTimer(), ONE_SECOND)
		}

		_stopTimer () {
			clearInterval(this.timer)
		}

		resetCounters () {
			this.counterS.reset()
			this.counterM.reset()
			this.counterH.reset()
		}
	}

	customElements.define("timer-body", TimerBody)

	function createButton (inner, tooltip, clickListener) {
		const control = newEle(`<button type='button' class='timer_control' data-tooltip='${tooltip}'>${inner}</button>`)

		control.addEventListener("click", clickListener)

		return control
	}

	class TimerMain extends HTMLElement {
		connectedCallback () {
			this.copyWrapper = newEle("<copy-wrapper>")
			this.timerBody = newEle("<timer-body></timer-body>")
			this.controls = newEle("<div class='timer_controls'>")

			this.copyWrapper.appendChild(this.timerBody)

			appendEles(this.controls, [
				createButton("▶", "Start", () => {
					this.timerBody.setAttribute("ticking", true)
				}),

				createButton("■", "Stop", () => {
					console.log("stopping!")
					console.log(this.timerBody)
					this.timerBody.removeAttribute("ticking")
				}),

				createButton("⟲", "Reset", () => {
					this.timerBody.removeAttribute("ticking")
					this.timerBody.resetCounters()
				}),

				createButton("✖", "Remove", () => {
					this.remove()
				}),

				newEle("<input type='text'>")
			])

			appendEles(this, [
				this.copyWrapper,
				this.controls,
			])
		}
	}

	customElements.define("timer-add-button", class TimerAddButton extends HTMLElement {
		constructor () {
			super()

			appendEles(this, [createButton("✚", "Add Timer", () => {
				this.parentElement.insertBefore(newEle("<timer-main>"), this)
			})])
		}
	})


	// Timer main must be defined after copy wrapper!
	customElements.define("timer-main", TimerMain)
}())
