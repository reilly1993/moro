import { useMemo, useState } from "react";
import ActivityBar from "./ActivityBar";
import DefaultTable from "./DefaultTable";
import { useActivities } from "./serverData/activities";
import { useVenues } from "./serverData/venues";

const VenueTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        Cell: ({ row }) => {
          return <div className="max-w-sm truncate">{row.original.name}</div>;
        },
        accessor: "name",
      },
      {
        Header: "Address",
        Cell: ({ row }) => {
          const { data: venues } = useVenues();

          const venueObj = useMemo(
            () => venues.find((v) => v.id === row.original.venueId),
            [venues, row.original.venueId]
          );
          return <span>{venueObj?.name}</span>;
        },
        accessor: "address",
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

  const { data: venues } = useVenues();

  const tableData = venues;

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

export default VenueTable;
