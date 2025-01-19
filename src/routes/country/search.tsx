import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/ListBox';
import { useEffect, useState } from 'react';

function CountrySearch(): JSX.Element {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [notFound, setNotFound] = useState('none');

  useEffect(() => {
    if (country) {
      fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setCountries(
            data.map(
              (info: any) => (
                {
                  name: `${info.name.common} - ${info.idd.root[1]}${info.idd.suffixes}`
                }
              )
            )
          );
          setNotFound('none');
        } else {
          setCountries([]);
          setNotFound('block');
        }
      })
      .catch(error => {
        console.log(error);
        setCountries([]);
        setNotFound('block');
      });
    } else if (country !== '') {
      setCountries([]);
      setNotFound('block');
    }
  }, [country]);

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        top: 150
      }}
    >
      <h1 style={{fontSize: 50}}>Country</h1>
      <div
        className="p-inputgroup flex-1"
        style={{
          width: '40%',
          margin: '0 30%'
        }}
      >
        <InputText
          placeholder="Type any country name"
          id="id_country_name"
          name="country_name"
          value={country}
          autoComplete="off"
          className="input"
          onChange={ (e) => setCountry(e.target.value) }
        />
        <Button
          icon="pi pi-search"
          className="p-button-warning btn-purple"
        />
      </div>
      {
        countries.length > 0 ?
          <ListBox
            value={countries}
            options={countries}
            optionLabel="name"
            className="w-full md:w-14rem"
            style={{
              width: '40%',
              margin: '0 30%'
            }}
          />
        :
          <div></div>
      }
      <p
        id='id_data_not_found'
        style={{
          color: 'red',
          display: notFound
        }}
      >
        Data not found
      </p>
    </div>
  );
}

export default CountrySearch;