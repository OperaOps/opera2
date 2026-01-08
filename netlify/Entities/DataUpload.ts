// Stub for DataUpload entity
export interface DataUpload {
  file_name: string;
  file_url?: string;
  data_type?: string;
  processing_status?: string;
  id?: string | number;
}

export class DataUpload {
  constructor(data?: Partial<DataUpload>) {
    Object.assign(this, data);
  }
}

