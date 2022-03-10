import axios from "axios"

export const getAllCountries = () => {
   return axios.get('https://disease.sh/v3/covid-19/countries')
}

export const getReportHighlightByCountry = (country) => {
    return axios.get(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`)
}

export const getReportSummaryByCountry = (country) => {
    return axios.get(`https://api.covid19api.com/dayone/country/${country}`)
}