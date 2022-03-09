import { useEffect, useState } from "react";
import { getAllCountries, getReportByCountry } from "./api";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCoutries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("VN");
  const [report, setReport] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllCountries();
      setCoutries(response.data);
    })();
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (selectedCountryId) {

        const country = countries.find(
          (item) => item.ISO2 === selectedCountryId
        );

        if(country){
          const response = await getReportByCountry(country?.Slug);
          setReport(response.data);
        }

      }
    })();
  }, [countries, selectedCountryId]);
  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <Highlight report={report} />
      <Summary report={report} />
    </>
  );
}

export default App;
