// Stub for Appointment entity
export interface Appointment {
  id?: string | number;
  patient_id?: string | number;
  date?: string;
  time?: string;
  appointment_type?: string;
  status?: string;
}

export class Appointment {
  constructor(data?: Partial<Appointment>) {
    Object.assign(this, data);
  }
}

