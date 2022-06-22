import GameObject from "./GameObject";
import Vec2 from "./Vec2";

export default class Projectile extends GameObject {
  private speed = 5;

  constructor(
    c: CanvasRenderingContext2D,
    pos: Vec2,
    rad: number,
    color: string,
    private vel: Vec2,
  ) {
    super(c, pos, rad, color);
  }

  update() {
    this.pos.x += this.vel.x * this.speed;
    this.pos.y += this.vel.y * this.speed;

    this.draw();
  }

  isOffscreen(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.pos.x < 0 - this.rad ||
      this.pos.x > canvasWidth + this.rad ||
      this.pos.y < 0 - this.rad ||
      this.pos.y > canvasHeight + this.rad
    );
  }
}
