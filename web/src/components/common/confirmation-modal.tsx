import { Modal } from "./modal";

type Props = {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  message = "Are you Sure?",
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-96 p-4 pb-8"
    >
      <h1 className="font-bold mb-5">Caution</h1>
      <p className="mb-3 text-center">{message}</p>
      <div className="flex items-center gap-3 justify-center w-full">
        <button
          onClick={onConfirm}
          className="border px-3 py-2 rounded-lg font-medium hover:bg-slate-100"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="border px-3 py-2 rounded-lg font-medium bg-dash_red text-white "
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
