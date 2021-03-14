import { animationFrame } from "./animation";

// Safari 14.0.2 supports `AudioContext` with `webkit` prefix only.
const AudioContext: typeof window.AudioContext =
  window.AudioContext ?? window.webkitAudioContext;

export function createAudioContext() {
  if (AudioContext === undefined) {
    throw new Error("AudioContext is not supported.");
  }
  return new AudioContext();
}

export class Decoder {
  private context = createAudioContext();

  async decode(encoded: ArrayBuffer) {
    // Safari 14.0.2 does not return a Promise when calling `decodeAudioData`.
    return new Promise<AudioBuffer>((resolve, reject) => {
      this.context.decodeAudioData(encoded, resolve, reject);
    });
  }
}

export async function ended(source: AudioBufferSourceNode) {
  await new Promise((resolve) => source.addEventListener("ended", resolve));
}

export class Player {
  private context = createAudioContext();

  private gainNode: GainNode;

  private sources: Set<AudioBufferSourceNode> = new Set();

  private timers: Set<Timer> = new Set();

  constructor() {
    this.gainNode = this.createGain();
  }

  get currentTime() {
    return this.context.currentTime;
  }

  createGain() {
    const gainNode = this.context.createGain();
    gainNode.connect(this.context.destination);
    return gainNode;
  }

  setTimer(when: number, callback: () => void) {
    const timer = new Timer(this.context, when);
    this.timers.add(timer);
    timer.start(() => {
      this.timers.delete(timer);
      callback();
    });
  }

  // fade out to prevent clicking
  async stop(fadeDuration = 0.04, fadeToDecibel = -96, latency = 0.01) {
    this.timers.forEach((timer) => timer.stop());
    this.timers.clear();
    const startTime = this.context.currentTime + latency;
    const stopTime = startTime + fadeDuration;
    const timeConstant = (fadeDuration * 20) / (fadeToDecibel * -Math.log(10));
    this.gainNode.gain.setTargetAtTime(0, startTime, timeConstant);
    this.gainNode = this.createGain();
    const playback = [...this.sources].map(async (source) => {
      source.stop(stopTime);
      await ended(source);
    });
    await Promise.all(playback);
  }

  async play(
    buffer: AudioBuffer,
    when?: number,
    offset?: number,
    duration?: number
  ) {
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.gainNode);
    this.sources.add(source);
    source.start(when, offset, duration);
    await ended(source);
    this.sources.delete(source);
    source.disconnect();
  }
}

export class Timer {
  private requestId = 0;

  constructor(private context: AudioContext, private when: number) {}

  stop() {
    window.cancelAnimationFrame(this.requestId);
  }

  async start(callback: () => void) {
    this.stop();
    while (this.context.currentTime < this.when) {
      await animationFrame((id) => (this.requestId = id));
    }
    callback();
  }
}
