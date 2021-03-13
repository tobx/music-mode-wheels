import type { InstrumentPreset, Library } from "./library";

import { Player } from "@/utilities/audio";

export type NotePattern = { note: string; delay: number }[];

export class Sampler {
  private player = new Player();

  private buffers: { [note: string]: AudioBuffer } = {};

  constructor(private library: Library, private latency = 0.01) {}

  async load(instrument: InstrumentPreset) {
    await this.unload();
    const samples = await this.library.loadSamples(instrument);
    for (const { note, buffer } of samples) {
      this.buffers[note] = buffer;
    }
  }

  async playNote(
    note: string,
    when?: number,
    offset?: number,
    duration?: number
  ) {
    const buffer = this.buffers[note];
    if (buffer !== undefined) {
      await this.player.play(buffer, when, offset, duration);
    }
  }

  async playPattern(pattern: NotePattern) {
    let when = this.player.currentTime + this.latency;
    const playbacks = pattern.map(async ({ note, delay }) => {
      when += delay;
      await this.playNote(note, when);
    });
    await Promise.all(playbacks);
  }

  async stop() {
    await this.player.stop();
  }

  async unload() {
    this.buffers = {};
    await this.stop();
  }
}
