import GameObject from "./GameObject";
import Vec2 from "./Vec2";
import { gsap } from "gsap";

export default class Enemy extends GameObject {
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

  update() {
    this.pos.x += this.vel.x * this.speed;
    this.pos.y += this.vel.y * this.speed;

    this.draw();
  }

  hit() {
    gsap.to(this, { rad: this.rad - 10 });
  }
}
