import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import globe from '../../assets/FE globe.svg';
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Card } from "primereact/card";
import { Splitter, SplitterPanel } from 'primereact/splitter';

import '../../index.css';


function CountryDetail(): JSX.Element {
  const navigate = useNavigate();
  const name = useParams().name;
  const [country, setCountry]: any = useState();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .then(data => {
      const countryData = data.map((info: any) => (
        {
          name: info.name.common,
          callingCode: `${info.idd.root[1]}${info.idd.suffixes[0]}`,
          flag: info.flags.png,
          countryCode: info.cca2,
          officialName: info.name.official,
          nativeName: info.name.official,
          latlong: info.latlng,
          capital: info.capital,
          region: info.region,
          subregion: info.subregion,
          currency: Object.keys(info.currencies)
        }
      ));
      setCountry(countryData[0]);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${globe})`,
        margin: "5%"
      }}
    >
      <Button
        label="Back to Homepage"
        icon="pi pi-arrow-left"
        className="btn-purple" size="small"
        onClick={() => { navigate("/") }}
      />
      <h1 style={{ fontSize: 40, marginTop: 50 }}>
        {
          country ?
            <div>
              <div>
                {country.name}
                <img src={country.flag} alt="" width={40} style={{ marginLeft: 10}} />
              </div>
              <div>
                <Chip
                  label={country.countryCode}
                  style={{
                    marginRight: 5,
                    backgroundColor: "#8ed4cc",
                    color: "white",
                    fontWeight: "bold"
                  }}
                />
                <Chip
                  label={country.officialName}
                  style={{
                    marginRight: 5,
                    backgroundColor: "#8ed4cc",
                    color: "white",
                    fontWeight: "bold"
                  }}
                />
                <Chip
                  label={country.nativeName}
                  style={{
                    backgroundColor: "#8ed4cc",
                    color: "white",
                    fontWeight: "bold"
                  }}
                />
              </div>
              <Splitter style={{ height: '200px', marginTop: "10px" }}>
                <SplitterPanel className="flex align-items-center justify-content-center">
                  <Card style={{ width: "100%" }}>
                    <p style={{ fontWeight: "bold" }}>LatLong</p>
                    <p className="text-purple" style={{ fontSize: 50, fontWeight: "bold" }}>
                      {country.latlong[0]}, {country.latlong[1]}
                    </p>
                  </Card>
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center">
                  <Card style={{ width: "100%" }}>
                    <table>
                      <tbody>
                        <tr>
                          <td>Capital</td>
                          <td>:</td>
                          <td style={{ fontWeight: "bold" }}>{country.capital}</td>
                        </tr>
                        <tr>
                          <td>Region</td>
                          <td>:</td>
                          <td style={{ fontWeight: "bold" }}>{country.region}</td>
                        </tr>
                        <tr>
                          <td>Subregion</td>
                          <td>:</td>
                          <td style={{ fontWeight: "bold" }}>{country.subregion}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                </SplitterPanel>
              </Splitter>
              <Splitter style={{ height: '200px', marginTop: "10px" }}>
                <SplitterPanel className="flex align-items-center justify-content-center">
                  <Card style={{ width: "100%" }}>
                    <p style={{ fontWeight: "bold" }}>Calling Code</p>
                    <p className="text-purple" style={{ fontSize: 50, fontWeight: "bold" }}>
                      {country.callingCode}
                    </p>
                  </Card>
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center">
                  <Card style={{ width: "100%" }}>
                    <p style={{ fontWeight: "bold" }}>Currency</p>
                    <p className="text-purple" style={{ fontSize: 50, fontWeight: "bold" }}>
                      {country.currency}
                    </p>
                  </Card>
                </SplitterPanel>
              </Splitter>
            </div>
          : 
            <p>No data</p>
        }
      </h1>
    </div>
  );
}

export default CountryDetail;