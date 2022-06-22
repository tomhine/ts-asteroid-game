import "./style.css";
import Player from "./Player";
import Vec2 from "./Vec2";
import Projectile from "./Projectile";
import Enemy from "./Enemy";
import Particle from "./Particle";

// GLOBAL CONSTS
export const FRICTION = 0.99;

///////// CANVAS SETUP
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

///////// GAME UI
const gameOverUi = document.querySelector("[data-game-over-ui]") as HTMLDivElement;
const restartButton = document.querySelector("[data-restart-button]") as HTMLButtonElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

///////// ENTITY SETUP
const player = new Player(c, new Vec2(canvas.width / 2, canvas.height / 2), 30, "white");
let projectiles: Projectile[] = [];
let enemies: Enemy[] = [];
let particles: Particle[] = [];

c.fillStyle = "rgba(0, 0, 0, 0.1)";
c.fillRect(0, 0, canvas.width, canvas.height);

///////// ANIMATION LOOP

let animationId: number;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();

  // projectile animation
  projectiles.forEach((projectile, index) => {
    projectile.update();

    if (projectile.isOffscreen(canvas.width, canvas.height)) {
      projectiles.splice(index, 1);
    }
  });

  // particle animation
  particles.forEach((particle, index) => {
    if (particle.getAlpha() <= 0.1) {
      particles.splice(index, 1);
    }
    particle.update();
  });

  // enemy animation
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();
    const dist = Math.hypot(
      player.getPos().x - enemy.getPos().x,
      player.getPos().y - enemy.getPos().y,
    );

    if (dist - enemy.getRad() - player.getRad() < 1) {
      cancelAnimationFrame(animationId);
      toggleGameOverUi();
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(
        projectile.getPos().x - enemy.getPos().x,
        projectile.getPos().y - enemy.getPos().y,
      );

      if (dist - enemy.getRad() - projectile.getRad() < 1) {
        // create particles
        for (let i = 0; i < enemy.getRad() * 2; i++) {
          particles.push(
            new Particle(
              c,
              new Vec2(projectile.getPos().x, projectile.getPos().y),
              Math.random() * 2,
              enemy.getColor(),
              new Vec2(Math.random() - 0.5, Math.random() - 0.5),
              Math.random() * 6,
            ),
          );
        }

        enemy.hit();
        if (enemy.getRad() - 10 > 5) {
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

///////// EVENT HANDLERS
window.addEventListener("click", e => {
  const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
  createProjectile(angle);
});

window.addEventListener("touchstart", e => {
  const angle = Math.atan2(
    e.touches[0].clientY - canvas.height / 2,
    e.touches[0].clientX - canvas.width / 2,
  );
  createProjectile(angle);
});

restartButton.addEventListener("click", () => {
  restartGame();
});

///////// FUNCTIONS
function createProjectile(angle: number) {
  const vel = new Vec2(Math.cos(angle), Math.sin(angle));

  const projectile = new Projectile(
    c,
    new Vec2(canvas.width / 2, canvas.height / 2),
    5,
    "white",
    vel,
  );

  projectiles.push(projectile);
}

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.floor(Math.random() * (40 - 5) + 5);
    let pos: Vec2;

    if (Math.random() < 0.5) {
      pos = new Vec2(
        Math.random() < 0.5 ? 0 - radius / 2 : canvas.width + radius / 2,
        Math.random() * canvas.height,
      );
    } else {
      pos = new Vec2(
        Math.random() * canvas.width,
        Math.random() < 0.5 ? 0 - radius / 2 : canvas.height + radius / 2,
      );
    }

    const angle = Math.atan2(canvas.height / 2 - pos.y, canvas.width / 2 - pos.x);
    const vel = new Vec2(Math.cos(angle), Math.sin(angle));
    const color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;

    enemies.push(new Enemy(c, pos, radius, color, vel, Math.random() * (3 - 1) + 1));
  }, Math.random() * (5000 - 1000) + 1000);
}

function toggleGameOverUi() {
  if (gameOverUi.classList.contains("hidden")) {
    gameOverUi.classList.remove("hidden");
  } else {
    gameOverUi.classList.add("hidden");
  }
}

function startGame() {
  projectiles = [];
  enemies = [];
  spawnEnemies();
  animate();
}

function restartGame() {
  toggleGameOverUi();
  startGame();
}

startGame();
