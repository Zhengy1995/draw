export default class Draw {
	color = ['#ccc', '#FF00FF', '#00BFFF', '#D4F2E7', '#FF1493', '#DC143C', '#FFC0CB', '#FFFF00', '#D2691E', '#FF4500', '#A52A2A' ]
	constructor(element) {
		const parent = document.getElementById(element)
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
		this.canvas = canvas
		this.parent = parent
		this.ctx = canvas.getContext('2d')
		this.operDiv = operDiv
		this.moveDrawfn = this.moveDrawfn.bind(this)
		this.startDrawnfn = this.startDrawnfn.bind(this)
		this.moveEraserfn = this.moveEraserfn.bind(this)
		this.startEraserfn = this.startEraserfn.bind(this)
	}
	startDrawing() {
		this.stopEraser()
		this.ctx.beginPath()
		this.operDiv.addEventListener('touchstart', this.startDrawnfn)
		this.operDiv.addEventListener('touchmove', this.moveDrawfn)
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
		// this.ctx.strokeStyle = this.color[Math.floor(Math.random() * 10)]
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
	stopDrawing() {
		this.operDiv.removeEventListener('touchmove', this.moveDrawfn)
		this.operDiv.removeEventListener('touchstart', this.startDrawnfn)
		this.stopEraser()
	}
	clearCanvas() {
		this.stopEraser()
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
		this.ctx.fillStyle = '#fff'
    	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}
	startEraser() {
		this.stopDrawing()
		this.operDiv.addEventListener('touchstart', this.startEraserfn)
		this.operDiv.addEventListener('touchmove', this.moveEraserfn)
	}
	stopEraser() {
		this.operDiv.removeEventListener('touchstart', this.startEraserfn)
		this.operDiv.removeEventListener('touchmove', this.moveEraserfn)
	}

}
