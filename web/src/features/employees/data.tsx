import {
  EmploymentStatus,
  EmploymentType,
} from "@/interfaces/employee.interface";
import { Option } from "@/interfaces/types";
import { UserStatus } from "@/interfaces/user.interface";
import { transformEnumToOption } from "@/lib/utils/common.util";

export const UPSERT_EMPLOYEE_FORM_FIELDS = (
  designationsAsOptions: Option[],
  branchesAsOptions: Option[],
  employeesAsOptions: Option[]
) => {
  return [
    {
      label: "Username",
      name: "username",
      placeholder: "Enter username",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      type: "text",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "Enter phone number",
      type: "text",
    },
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter first name",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter last name",
      type: "text",
    },
    {
      label: "CNIC",
      name: "cnic",
      placeholder: "Enter CNIC",
      type: "text",
    },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      placeholder: "Select date of birth",
      type: "date",
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter address",
      type: "text",
    },

    {
      label: "Status",
      name: "status",
      placeholder: "Select status",
      type: "dropdown",
      options: transformEnumToOption(UserStatus),
    },
    {
      label: "Employment Status",
      name: "employmentStatus",
      placeholder: "Select employment status",
      type: "dropdown",
      options: transformEnumToOption(EmploymentStatus),
    },
    {
      label: "Employment Type",
      name: "employmentType",
      placeholder: "Select employment type",
      type: "dropdown",
      options: transformEnumToOption(EmploymentType),
    },
    {
      label: "Date of Joining",
      name: "dateOfJoining",
      placeholder: "Select date of joining",
      type: "date",
    },
    {
      label: "Salary",
      name: "salary",
      placeholder: "Enter salary",
      type: "text",
    },
    {
      label: "Bonus",
      name: "bonus",
      placeholder: "Enter bonus amount",
      type: "text",
    },
    {
      label: "Designation",
      name: "designationId",
      placeholder: "Select designation",
      type: "combobox",
      options: designationsAsOptions,
    },
    {
      label: "Assigned Branch",
      name: "assignedBranchId",
      placeholder: "Assign branch",
      type: "combobox",
      options: branchesAsOptions,
    },
    {
      label: "Supervisor",
      name: "supervisorId",
      placeholder: "Assign supervisor",
      type: "combobox",
      options: employeesAsOptions,
    },
  ];
};
