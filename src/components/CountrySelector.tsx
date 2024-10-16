import React, { useState } from 'react';
import { Country } from '../types/Country';
import '../styles/CountrySelector.css';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country | null;
  onCountryChange: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country);
    setIsDropdownOpen(false); 
    setSearchTerm(''); 
  };

  return (
    <div className="country-selector">
      <div className="selected-country" onClick={toggleDropdown}>
        <img
          src={`https://flagcdn.com/16x12/${selectedCountry?.isoCode}.png`}
          alt={`${selectedCountry?.name} flag`}
          className="country-flag"
        />
        <span className="country-code">{selectedCountry?.calling_code}</span>
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-box"
          />
          <ul className="country-list">
            {filteredCountries.map((country) => (
              <li
                key={country.id}
                onClick={() => handleCountrySelect(country)}
                className="country-item"
              >
                <img
                  src={`https://flagcdn.com/16x12/${country.isoCode}.png`}
                  alt={`${country.name} flag`}
                  className="country-flag"
                />
                <span className="country-name">{country.name}</span>
                <span className="country-calling-code">{country.calling_code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
