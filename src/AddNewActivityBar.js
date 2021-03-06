import { useCallback, useState } from "react";
import ActivityForm from "./ActivityForm";
import LabelToggle from "./LabelToggle";
import { useCreateActivity } from "./serverData/activities";
import UnsavedChangesModal from "./UnsavedChangesModal";
import dayjs from "dayjs";
import Sidebar from "./Sidebar";

const empty = {
  title: "",
  location: "",
  isPublic: false,
  image: "",
  time: dayjs().unix(),
};

export default function AddNewActivityBar({ open, setOpen }) {
  const [currentActivity, setCurrentActivity] = useState(empty);

  const { title, location, isPublic, image } = currentActivity;

  const updateActitity = useCreateActivity();

  const [state, setState] = useState("initial");
  const handleClose = useCallback(
    (forceClose = false) => {
      if (!forceClose && !Object.compare(empty, currentActivity)) {
        setState("unsaved-changes");
        return;
      }
      setState("closed");
      setOpen(false);
    },
    [setOpen, currentActivity]
  );

  const handleSave = useCallback(
    (closeOnSave = false) => {
      updateActitity.mutate(currentActivity, {
        onSuccess: () => {
          if (closeOnSave) handleClose(true);
        },
      });
    },
    [currentActivity, updateActitity, handleClose]
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
        <div>
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            <img src={image} alt="" className="object-cover" />
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {title}
              </h2>
              <p className="text-sm font-medium text-gray-500">
                {location?.name}
              </p>
            </div>
            <LabelToggle
              label="Public"
              enabled={isPublic}
              onToggle={(bool) => {
                setCurrentActivity((prev) => ({
                  ...prev,
                  isPublic: !prev.isPublic,
                }));
              }}
            />
          </div>
        </div>
        <div>
          <ActivityForm
            currentActivity={currentActivity}
            setCurrentActivity={setCurrentActivity}
          />
        </div>

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
