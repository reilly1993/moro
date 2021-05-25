export default function ActivityForm() {
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Titel
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-title"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Beskrivelse
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Pris
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="postal-code"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                  htmlFor="tickets"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Biletter
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    type="text"
                    name="tickets"
                    id="tickets"
                    autoComplete="postal-code"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Link
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    type="text"
                    name="link"
                    id="link"
                    autoComplete="postal-code"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Venue
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                    id="venue"
                    name="venue"
                    autoComplete="venue"
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option>Huset</option>
                  <option>Loppen</option>
                  <option>Vega</option>
                  <option>Absalon</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Billede
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-5">

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Type
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                      id="category"
                      name="category"
                      autoComplete="category"
                      className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>Koncert</option>
                    <option>Udstilling & Kunst</option>
                    <option>Teater & Forestillinger</option>
                    <option>Film</option>
                    <option>Litteratur</option>
                    <option>Comedy</option>
                    <option>Sport og film</option>
                    <option>Fest</option>
                    <option>Talk & Workshop</option>
                    <option>Gratis</option>
                    <option>Loppemarked/ Lagersalg</option>
                    <option>Mad & Drikke</option>
                  </select>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="mood"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                        Stemnings Kategori
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                            id="mood"
                            name="mood"
                            autoComplete="mood"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                            <option>Hyg med ven</option>
                            <option>Udvid horizon</option>
                            <option>Hangover</option>
                            <option>go on</option>
                            <option>tom lom</option>
                            <option>udideblaa</option>
                        </select>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
