import { useCallback, useState } from "react";
import { useCreateActivity } from "./serverData/activities";
import UnsavedChangesModal from "./UnsavedChangesModal";
import Sidebar from "./Sidebar";
import { useCreateVenue } from "./serverData/venues";

const empty = {
  name: "",
  location: "",
};

export default function AddNewVenueBar({ open, setOpen }) {
  const [currentVeneue, setCurrentVenue] = useState(empty);

  const { name, location } = currentVeneue;

  const createVenue = useCreateVenue();

  const [state, setState] = useState("initial");
  const handleClose = useCallback(
    (forceClose = false) => {
      if (!forceClose && !Object.compare(empty, currentVeneue)) {
        setState("unsaved-changes");
        return;
      }
      setState("closed");
      setOpen(false);
    },
    [setOpen, currentVeneue]
  );

  const handleSave = useCallback(
    (closeOnSave = false) => {
      createVenue.mutate(currentVeneue, {
        onSuccess: () => {
          if (closeOnSave) handleClose(true);
        },
      });
    },
    [currentVeneue, createVenue, handleClose]
  );

  return (
    <>
      <UnsavedChangesModal
        setOpen={() => setState("initial")}
        open={state === "unsaved-changes"}
        onSave={() => handleSave(true)}
        onClose={() => handleClose(true)}
      />
      <Sidebar onClose={handleClose} open={open} setOpen={setOpen}>
        <div></div>
        <div>{name}</div>
        <div className="flex absolute bottom-0 inset-x-0 p-4 bg-white border-t">
          <button
            type="button"
            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleSave(true)}
          >
            Save
          </button>
          <button
            type="button"
            className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleClose()}
          >
            Close
          </button>
        </div>
      </Sidebar>
    </>
  );
}
