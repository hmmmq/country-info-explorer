import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function CountryInfo() {
  const [country, setCountry] = useState(""); // use to store the country name
  const [countryInfo, setCountryInfo] = useState(null); // use to store the country information

  const fetchWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  const searchCountry = async () => {
    if (!country.trim()) {
      console.error("Country name is required");
      return;
    }

    try {
      const response = await fetchWithTimeout(`/country/${country}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length === 0 || !data[0].name) {
        console.error("No data found for the specified country");
        return;
      }

      setCountryInfo(data[0]);
    } catch (error) {
      console.error(
        "Error fetching country information",
        error.message || error
      );
      setCountryInfo(null); // reset countryInfo
    }
  };

  return (
    <div>
      <header className="bg-primary text-white text-center py-3">
        <h1>CountryInfoExplorer</h1>
      </header>
      <main className="container my-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            placeholder="Enter country name"
            aria-label="Country name"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={searchCountry}
          >
            Search
          </button>
        </div>
        <div id="country-info" className="mt-4">
          {countryInfo ? (
            <div>
              <h2 className="mb-3">Country Information</h2>
              <div className="mb-2">
                <h3>Country Name</h3>
                <h2>
                  {countryInfo.name.common} ({countryInfo.name.official})
                </h2>
                <img
                  src={countryInfo.flags.png}
                  alt={`Flag of ${countryInfo.name.common}`}
                />
              </div>
              <div className="mb-2">
                <h3>Capital</h3>
                <p>
                  <strong>Capital:</strong> {countryInfo.capital[0]}
                </p>
                <p>
                  <strong>Region:</strong> {countryInfo.region} -{" "}
                  {countryInfo.subregion}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {countryInfo.population.toLocaleString()}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {Object.values(countryInfo.languages).join(", ")}
                </p>
                <p>
                  <strong>Currency:</strong>{" "}
                  {Object.values(countryInfo.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Timezone:</strong> {countryInfo.timezones.join(", ")}
                </p>
              </div>
            </div>
          ) : (
            <p>
              No country information to display. Please search for a country.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CountryInfo;
