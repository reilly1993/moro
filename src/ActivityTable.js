import { useMemo, useState } from "react";
import ActivityBar from "./ActivityBar";
import DefaultTable from "./DefaultTable";
import { useActivities } from "./serverData/activities";
import { useVenues } from "./serverData/venues";

const ActivityTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        Cell: ({ row }) => {
          return <div className="max-w-sm truncate">{row.original.title}</div>;
        },
        accessor: "title",
      },
      {
        Header: "Venue",
        Cell: ({ row }) => {
          const { data: venues } = useVenues();

          const venueObj = useMemo(
            () => venues.find((v) => v.id === row.original.venueId),
            [venues, row.original.venueId]
          );
          return <span>{venueObj?.name}</span>;
        },
        accessor: "venue",
      },
      {
        Header: "Edit",
        Cell: ({ row }) => {
          return <EditComponent activity={row.original} />;
        },
        accessor: "edit",
      },
    ],
    []
  );

  const { data: activities } = useActivities();

  const tableData = activities;

  return <DefaultTable columns={columns} data={tableData} />;
};

const EditComponent = ({ activity }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActivityBar activity={activity} open={open} setOpen={setOpen} />
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
      </button>
    </>
  );
};

export default ActivityTable;
