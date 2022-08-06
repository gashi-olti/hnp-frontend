export interface JobType {
  id: number;
  category: string;
}

export interface JobPositionInterface {
  name: string;
}

export interface JobPositionType {
  id: number;
  category: string;
  job_position: JobPositionInterface[];
}
