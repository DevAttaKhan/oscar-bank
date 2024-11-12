import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { Lucide } from "./lucide";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
  contentClassName?: string;
};

export const Modal = ({
  children,
  isOpen,
  contentClassName,
  onClose,
}: Props) => {
  return (
    <>
      <Transition
        enter="ease-out duration-300"
        enterFrom="opacity-0 transform-[scale(95%)]"
        enterTo="opacity-100 transform-[scale(100%)]"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 transform-[scale(100%)]"
        leaveTo="opacity-0 transform-[scale(95%)]"
        show={isOpen}
      >
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none "
          onClose={onClose}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 bg-black bg-opacity-25 dark:bg-opacity-50 ">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel
                  className={classNames(
                    "relative shadow-lg rounded-xl p-4 bg-white w-[90%] ",
                    contentClassName
                  )}
                >
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2  "
                  >
                    <Lucide name="CircleX" color="black" />
                  </button>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
