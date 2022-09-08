import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../Button";
import Modal from "../Modal";

const DeleteProductModal = ({ onDelete }) => {
  const { state, updateModal } = useContext(AppContext);
  return (
    <Modal
      show={state.modal === "deleteProduct"}
      title="Are You Sure to Delete This Product?"
      body={
        <div className="flex flex-row py-2 justify-center gap-2">
          <Button
            className="bg-slate-500 flex-1 py-2"
            onClick={() => updateModal(null)}
          >
            Cancel
          </Button>
          <Button className="bg-red-600 flex-1 py-2" onClick={onDelete}>
            DELETE
          </Button>
        </div>
      }
    />
  );
};

export default DeleteProductModal;
