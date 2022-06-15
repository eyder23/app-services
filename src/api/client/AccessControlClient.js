const constants = require("../../utils/constants/ApiRest");
const commonConstants = require("../../utils/constants/Common");
import { auth } from "../../libs/firebase/firebase";
import axios from "axios";

const generateCodeAuth = async (user) => {
  let response = null;
  try {
    const postRequest = {
      serviceProvider: "META",
      channel: "WHATSAPP",
      type: "AUTHORIZATION_CODE_ACCESS",
      propietaryApplication: "Api Services",
      countryCodePhoneNumber: user.countryCodePhoneNumber,
      phoneNumber: user.phoneNumber,
    };

    await axios
      .post(`${constants.ACCESS_CONTROL_MS_URL}/code/create`, postRequest)
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

const validateCodeAuth = async (user) => {
  let response = null;
  try {
    const postRequest = {
      type: "AUTHORIZATION_CODE_ACCESS",
      phoneNumber: user.phoneNumber,
      countryCodePhoneNumber: user.countryCodePhoneNumber,
      propietaryApplication: commonConstants.PROPIETARY_APPLICATION,
      genCode: user.genCode,
      serviceProvider: commonConstants.NOTIFICATION_SERVICE_PROVIDER,
      channel: commonConstants.NOTIFICATION_CHANNEL,
      origin: commonConstants.ORIGIN,
      currentVersionApp: commonConstants.CURRENT_VERSION,
      installedVersionApp: commonConstants.CURRENT_VERSION,
      platformOS: user.platformOS,
    };
    await axios
      .post(`${constants.ACCESS_CONTROL_MS_URL}/code/validate`, postRequest)
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

const userLoginWithCustomToken = async (token) => {
  let response = null;
  try {
    const res = await auth.signInWithCustomToken(token);
    response = {
      success: true,
      data: res,
    };
  } catch (err) {
    let messageUser = "";
    console.log(err.message);
    switch (err.message) {
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
        messageUser =
          "No encontramos una cuenta asociada. Por favor registrarse.";
        break;
      case "The password is invalid or the user does not have a password.":
        messageUser =
          "La contraseña no es valida. Por favor verifique sus datos.";
        break;
      default:
        messageUser = "Proceso incorrecto. Por favor intente en un momento";
        break;
    }

    response = {
      success: false,
      apiError: {
        messageUser: messageUser,
        messageDeveloper: err.message,
        code: "AUTH-001",
      },
    };
  }
  return response;
};

const getUserByUid = async (uid) => {
  let response = null;
  try {
    await axios
      .get(`${constants.ACCESS_CONTROL_MS_URL}/user/getUserByUid/${uid}`)
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

const useUser = () => {
  return {
    generateCodeAuth,
    validateCodeAuth,
    userLoginWithCustomToken,
    getUserByUid,
  };
};

export default useUser;
