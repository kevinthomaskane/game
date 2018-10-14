const ball = document.querySelector(".ball");
const container = document.querySelector(".container");
const blocks = [...document.querySelectorAll(".block")];

class Game {
  constructor(y, transition, el) {
    this.y = y;
    this.transition = transition;
    this.el = el;
    this.keydown = false;
    this.keyup = true;
    this.initialize();
  }
  initialize() {
    document.body.onkeydown = e => {
      if (e.keyCode == 32) {
        this.goUp(this.y, this.transition);
        this.keydown = true;
      }
    };
    document.body.onkeyup = e => {
      while (this.y > 1) {
        this.y--;
        this.el.setAttribute(
          "style",
          `bottom: ${this.y}%; transition: ${1000}ms all ease-in-out;`
        );
      }
    };
  }
  goUp(y, transition) {
    this.y = this.keydown === false ? y + 30 : y * 100;
    this.transition = transition / (transition * 2.5);
    this.y > 99 ? (this.y = 95) : null;
    this.el.setAttribute(
      "style",
      `bottom: ${this.y}%; transition: ${this.transition}s all ease-in-out`
    );
  }
  fall() {
    this.y = 1;
    this.transition = 1;
    this.el.setAttribute(
      "style",
      `bottom: ${this.y}%; transition: ${this.transition}s all ease-in-out`
    );
  }
}

class Block {
  constructor() {
  }
  create() {
    const bool = Math.random() > .5 ? "top" : "bottom"
    const block = document.createElement("div");
    block.className = "block";
    block.setAttribute(
      "style",
      `width: 100px; background: red; position: absolute; ${bool}: 0; right: -200px; height: ${
        Math.floor(Math.random() * 400 + 10)
      }px; animation: slide 8s infinite`
    );
    container.appendChild(block);
    blocks.push(block);
    setTimeout(() => {
        console.log(blocks[0])
        blocks[0].remove();
        blocks.shift();
    }, 4000);
  }
}

let init = new Game(50, 1, ball);
let block = new Block();
setInterval(() => {
    block.create();
}, 750);
