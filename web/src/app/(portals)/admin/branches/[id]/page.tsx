import { CreateBranchForm } from "@/features/branches";

const CreateBranchPage = async ({ params }) => {
  console.log(await params);
  return (
    <>
      <CreateBranchForm />
    </>
  );
};

export default CreateBranchPage;
