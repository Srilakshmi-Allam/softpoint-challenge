import React, { useEffect, useState } from 'react';
import { Country } from '../types/Country';

interface PhoneNumberInputProps {
  selectedCountry: Country | null;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ selectedCountry, onPhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('(000) 000-0000');

  useEffect(() => {
    if (selectedCountry) {
      const phoneLength = parseInt(selectedCountry.phone_length, 10);
      const formattedPlaceholder = createPlaceholder(phoneLength);
      setPlaceholder(formattedPlaceholder);
      setPhoneNumber(''); 
      onPhoneNumberChange('');
    } else {
      setPlaceholder('(000) 000-0000');
    }
  }, [selectedCountry]);
  

  const createPlaceholder = (phoneLength: number) => {
    const areaCodeLength = 3;
    const centralOfficeCodeLength = 3;
    const subscriberNumberLength = phoneLength - areaCodeLength - centralOfficeCodeLength;

    const formattedPlaceholder = `(${''.padEnd(areaCodeLength, '0')}) ${''.padEnd(centralOfficeCodeLength, '0')}-${''.padEnd(subscriberNumberLength, '0')}`;
    return formattedPlaceholder;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
    onPhoneNumberChange(formattedPhoneNumber);
  };

  const formatPhoneNumber = (input: string) => {
    const numericInput = input.replace(/\D/g, ''); 
    let formattedNumber = numericInput;

    if (selectedCountry) {
      const length = parseInt(selectedCountry.phone_length, 10); 
      formattedNumber = `(${numericInput.slice(0, 3)}) ${numericInput.slice(3, 6)}-${numericInput.slice(6, length)}`;
    }

    return formattedNumber;
  };

  return (
    <input
      type="text"
      value={phoneNumber}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default PhoneNumberInput;
