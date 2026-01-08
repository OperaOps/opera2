// Stub for Metric entity
export interface Metric {
  id?: string | number;
  name?: string;
  value?: number;
  unit?: string;
  timestamp?: string;
}

export class Metric {
  constructor(data?: Partial<Metric>) {
    Object.assign(this, data);
  }
}

