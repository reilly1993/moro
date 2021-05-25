import { useMemo, useState } from "react";
import ActivityBar from "./ActivityBar";
import { useActivities } from "./serverData/activities";
import AddNewActivityBar from "./AddNewActivityBar";
import { useVenues } from "./serverData/venues";

export const Body = () => {
  const { isLoading, data: activities } = useActivities();
  console.log({ activities, isLoading });
  if (isLoading) return "Loading...";

  return (
    <div className="px-4 py-8 sm:px-0">
      <Grid activities={activities} />
    </div>
  );
};

const Grid = ({ activities = [] }) => {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {activities.slice(0, 10).map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
};

const ActivityItem = ({ activity }) => {
  const { id, image, title, isPublic, venue } = activity;
  const [open, setOpen] = useState(false);

  const { data: venues } = useVenues();

  const venueObj = useMemo(
    () => venues.find((v) => v.id === venue),
    [venues, venue]
  );
  return (
    <>
      <ActivityBar activity={activity} open={open} setOpen={setOpen} />
      <li key={id} className="relative">
        {isPublic && (
          <span className="z-10 absolute top-1 right-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            <svg
              className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            Public
          </span>
        )}
        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <img
            src={image}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
          <button
            type="button"
            className="absolute inset-0 focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">View details for {title}</span>
          </button>
        </div>
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {title}
        </p>
        <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          {venueObj?.name}
        </p>
      </li>
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
