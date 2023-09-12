const INITIAL_VELOCITY = 0.025;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }
  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x") //unsere x Koordinate und y Koordinate sind in styles als computed properties definiert.
    );
  }
  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }
  boundingClientRect() {
    return this.ballElement.getBoundingClientRect(); //The getBoundingClientRect() method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect?retiredLocale=de
  }
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = {
      x: 0,
    }; //Richtung für Ballbewegung

    while (
      Math.abs(this.direction.x) <=
        0.2 /*wir können negative Zahlen erhalten daher absolute*/ ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      //rotation
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }
  update(delta) {
    this.x += this.direction.x * this.velocity * delta; //https://youtu.be/PeY6lXPrPaA?t=1428, https://youtu.be/yGhfUcPjXuE?t=211
    this.y += this.direction.y * this.velocity * delta; //wenn delta größer ist(längere Ladezeit von Update) dann ist unsere Bewegung auch größer und umgekehrt.
    const boundingClientRect = this.boundingClientRect();
    console.log(boundingClientRect);
    if (
      boundingClientRect.bottom >= window.innerHeight ||
      boundingClientRect.top <= 0
    ) {
      this.direction.y *= -1;
    }
    if (
      boundingClientRect.right >= window.innerWidth ||
      boundingClientRect.left <= 0
    ) {
      this.direction.x *= -1;
    }
  }
}
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
