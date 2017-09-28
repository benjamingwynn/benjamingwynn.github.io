/* eslint-env browser, es6 */

(function init () {
	"use strict"

	const ONE_SECOND = 1000

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

	customElements.define("drag-wrapper", class DragWrapper extends HTMLElement {
		connectedCallback () {
			const that = this

			function mousemove () {
				if (window.mouse && window.mouseTarget === that) {
					that.setAttribute("moving", true)

					// document.querySelectorAll("drag-wrapper").forEach((dw) => {
					// 	dw.removeAttribute("inserting")
					// })
				} else if (!window.mouse) {
					if (that.hasAttribute("moving")) {
						that.removeAttribute("moving")
						that.style.top = "0px"

						const insert = document.querySelector("drag-wrapper[inserting]")

						// that.insertAfter(insert)
						console.log(that)
						if (insert) {
							if (insert !== that.previousSibling) {
								that.parentNode.insertBefore(that, insert.nextSibling)
							}

							insert.removeAttribute("inserting")
						}
					}
				}

				if (that.getAttribute("moving")) {
					// console.log("targetting wrapper")
					that.style.top = `${window.mouse.clientY - window.mouseDown.clientY}px`

					let closest, closestDist

					closestDist = Infinity

					const allWrappers = document.querySelectorAll("drag-wrapper")

					// loop through all other drag wrappers that aren't this drag wrapper
					allWrappers.forEach((dw) => {
						if (dw !== that) {
							const rect = dw.getBoundingClientRect()
								, dist = Math.abs(window.mouse.clientY - rect.bottom)

							if (dist < closestDist) {
								closest = dw
								closestDist = dist
							}
						}
					})

					allWrappers.forEach((dw) => {
						dw.removeAttribute("inserting")
					})

					if (closest) {
						closest.setAttribute("inserting", true)
					}
				}

				requestAnimationFrame(mousemove)
			}

			mousemove()
		}
	})

	document.addEventListener("mousedown", (event) => {
		window.mouse = event
		window.mouseTarget = event.target
		window.mouseDown = event
	})

	document.addEventListener("mousemove", (event) => {
		if (window.mouse) {
			window.mouse = event
		}
	})

	document.addEventListener("mouseup", (event) => {
		delete window.mouse
	})

	class CopyWrapper extends HTMLElement {
		connectedCallback () {
			if (this.hasBeenConnected) {
				return
			}

			this.hasBeenConnected = true

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
		constructor () {
			super()
			this.setAttribute("time", 0)

			this.addEventListener("animationend", (event) => {
				if (this.lastAnimation !== event.animationName && (event.animationName === "tick" || event.animationName === "tock")) {
					this.lastAnimation = event.animationName

					if (this.hasAttribute("tock")) {
						this.removeAttribute("tock")
					}

					if (this.hasAttribute("tick")) {
						this.removeAttribute("tick")
						this._inc()
						this.setAttribute("tock", true)
					}
				}
			})
		}

		connectedCallback () {
		}

		_inc () {
			const newTime = parseInt(this.getAttribute("time"), 10) + (this.backwardsOnce ? -1 : 1)
				, maxTime = parseInt(this.getAttribute("max-time") || Infinity, 10)

			this.backwardsOnce = false

			if (newTime > maxTime) {
				this.reset()

				return
			}

			this.setAttribute("time", newTime)
		}

		tick () {
			if (this.hasAttribute("tick") || this.hasAttribute("tock")) {
				window.requestAnimationFrame(() => this.tick())
			} else {
				this.setAttribute("tick", true)
			}
		}

		untick () {
			if (parseInt(this.getAttribute("time"), 10) <= 0) {
				return
			}

			if (this.hasAttribute("tick") || this.hasAttribute("tock")) {
				window.requestAnimationFrame(() => this.untick())
			} else {
				this.backwardsOnce = true
				this.setAttribute("tick", true)
			}
		}

		reset () {
			this.setAttribute("time", 0)

			if (this.onReset) {
				this.onReset(this)
			}
		}

		static get observedAttributes () {
			return ["time", "n-figures"]
		}

		attributeChangedCallback (attribute, oldValue, newValue) {
			if (attribute === "time" || attribute === "n-figures") {
				if (this.hasAttribute("time")) {
					this.innerHTML = this.getAttribute("time").padStart(this.getAttribute("n-figures") || 1, "0") + this.getAttribute("post-unit")
				}
			}
		}
	}

	customElements.define("timer-part", TimerPart)

	class TimerBody extends HTMLElement {
		constructor () {
			super()

			this.counterH = newEle("<timer-part n-figures='2' post-unit='h ' class='hours'>")
			this.counterM = newEle("<timer-part n-figures='2' post-unit='m ' max-time='59' class='mins'>")
			this.counterST = newEle("<timer-part n-figures='1' post-unit='' max-time='5'>")
			this.counterSU = newEle("<timer-part n-figures='1' post-unit='' max-time='9'>")

			this.counterST.onReset = () => {
				this.counterM.tick()
			}

			this.counterSU.onReset = () => {
				this.counterST.tick()
			}

			this.counterM.onReset = () => {
				this.counterH.tick()
			}

			appendEles(this, [this.counterH, this.counterM, this.counterST, this.counterSU, "s"])

			this.addEventListener("click", (event) => {
				if (this.getAttribute("ticking")) {
					this.removeAttribute("ticking")
				} else {
					this.setAttribute("ticking", true)
				}
			})

			this.addEventListener("animationend", (event) => {
				if (this.lastAnimation !== event.animationName && (event.animationName === "ff-tick" || event.animationName === "ff-tock")) {
					this.lastAnimation = event.animationName

					if (this.hasAttribute("ff-tock")) {
						this.removeAttribute("ff-tock")
					}

					if (this.hasAttribute("ff-tick")) {
						this.removeAttribute("ff-tick")
						if (this.hasAttribute("reset")) {
							this._resetCounters()
							this.removeAttribute("reset", true)
						} else {
							this._fastForward()
						}

						this.setAttribute("ff-tock", true)
					}
				}
			})
		}

		static get observedAttributes () {
			return ["ticking", "timestamp"]
		}

		_fastForward () {
			const diff = Math.ceil((Date.now() - parseFloat(this.getAttribute("timestamp"))) / ONE_SECOND)
				, hours = Math.floor(diff / 3600)
				, mins = Math.floor(diff / 60) % 60
				, seconds = diff % 60
				, secondTens = Math.floor(seconds / 10)
				, secondUnits = seconds % 10

			console.warn("Fast-forward", hours, ":", mins, ":", secondTens, secondUnits)

			this.counterSU.setAttribute("time", secondUnits)
			this.counterST.setAttribute("time", secondTens)
			this.counterM.setAttribute("time", mins)
			this.counterH.setAttribute("time", hours)
		}

		_resetCounters () {
			this.counterSU.setAttribute("time", 0)
			this.counterST.setAttribute("time", 0)
			this.counterM.setAttribute("time", 0)
			this.counterH.setAttribute("time", 0)
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

			if (attribute === "timestamp" && newValue) {
				const diff = Math.ceil((Date.now() - newValue) / ONE_SECOND)

				if (diff) {
					console.warn("Unexpected timestamp changed!", diff)
					this.setAttribute("ff-tick", true)
				}
			}
		}

		reset () {
			if (!this.hasAttribute("ff-tock") && !this.hasAttribute("ff-tick") && !this.hasAttribute("reset")) {
				this.setAttribute("reset", true)
				this.setAttribute("ff-tick", true)
			}
		}

		onTimer () {
			this.counterSU.tick()
		}

		_startTimer () {
			this.timer = setInterval(() => this.onTimer(), ONE_SECOND)
			this.setAttribute("timestamp", Date.now())
			this.setAttribute("last-h", this.counterH.getAttribute("time"))
			this.setAttribute("last-m", this.counterM.getAttribute("time"))
			this.setAttribute("last-st", this.counterST.getAttribute("time"))
			this.setAttribute("last-su", this.counterSU.getAttribute("time"))
		}

		_stopTimer () {
			clearInterval(this.timer)
			this.removeAttribute("timestamp")
			this.removeAttribute("last-h")
			this.removeAttribute("last-m")
			this.removeAttribute("last-st")
			this.removeAttribute("last-su")
		}
	}

	customElements.define("timer-body", TimerBody)

	function createButton (inner, tooltip, clickListener) {
		const control = newEle(`<button type='button' class='timer_control' data-tooltip='${tooltip}'>${inner}</button>`)

		control.addEventListener("click", clickListener)

		return control
	}

	class TimerMain extends HTMLElement {
		constructor () {
			super()

			this.copyWrapper = newEle("<copy-wrapper>")
			this.timerBody = newEle("<timer-body></timer-body>")
			this.controls = newEle("<div class='timer_controls'>")

			this.copyWrapper.appendChild(this.timerBody)

			appendEles(this.controls, [
				createButton("▶", "Start", () => {
					this.timerBody.setAttribute("ticking", true)
				}),

				createButton("■", "Stop", () => {
					this.timerBody.removeAttribute("ticking")
				}),

				createButton("-1", "Remove Hour", () => {
					this.timerBody.counterH.untick()
				}),

				createButton("-1", "Remove Minute", () => {
					this.timerBody.counterM.untick()
				}),

				createButton("-1", "Remove Second", () => {
					this.timerBody.counterSU.untick()
				}),

				newEle("<input type='text'>"),

				createButton("+1", "Add Hour", () => {
					this.timerBody.counterH.tick()
				}),

				createButton("+1", "Add Minute", () => {
					this.timerBody.counterM.tick()
				}),

				createButton("+1", "Add Second", () => {
					this.timerBody.counterSU.tick()
				}),

				createButton("⟲", "Reset", () => {
					this.timerBody.removeAttribute("ticking")
					this.timerBody.reset()
				}),

				createButton("✖", "Remove", () => {
					this.parentNode.remove()
				}),

			])

			appendEles(this, [
				newEle("<input type='text'>"),
				this.copyWrapper,
				this.controls,
			])
		}
	}

	customElements.define("timer-add-button", class TimerAddButton extends HTMLElement {
		constructor () {
			super()

			this.innerHTML = ""

			appendEles(this, [createButton("✚", "Add Timer", () => {
				this.parentElement.insertBefore(newEle("<drag-wrapper><timer-main></<drag-wrapper>"), this)
			})])
		}
	})


	// Timer main must be defined after copy wrapper!
	customElements.define("timer-main", TimerMain)

	// click the timer button post-load
	document.querySelector("timer-add-button button").dispatchEvent(new Event("click"))

}())
