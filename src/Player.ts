import GameObject from "./GameObject";
import Vec2 from "./Vec2";

export default class Player extends GameObject {
  constructor(c: CanvasRenderingContext2D, pos: Vec2, rad: number, color: string) {
    super(c, pos, rad, color);
  }
}
