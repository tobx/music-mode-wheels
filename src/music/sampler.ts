import type { Instrument, Library } from "./library";

import { Player } from "@/utilities/audio";

export type NotePattern = { note: string; delay: number }[];

export class Sampler {
  private player = new Player();

  private buffers: { [note: string]: AudioBuffer } = {};

  constructor(private library: Library) {}

  async load(instrument: Instrument) {
    this.buffers = {};
    const samples = await this.library.loadSamples(instrument);
    for (const { note, buffer } of samples) {
      this.buffers[note] = buffer;
    }
  }

  playNote(note: string, when?: number, offset?: number, duration?: number) {
    const buffer = this.buffers[note];
    if (buffer === undefined) {
      throw new Error("Buffer '" + note + "' not found.");
    }
    if (buffer !== undefined) {
      this.player.play(buffer, when, offset, duration);
    }
  }

  playPattern(pattern: NotePattern, offset: number = 0.01) {
    let when = this.player.currentTime + offset;
    for (const { note, delay } of pattern) {
      when += delay;
      this.playNote(note, when);
    }
  }
}
