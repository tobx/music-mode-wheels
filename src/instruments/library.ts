import { Decoder } from "@/utilities/audio";
import type { LibraryIndex } from "@/config/types";
import { joinPaths } from "@/utilities/path";

export type Instrument = {
  id: string;
  name: string;
  tempi: number[];
};

export type InstrumentPreset = {
  id: string;
  tempo: number;
};

type SampleIndex = {
  note: string;
  bytes: number;
}[];

export class Library {
  private decoder = new Decoder();

  constructor(private url: string, private index: LibraryIndex) {}

  getUrl({ id, tempo }: InstrumentPreset) {
    const samples = this.index[id]?.presets.find(({ tempo: t }) => t === tempo);
    if (samples === undefined) {
      const message = `Cannot find tempo '${tempo}' for instrument id '${id}'.`;
      throw new Error(message);
    }
    return joinPaths(this.url, samples.path);
  }

  get instruments(): Instrument[] {
    return Object.keys(this.index).map((id) => this.getInstrument(id)!);
  }

  hasPreset({ id, tempo }: InstrumentPreset) {
    return this.getInstrument(id)?.tempi.includes(tempo);
  }

  getInstrument(id: string): Instrument | undefined {
    if (this.index.hasOwnProperty(id)) {
      const { name, presets } = this.index[id];
      return { id, name, tempi: presets.map((s) => s.tempo) };
    }
  }

  async loadSamples(instrument: InstrumentPreset) {
    const url = this.getUrl(instrument);
    const [index, samples] = await Promise.all([
      this.loadSampleIndex(url),
      this.loadSampleFile(url),
    ]);
    let begin = 0;
    const decodingJobs = index.map(async ({ note, bytes }) => {
      const end = begin + bytes;
      const encoded = samples.slice(begin, end);
      begin = end;
      return { note, buffer: await this.decoder.decode(encoded) };
    });
    return Promise.all(decodingJobs);
  }

  async loadSampleIndex(url: string): Promise<SampleIndex> {
    const response = await fetch(joinPaths(url, "index.json"));
    return response.json();
  }

  async loadSampleFile(url: string) {
    const response = await fetch(joinPaths(url, "samples.bin"));
    return response.arrayBuffer();
  }
}
