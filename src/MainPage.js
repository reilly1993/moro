import { useState } from "react";
import { useQuery } from "react-query";
import ActivityBar from "./ActivityBar";
import { getActivities } from "./api";

export const Body = () => {
  const { isLoading, error, data: activities } = useQuery(
    "activities",
    getActivities
  );

  if (isLoading) return "Loading...";

  return (
    <div className="px-4 py-8 sm:px-0">
      <Grid activities={activities.filter((item) => !item.private)} />
    </div>
  );
};

const Grid = ({ activities }) => {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {activities.map((activity) => (
        <ActivityItem key={activity.key} activity={activity} />
      ))}
    </ul>
  );
};

const ActivityItem = ({ activity }) => {
  const {
    id,
    image: [image],
    title,
    location,
  } = activity;
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActivityBar activity={activity} open={open} setOpen={setOpen} />
      <li key={id} className="relative">
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
          {location?.name}
        </p>
      </li>
    </>
  );
};

export const Header = () => {
  return (
    <h1 className="text-3xl font-bold leading-tight text-gray-900">
      Dashboard
    </h1>
  );
};
