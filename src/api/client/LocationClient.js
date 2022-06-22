const constants = require("../../utils/constants/ApiRest");
const commonConstants = require("../../utils/constants/Common");
import axios from "axios";

const getCountryByCodeState = async (code, active) => {
  let response = null;
  try {
    await axios
      .get(`${constants.ACCESS_CONTROL_MS_URL}/location/country/all`, {
        params: {
          code,
          active,
        },
      })
      .then((result) => {
        if (result.data) {
          response = result.data;
        }
      });
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      response = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      response = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
  }
  return response;
};

const getStateByCountry = async (country, active) => {
  let response = null;
  try {
    await axios
      .get(`${constants.ACCESS_CONTROL_MS_URL}/location/state/all`, {
        params: {
          country,
          active,
        },
      })
      .then((result) => {
        if (result.data) {
          response = result.data;
        }
      });
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      response = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      response = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
  }
  return response;
};

const getCityByState = async (state, active) => {
  let response = null;
  try {
    await axios
      .get(`${constants.ACCESS_CONTROL_MS_URL}/location/city/all`, {
        params: {
          state,
          active,
        },
      })
      .then((result) => {
        if (result.data) {
          response = result.data;
        }
      });
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      response = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      response = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
  }
  return response;
};

const useLocation = () => {
  return {
    getCountryByCodeState,
    getStateByCountry,
    getCityByState,
  };
};

export default useLocation;
