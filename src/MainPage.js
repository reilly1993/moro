import { useState } from "react";
import { useActivities } from "./serverData/activities";
import AddNewActivityBar from "./AddNewActivityBar";
import ActivityTable from "./ActivityTable";

export const Body = () => {
  const { isLoading } = useActivities();

  if (isLoading) return "Loading...";

  return (
    <div className="px-4 py-8 sm:px-0">
      <ActivityTable />
    </div>
  );
};

export const Header = () => {
  const [adding, setAdding] = useState(false);
  const handleAdd = () => {
    setAdding(true);
  };
  return (
    <div className="flex items-center justify-between">
      <AddNewActivityBar open={adding} setOpen={setAdding} />
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Dashboard
      </h1>

      <button
        type="button"
        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleAdd}
      >
        Add event
      </button>
    </div>
  );
};
