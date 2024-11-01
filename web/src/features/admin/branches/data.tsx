import { Option } from "@/interfaces/types";

export const CREATE_BRANCH_FORM_FIELDS = (
  countryOptions: Option[],
  stateOptions: Option[],
  cityOptions: Option[]
) => {
  return [
    {
      label: "Branch Name",
      name: "name",
      placeholder: "Enter branch name",
      type: "text",
    },
    {
      label: "Branch Code",
      name: "code",
      placeholder: "Enter branch code",
      type: "text",
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Enter country",
      type: "dropdown",
      options: countryOptions,
    },
    {
      label: "State",
      name: "state",
      placeholder: "Enter state",
      type: "dropdown",
      options: stateOptions,
    },
    {
      label: "City",
      name: "city",
      placeholder: "Enter city",
      type: "dropdown",
      options: cityOptions,
    },

    {
      label: "Postal Code",
      name: "postalCode",
      placeholder: "Enter postal code",
      type: "text",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "Enter phone number",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter email address",
      type: "email",
    },
    {
      type: "dropdown",
      label: "Manager",
      name: "managerId",
      placeholder: "Select manager",

      options: [],
    },
    {
      label: "Status",
      name: "status",
      placeholder: "Select status",
      type: "dropdown",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Closed", value: "Closed" },
      ],
    },
  ];
};
