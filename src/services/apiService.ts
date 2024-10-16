import axios from 'axios';

const API_BASE_URL = 'https://sandbox-api.softpoint.io/interface/v1';

export const generateAccessToken = async (apiKey: string) => {
  const response = await axios.post(`${API_BASE_URL}/access_token`, null, {
    headers: {
      'Api-Key': apiKey,
    },
    params: {
      corporate_id: 10,
    },
  });
  return response.data.access_token;
};

export const fetchCountries = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/challenges/countries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const submitTwoFactorAuth = async (
  phoneNumber: string,  
  countryId: string, 
  token: string
) => {
  
  const phoneNumberInteger = parseInt(phoneNumber.replace(/\D/g, ''), 10); 
  const countryIdInteger = parseInt(countryId, 10);

  const response = await axios.post(
    `${API_BASE_URL}/challenges/two_factor_auth`,
    null,
    {
      params: {
        phone_number: phoneNumberInteger,
        country_id: countryIdInteger,
      },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

