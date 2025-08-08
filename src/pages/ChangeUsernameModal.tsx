import { useState } from "react";

interface ChangeUsernameModalProps {
  onClose: () => void;
  onSubmit: (newUsername: string) => void;
}

function ChangeUsernameModal({ onClose, onSubmit }: ChangeUsernameModalProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-center text-black">
          Change Username
        </h2>
        <input
          type="text"
          placeholder="Enter new username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(inputValue);
              onClose();
            }
          }}
          className="border border-gray-300 rounded-lg p-2 w-full mt-3"
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(inputValue);
              onClose();
            }}
            className="text-sm text-green-600 hover:text-green-800 transition-all font-semibold"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeUsernameModal;
