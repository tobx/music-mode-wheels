export async function animationFrame(idHandler: (id: number) => void) {
  return await new Promise<number>((resolve) => {
    idHandler(window.requestAnimationFrame(resolve));
  });
}

export class AnimationLoop {
  public update = (value: number) => {};

  private duration = 0;

  private startTime = 0;

  private requestId = 0;

  start(duration: number) {
    this.startTime = window.performance.now();
    this.duration = duration;
    this.stop();
    this.loop();
    return this.startTime;
  }

  stop() {
    window.cancelAnimationFrame(this.requestId);
  }

  async loop() {
    const time = await animationFrame((id) => (this.requestId = id));
    const elapsedTime = time - this.startTime;
    if (elapsedTime < this.duration) {
      this.update(elapsedTime / this.duration);
      this.loop();
    } else {
      this.update(1);
    }
  }
}
