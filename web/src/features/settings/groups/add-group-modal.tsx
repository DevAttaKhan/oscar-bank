import { Lucide, Modal } from "@/components/common";
import { Input } from "@/components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createGroupAction } from "@/lib/actions/groups.actions";
import { toast } from "react-toastify";
import { CreateGroupSchema } from "@/lib/schema/groups.schema";
import { IPermission } from "@/interfaces/types";
import { PermissionManager } from "./permission-manager";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  permissionsList?: IPermission[];
};

export const AddGroupModal: React.FC<Props> = ({
  isOpen,
  onClose,
  permissionsList,
}) => {
  const { executeAsync } = useAction(createGroupAction, {
    onExecute: () => {
      toast.loading("Saving Group", {
        toastId: "saving-group",
      });
    },
    onSuccess: () => {
      toast.update("saving-group", {
        render: "Branch Saved ",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      onClose();
    },

    onError: ({ error: { serverError } }) => {
      toast.update("saving-group", {
        render: serverError,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      permissions: [],
    },
  });

  // Watch the permissions array to see changes live
  const permissions = watch("permissions");

  // Toggle function for permissions
  const handleTogglePermission = (permission) => {
    if (permissions.includes(permission.id)) {
      setValue(
        "permissions",
        permissions.filter((p) => p !== permission.id)
      );
    } else {
      setValue("permissions", [...permissions, permission.id]);
    }
  };

  const onSubmit = async (values) => {
    await executeAsync(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="p-7">
      <>
        <div className="flex items-center gap-2 font-bold mb-6">
          <Lucide name="Users" />
          <h3>Create A Group</h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[80vh] overflow-scroll"
        >
          <Input
            type={"text"}
            placeholder="Group Name"
            className="mb-2"
            error={errors?.name?.message}
            {...register("name")}
          />
          <Input
            type={"text"}
            placeholder="Description"
            className="mb-2"
            error={errors?.description?.message}
            {...register("description")}
          />
          <h3 className="text-xl font-bold my-6">
            Add Permissions to this group
          </h3>
          <PermissionManager
            activePermissions={permissions}
            permissionsList={permissionsList || []}
            onTogglePermission={handleTogglePermission}
          />
          <Button className="col-span-full mt-5" type="submit">
            Create Group
          </Button>
        </form>
      </>
    </Modal>
  );
};
