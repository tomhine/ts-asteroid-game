import GameObject from "./GameObject";
import { FRICTION } from "./main";
import Vec2 from "./Vec2";

export default class Particle extends GameObject {
  private alpha = 1;

  constructor(
    c: CanvasRenderingContext2D,
    pos: Vec2,
    rad: number,
    color: string,
    private vel: Vec2,
    private speed: number,
  ) {
    super(c, pos, rad, color);
  }

  draw() {
    this.c.save();
    this.c.globalAlpha = this.alpha;
    this.c.beginPath();
    this.c.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.restore();
  }

  update() {
    this.speed *= FRICTION;
    this.pos.x += this.vel.x * this.speed;
    this.pos.y += this.vel.y * this.speed;
    this.alpha -= 0.01;

    this.draw();
  }

  getAlpha(): number {
    return this.alpha;
  }
}
