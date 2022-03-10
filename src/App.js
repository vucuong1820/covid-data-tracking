import { Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllCountries, getReportHighlightByCountry, getReportSummaryByCountry } from "./api";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import "@fontsource/roboto"
import dayjs from 'dayjs'
import customParseFormat  from 'dayjs/plugin/advancedFormat'

dayjs.extend(customParseFormat)
dayjs.locale('vn')
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  time: {
    marginBottom: theme.spacing(2)
  },
  select: {
    marginBottom: theme.spacing(2)
  },

}))
function App() {
  const [countries, setCoutries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("VN");
  const [reportHighlight, setReportHighlight] = useState({});
  const [reportSummary, setReportSummary] = useState([])
  const classes = useStyles()

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
          (item) => item.countryInfo.iso2 === selectedCountryId
        );

        if(country){
          const responseHighlight = await getReportHighlightByCountry(country.countryInfo.iso2);
          const responseSummary = await getReportSummaryByCountry(country.countryInfo.iso2.toLowerCase())
          setReportHighlight(responseHighlight.data);
          setReportSummary(responseSummary.data)
        }

      }
    })();
  }, [countries, selectedCountryId]);
  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h2" className={classes.title}> SỐ LIỆU COVID 19 </Typography>
      <Typography className={classes.time}>{dayjs().format("DD/MM/YYYY h:mm A")}</Typography>
      <CountrySelector className={classes.select} countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <Highlight report={reportHighlight} />
      <Summary report={reportSummary} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
