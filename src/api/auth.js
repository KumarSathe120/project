// src/api/auth.js
import axios from 'axios';

export const loginUser = async (username, password, role) => {
  try {
    const response = await axios.post('https://your-api-url.com/api/auth/login', {
      username,
      password,
      role
    });

    if (response.status === 200 && response.data?.accessToken) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Invalid login response'
      };
    }

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed. Please try again.'
    };
  }
};
