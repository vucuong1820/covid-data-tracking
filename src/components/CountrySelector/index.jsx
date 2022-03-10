import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react';
import PropTypes from "prop-types";


CountrySelector.propTypes = {
    value: PropTypes.string,
    handleOnChange: PropTypes.func,
    countries: PropTypes.array,
};

function CountrySelector({value = "", handleOnChange = null, countries = []}) {
    return (
        <FormControl>
            <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
            <NativeSelect
            value={value}
            onChange={handleOnChange}
            inputProps={{
                name: 'country',
                id:'country-selector'
            }}
            >
                {
                    countries.map((country, index) => {
                        const {countryInfo}= country;
                        return <option key={index} value={countryInfo.iso2}>{country.country}</option>
                    })
                }

            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;