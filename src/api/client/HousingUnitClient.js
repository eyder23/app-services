const constants = require("../../utils/constants/ApiRest");
import axios from "axios";

const createHousingUnit = async (housingUnit) => {
  let response = null;
  try {
    console.log(housingUnit);
    await axios
      .post(
        `${constants.ACCESS_CONTROL_MS_URL}/housing-unit/create`,
        housingUnit
      )
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

const useHousingUnitClient = () => {
  return {
    createHousingUnit,
  };
};

export default useHousingUnitClient;
