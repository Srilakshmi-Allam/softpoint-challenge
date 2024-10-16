import React, { useEffect, useState } from 'react';
import CountrySelector from './components/CountrySelector';
import PhoneNumberInput from './components/PhoneNumberInput';
import { generateAccessToken, fetchCountries, submitTwoFactorAuth } from './services/apiService';
import { Country } from './types/Country';
import './styles/App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const apiKey = 's1g8dwdunjcpqyELJMu0WsanpfXnCBcdzfWNOugvW68='
        const fetchedToken = await generateAccessToken(apiKey); 
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      if (!token) return; 
      try {
        const countryData: Record<string, Country> = await fetchCountries(token);
        const countriesArray: Country[] = Object.entries(countryData).map(
          ([isoCode, country]) => ({
            ...country,
            isoCode: isoCode.toLowerCase(),
          })
        );
        setCountries(countriesArray);
        setSelectedCountry(countriesArray[0]);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountryData();
  }, [token]);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
  };

  const handleSubmit = async () => {
    if (!selectedCountry || !phoneNumber) {
      alert('Please select a country and enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTwoFactorAuth(phoneNumber, selectedCountry.id, token);
      console.log(response); 
      alert('Successfully submitted two-factor authentication');

    } catch (error) {
      console.error('Error submitting two-factor authentication:', error);
      alert('Failed to submit two-factor authentication. Please try again.');
    
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
        <PhoneNumberInput
          selectedCountry={selectedCountry}
          onPhoneNumberChange={handlePhoneNumberChange}
        />

      </div>
      <button onClick={handleSubmit} disabled={!selectedCountry || !phoneNumber || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default App;
