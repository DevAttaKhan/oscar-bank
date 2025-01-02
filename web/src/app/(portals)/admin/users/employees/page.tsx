import { IApiError, IApiResponse } from "@/interfaces/types";
import { auth } from "@/auth";
import { EmployeeService } from "@/services/employee.service";
import { EmployeeListingTable } from "@/features/employees/employee-listing-table";
import { IEmployee } from "@/interfaces/employee.interface";

const EmployeesPage = async ({ searchParams }) => {
  const session = await auth();

  const res = await EmployeeService.list({
    params: await searchParams,
    token: session?.user.token,
  });

  if (res.statusCode !== 200) {
    return <h1> {(res as IApiError).message} </h1>;
  }

  return (
    <EmployeeListingTable
      data={(res as IApiResponse<IEmployee>).result.data}
      meta={(res as IApiResponse<IEmployee>).result.meta}
    />
  );
};

export default EmployeesPage;
