export default class Pixel {
    x : number;
    y : number;
    dim : number;
    isOn : boolean;
    bounding : Array<number>;
    ctx : any;

	constructor(x : number, y : number, dim : number, ctx: any) {
		this.x = x;
		this.y = y;
		this.isOn = false;
		this.dim = dim;
		this.bounding = [x, x + dim, y, y + dim];
		this.ctx = ctx;
	}

	draw() {
		if (!this.isOn) {
			this.ctx.fillStyle = '#0d0d0d';
			this.ctx.strokeStyle = '#0d0d0d';
		} else {
			this.ctx.fillStyle = '#d3d3d3';
			this.ctx.strokeStyle = '#d3d3d3'
		}
		this.ctx.beginPath();
		this.ctx.fillRect(this.x, this.y, this.dim, this.dim);
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(this.x, this.y, this.dim, this.dim);
	}
}