import { Lucide, Modal } from "@/components/common";
import { Input } from "@/components/ui";
import React from "react";
import { getGroupPermissions } from "./data";
import { Switch } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

console.log(getGroupPermissions());
export const AddGroupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="p-7">
      <>
        <div className="flex items-center gap-2 font-bold mb-6">
          <Lucide name="Users" />
          <h3>Create A Group</h3>
        </div>

        <form className="max-h-[80vh] overflow-scroll">
          <Input
            type={"text"}
            placeholder="Group Name"
            // error={errors[input.name as keyof CreateBranchInputType]?.message}
            // {...register(input.name as keyof CreateBranchInputType)}
          />
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-6">
            {getGroupPermissions().map((group) => {
              return (
                <div key={group.name} className="border rounded p-2 ">
                  <h4 className="capitalize text-lg font-bold mb-3">
                    {group.name}
                  </h4>
                  <div>
                    {group.permissions.map((permission) => (
                      <div
                        className="flex justify-between w-full mb-2"
                        key={permission}
                      >
                        <label className="capitalize">
                          {permission.split(":")[1]}
                        </label>
                        <Switch
                          // checked={false}
                          value={permission}
                          onChange={(value) => console.log(value)}
                          className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-switch_unchecked p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-switch_checked"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
                          />
                        </Switch>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </>
    </Modal>
  );
};
