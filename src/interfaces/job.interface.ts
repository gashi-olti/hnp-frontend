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

export interface JobModel {
  uuid: string;
  title: string;
  description: string;

  new_post?: boolean | null;
}
