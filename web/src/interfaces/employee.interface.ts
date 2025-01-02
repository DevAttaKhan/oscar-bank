export interface IEmployee {
  id: number;
  employmentStatus: string;
  employmentType: string;
  employeeCode: string;
  performanceRating: any;
  dateOfJoining: string;
  salary: number;
  bonus: number;
  createdAt: string;
  userId: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export enum EmploymentStatus {
  ACTIVE = "Active",
  ON_LEAVE = "On-Leave",
  RESIGNED = "Resigned",
  TERMINATED = "Terminated",
}

export enum EmploymentType {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}
