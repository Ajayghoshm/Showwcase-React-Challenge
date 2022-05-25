export interface Education {
  degree: string;
  field: string;
  grade: string;
  university: string;
  achivements: Array<string>;
  startDate: Date;
  endDate: Date;
}

export interface EducationItems extends Array<Education> {}

export interface Institution {
  label: string;
  value: string;
}
