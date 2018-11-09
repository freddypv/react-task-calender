import { USER_DETAIL, enCode } from '../Constants';

export const loadState = () => {
  try {
    const language = localStorage.getItem('FR_REACT_LANGUAGE');
    const isLoggedIn = localStorage.getItem('accessToken') ? true : false;
    const basePath = localStorage.getItem('basePath');
    const match = (basePath) ? JSON.parse(basePath) : '';
    const token = localStorage.getItem('accessToken');
    const details = localStorage.getItem('userDetails');
    const userDetails = (details) ? JSON.parse(details) : '';
    if (language === null || isLoggedIn === false) {
      return {
        'language': undefined,
        'login': undefined
      };
    }
    return {
      'language': { language },
      'login': {
        isLoggedIn,
        userDetails,
        match,
        token
      }
    };
  } catch (error) {
    return undefined;
  }
};

export const saveUserDetails = (login) => {
  try {
    if (login && login.isLoggedIn) {
      const userDetails = USER_DETAIL.result.user;
      localStorage.setItem('userName', userDetails.first_name);
      localStorage.setItem('role', userDetails.role.name);
      localStorage.setItem('country', userDetails.country);
      localStorage.setItem('accessToken', USER_DETAIL.result.session.key);
      localStorage.setItem('basePath', JSON.stringify(login.match));
      localStorage.setItem('userDetails', JSON.stringify(login.userDetails));
      if (login.token) {
        localStorage.setItem('accessToken', login.token);
      }
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.log('User details save has failed');
    /* eslint-enable no-console */
  }
};

export const saveLanguage = (language) => {
  try {
    if (language) {
      localStorage.setItem('FR_REACT_LANGUAGE', language);
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.log('language save has failed');
    /* eslint-enable no-console */
  }
};

export const getCurrentLanguage= () => {
  try {
    return localStorage.getItem('FR_REACT_LANGUAGE') || enCode;
  } catch (error) {
    return enCode;
  }
};

export const removeUserDetails = (login) => {
  try {
    if (login && !login.isLoggedIn) {
      localStorage.removeItem('userName');
      localStorage.removeItem('role');
      localStorage.removeItem('country');
      localStorage.removeItem('accessToken');
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.log('User details not removed');
    /* eslint-enable no-console */
  }
};

export const getSessionToken = () => {
  try {
    return localStorage.getItem('accessToken') || '';
  } catch (error) {
    return '';
  }
};

