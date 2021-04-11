import React, { useEffect, useState } from "react";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import covidLogo from "./covid-19.svg";
import { fetchCountries } from "./components/api";
import AreaChart from "./components/AreaChart";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "50px auto",
    width: "50%",
  },
}));

const App = () => {
  const classes = useStyles();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

  useEffect(async () => {
    const countries = await fetchCountries();
    setCountries(countries);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img
            src={covidLogo}
            alt="Covid19"
            style={{
              marginTop: 20,
              width: 100,
              height: 100,
            }}
          />

          <FormControl className={classes.formControl}>
            <Select
              labelId="countries"
              id="countries"
              value={country}
              onChange={event => setCountry(event.target.value)}
            >
              {countries.map(country => (
                <MenuItem key={country.Slug} value={country.Slug}>
                  {country.Country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* chart */}
          <Grid item xs={12}>
            <AreaChart country={country} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;

export const functionName = params => {};
