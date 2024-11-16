import { auth } from "@/auth";
import { GroupsListing } from "@/features/settings/groups";
import { IGroup } from "@/interfaces/groups.interface";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { GroupsService } from "@/services/groups.service";

const GroupsPage = async () => {
  const session = await auth();
  const res = await GroupsService.list({ token: session?.user.token });

  if (res.statusCode !== 200) {
    throw new Error((res as IApiError).message);
  }

  return (
    <>
      <GroupsListing groups={(res as IApiResponse<IGroup>).result} />
    </>
  );
};

export default GroupsPage;
