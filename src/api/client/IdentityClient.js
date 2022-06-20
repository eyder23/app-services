const constants = require("../../utils/constants/ApiRest");
const commonConstants = require("../../utils/constants/Common");
import { auth } from "../../libs/firebase/firebase";
import axios from "axios";

const updatePerson = async (person) => {
  let response = null;
  try {
    await axios
      .put(`${constants.ACCESS_CONTROL_MS_URL}/person/update`, person)
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

const useIdentityClient = () => {
  return {
    updatePerson,
  };
};

export default useIdentityClient;
