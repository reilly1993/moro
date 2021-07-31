import { useMemo } from "react";
import { usePagination, useTable } from "react-table";

export default function DefaultTable({
  columns,
  data,
  onRowClick,
  paginate = false,
}) {
  const handleRowClick = (id) => {
    if (!onRowClick) return;
    onRowClick(id);
  };
  // Use the state and functions returned from useTable to build table UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
      },
    },
    usePagination
  );

  const shownRows = useMemo(
    () => (paginate ? page : rows),
    [paginate, page, rows]
  );

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-hidden w-full relative">
        <div className="align-middle inline-block w-full border border-gray-200 sm:rounded overflow-hidden">
          <div className="overflow-hidden w-full overflow-x-auto">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {shownRows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      onClick={() => handleRowClick(data[i].id)}
                      className={`${
                        onRowClick ? "hover:bg-gray-100 cursor-pointer" : ""
                      }`}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
