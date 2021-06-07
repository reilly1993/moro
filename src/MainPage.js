import { useMemo, useState } from "react";
import ActivityBar from "./ActivityBar";
import { useActivities } from "./serverData/activities";
import AddNewActivityBar from "./AddNewActivityBar";
import { useVenues } from "./serverData/venues";

export const Body = () => {
  const { isLoading } = useActivities();

  if (isLoading) return "Loading...";

  return (
    <div className="px-4 py-8 sm:px-0">
      <Table />
    </div>
  );
};

function Table() {
  const { data: activities } = useActivities();
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200 overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Venue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Public status
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 w-full">
                {activities.map((item) => (
                  <ActivityItem key={item.id} activity={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const ActivityItem = ({ activity }) => {
  const { title, isPublic, venueId } = activity;
  const [open, setOpen] = useState(false);

  const { data: venues } = useVenues();

  const venueObj = useMemo(
    () => venues.find((v) => v.id === venueId),
    [venues, venueId]
  );
  return (
    <>
      <ActivityBar activity={activity} open={open} setOpen={setOpen} />
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {venueObj?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {isPublic ? "Public" : "Private"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
        </td>
      </tr>
    </>
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
