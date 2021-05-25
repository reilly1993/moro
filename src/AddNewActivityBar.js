import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ActivityForm from "./ActivityForm";
import LabelToggle from "./LabelToggle";
import { useUpdateActivity } from "./serverData/activities";
import UnsavedChangesModal from "./UnsavedChangesModal";

const empty = {
  title: "",
  location: "",
  isPublic: false,
  image: "",
};

export default function AddNewActivityBar({ open, setOpen }) {
  const [currentActivity, setCurrentActivity] = useState(empty);

  const { title, location, isPublic, image } = currentActivity;

  const updateActitity = useUpdateActivity();

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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden z-10"
          open={open}
          onClose={handleClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-full max-w-xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                      <button
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full bg-white p-8 overflow-y-auto">
                    <div className="pb-16 space-y-6">
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
                          onClick={() => handleSave()}
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
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
