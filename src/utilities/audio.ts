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

export class Player {
  private context = createAudioContext();

  get currentTime() {
    return this.context.currentTime;
  }

  play(buffer: AudioBuffer, when?: number, offset?: number, duration?: number) {
    const source = this.context.createBufferSource();
    source.connect(this.context.destination);
    source.buffer = buffer;
    source.start(when, offset, duration);
  }
}
