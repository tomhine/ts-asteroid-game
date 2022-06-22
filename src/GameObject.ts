import Vec2 from "./Vec2";

export default class GameObject {
  constructor(
    protected c: CanvasRenderingContext2D,
    protected pos: Vec2,
    protected rad: number,
    protected color: string,
  ) {}

  draw() {
    this.c.beginPath();
    this.c.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
    this.c.fillStyle = this.color;
    this.c.fill();
  }

  getPos(): Vec2 {
    return this.pos;
  }

  getRad(): number {
    return this.rad;
  }

  getColor(): string {
    return this.color;
  }
}
