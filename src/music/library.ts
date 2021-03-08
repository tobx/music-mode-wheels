import { Decoder } from "@/utilities/audio";
import { joinPaths } from "@/utilities/path";

type Index = {
  [name: string]: {
    [tempo: string]: string;
  };
};

type SampleIndex = {
  note: string;
  bytes: number;
}[];

export type Instrument = {
  name: string;
  tempo: string;
};

export class Library {
  private decoder = new Decoder();

  constructor(private url: string, public index: Index) {}

  async loadSamples({ name, tempo }: Instrument) {
    const url = joinPaths(this.url, this.index[name][tempo]);
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

  static async load(url: string) {
    const response = await fetch(joinPaths(url, "index.json"));
    const index: Index = await response.json();
    return new Library(url, index);
  }
}
