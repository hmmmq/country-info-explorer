import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import CountryInfo from "./components/CountryInfo";
function App() {
  return (
    <div class="container my-4">
      <main>
        <CountryInfo />
      </main>
    </div>
  );
}

export default App;
