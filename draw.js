export default class Draw {
	constructor(pid) {
		const { parent, canvas, operDiv } = this.getDom(pid)
		this.canvas = canvas
		this.parent = parent
		this.operDiv = operDiv
		this.ctx = canvas.getContext('2d')
		this.moveDrawfn = this.moveDrawfn.bind(this)
		this.startDrawnfn = this.startDrawnfn.bind(this)
		this.moveEraserfn = this.moveEraserfn.bind(this)
		this.startEraserfn = this.startEraserfn.bind(this)
	}
	/**
	 * [getDom getDom generate necessary dom element]
	 * @param  {[string]} pid [parent id]
	 * @return {[Object]}         [necessary dom element]
	 */
	getDom(pid) {
		const parent = document.getElementById(pid)
		const canvas = document.createElement('canvas')
		const operDiv = document.createElement('div')
		canvas.innerText = '您使用的浏览器不支持绘图，请使用chrome'
		const { width, height } = parent.getBoundingClientRect()
		canvas.width = width
		canvas.height = height
		operDiv.setAttribute('class', 'oper_div')
		operDiv.setAttribute('style', `position:relative;width: 100%;height: 100%;top: -${height}px;left: 0;`)
		parent.appendChild(canvas)
		parent.appendChild(operDiv)
		return { parent, canvas, operDiv }
	}
	/**
	 * [startDrawing start drawing line]
	 * @return {[void]}
	 */
	startDrawing() {
		this.stopOperation()
		this.ctx.beginPath()
		this.operDiv.addEventListener('touchstart', this.startDrawnfn)
		this.operDiv.addEventListener('touchmove', this.moveDrawfn)
	}
	startEraser() {
		this.stopOperation()
		this.operDiv.addEventListener('touchstart', this.startEraserfn)
		this.operDiv.addEventListener('touchmove', this.moveEraserfn)
	}
	clearCanvas() {
		this.stopOperation()
		this.ctx.clearRect(0, 0, this.canvas.width,this.canvas.height)
		this.ctx.fillStyle = '#fff'
    	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}
	stopOperation() {
		//drawing event
		this.operDiv.removeEventListener('touchmove', this.moveDrawfn)
		this.operDiv.removeEventListener('touchstart', this.startDrawnfn)
		//eraser event
		this.operDiv.removeEventListener('touchstart', this.startEraserfn)
		this.operDiv.removeEventListener('touchmove', this.moveEraserfn)
	}
	startDrawnfn(e) {
		e.stopPropagation()
		const { clientX, clientY } = e.targetTouches[0]
		this.ctx.beginPath()
		this.ctx.moveTo(clientX, clientY)
		this.ctx.lineWidth = 1.0
		this.ctx.strokeStyle = '#000'
	}
	moveDrawfn(e) {
		e.stopPropagation()
		const { clientX, clientY } = e.targetTouches[0]
		this.ctx.lineTo(clientX, clientY)
		this.ctx.stroke()
	}
	startEraserfn(e) {
		const { clientX, clientY } = e.targetTouches[0]
		this.ctx.clearRect(clientX-5, clientY-5, 10, 10)
	}
	moveEraserfn(e) {
		const { clientX, clientY } = e.targetTouches[0]
		this.ctx.clearRect(clientX-5, clientY-5, 10, 10)
	}

}
