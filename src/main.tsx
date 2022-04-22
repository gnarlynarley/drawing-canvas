const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const colorsContainer = document.getElementById("colors");
const COLORS = ["#000", "#eee", "#fff"];
let selectedColor = COLORS[0];
const buttons = COLORS.map((color) => {
  const button = document.createElement("button");
  button.type = "button";
  button.addEventListener("pointerdown", () => {
    selectedColor = color;
    console.log(selectedColor);
    buttons.forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
  });
  button.style.setProperty("--color", color);
  colorsContainer.appendChild(button);

  return button;
});
buttons[0].classList.add("is-active");

function scaleCanvas() {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
}

scaleCanvas();
window.addEventListener("resize", scaleCanvas);

let pointerDown = false;
let prevX = null;
let prevY = null;
canvas.addEventListener("pointerdown", () => {
  pointerDown = true;
});
canvas.addEventListener("pointerup", () => {
  pointerDown = false;
  prevX = null;
  prevY = null;
});
canvas.addEventListener("pointermove", (ev) => {
  if (pointerDown) {
    const rect = canvas.getBoundingClientRect();
    let x = ev.clientX;
    let y = ev.clientY;
    x *= canvas.width / rect.width;
    y *= canvas.height / rect.height;
    context.beginPath();
    context.moveTo(prevX ?? x, prevY ?? y);
    context.lineTo(x, y);
    context.strokeStyle = selectedColor;
    context.lineWidth = (ev.pressure ?? 1) * 40;
    context.stroke();
    context.closePath();
    prevX = x;
    prevY = y;
  }
});

export {};

document.body.style.height = `${window.innerHeight}px`;
