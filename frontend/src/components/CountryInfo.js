import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CountryInfo() {
  const [country, setCountry] = useState(""); // use to store the country name
  const [countryInfo, setCountryInfo] = useState(null); // use to store the country information
  
  //fetchWithTimeout function to fetch data from the server with a timeout of 5 seconds
  const fetchWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  //searchCountry function to fetch the country information from the server
  const searchCountry = async () => {
    if (!country.trim()) {
      console.error("Country name is required");
      return;
    }

    try {
      // fetch country information
      const response = await fetchWithTimeout(`/country/${country}`);
      // check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // convert the response to json
      const data = await response.json();
      // check if the data is empty or if the data does not contain the country name
      if (data.length === 0 || !data[0].name) {
        console.error("No data found for the specified country");
        return;
      }
      // set the country information
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
        <h1>Country Explorer</h1>
      </header>
      <main className="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="text-center">Search Country Information</h1>
            <div id="searchBox" class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                placeholder="Enter country name"
                aria-label="Country name"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={searchCountry}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="country-info" className="mt-4">
          {countryInfo ? ( // check if countryInfo is not null
            renderCountryInfo() // render country information
          ) : (
            <p>
              No country information to display. Please search for a country.
            </p>
          )}
        </div>
      </main>
    </div>
  );
  // renderCountryInfo function to render the country information
  function renderCountryInfo() {
    return (
      <div class="row country-info">
        <div class="col-md-12">
          <h2>Country Information</h2>
          <div id="countryData">
            <p>
              <strong>Common Name:</strong>{" "}
              <span>
                {" "}
                {countryInfo.name.common}  
              </span>
            </p>
            <p>
              <strong>Official Name:</strong>{" "}
              <span>{countryInfo.name.official}</span>
            </p>
            <p>
              <strong>Capital:</strong> <span>{countryInfo.capital[0]}</span>
            </p>
            <p>
              <strong>Continents:</strong> <span>{countryInfo.continents}</span>
            </p>
            <p>
              <strong>Population:</strong>{" "}
              <span>{countryInfo.population.toLocaleString()}</span>
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              <span> {Object.values(countryInfo.languages).join(", ")}</span>
            </p>
            <p>
              <strong>Currency:</strong> 
              <span>{Object.values(countryInfo.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}</span>
                    <span> </span>
              <span>{Object.values(countryInfo.currencies)
                    .map((currency) => currency.symbol)
                    .join(", ")}</span>
            </p>
            <p>
              <strong>Region:</strong>{" "}
              <span>
                {countryInfo.region} - {countryInfo.subregion}
              </span>
            </p>
            <p>
              <strong>Timezone:</strong>{" "}
              <span>{countryInfo.timezones.join(", ")}</span>
            </p>
            <p>
              <strong>Flag:</strong>{" "}
              <img
                src={countryInfo.flags.png}
                alt={`Flag of ${countryInfo.name.common}`}
                style={{ width: "100px" }}
              />
            </p>
            <p>
              <strong>Map:</strong>{" "}
              <a
                href={`${countryInfo.maps.googleMaps}?output=embed}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View map
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CountryInfo;
