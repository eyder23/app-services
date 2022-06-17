import { useSelector } from "react-redux";
// ======== Custom Imports =========
// ======== Storage
import {
  selectCurrentAppState,
  setCurrentAppState,
} from "../../store/slices/appSlice";
import {
  selectCurrentUser,
  setCurrentUser,
} from "../../store/slices/userSlice";
// =================================

export function getCurrentUser() {
  return useSelector(selectCurrentUser);
}

export function getUserToUpdate(currentUser, user) {
  const defUser = {
    _idPerson:
      user?._idPerson !== null ? user._idPerson : currentUser?._idPerson,
    displayName:
      user?.displayName !== null ? user.displayName : currentUser?.displayName,
    lastLoginAt:
      user?.lastLoginAt !== null ? user.lastLoginAt : currentUser?.lastLoginAt,
    createdAt:
      user?.createdAt !== null ? user.createdAt : currentUser?.createdAt,
    uid: user?.uid !== null ? user.uid : currentUser?.uid,
    email: user?.email !== null ? user.email : currentUser?.email,
    initialToken:
      user?.initialToken !== null
        ? user.initialToken
        : currentUser?.initialToken,
    accessToken:
      user?.accessToken !== null ? user.accessToken : currentUser?.accessToken,
    apiKey: user?.apiKey !== null ? user.apiKey : currentUser?.apiKey,
    expirationTime:
      user?.expirationTime !== null
        ? user.expirationTime
        : currentUser?.expirationTime,
    refreshToken:
      user?.refreshToken !== null
        ? user.refreshToken
        : currentUser?.refreshToken,
    hasPersonalDataCompleted:
      user?.hasPersonalDataCompleted !== null
        ? user.hasPersonalDataCompleted
        : currentUser?.hasPersonalDataCompleted,
    countryCodePhoneNumber:
      user?.countryCodePhoneNumber !== null
        ? user.countryCodePhoneNumber
        : currentUser?.countryCodePhoneNumber,
    phoneNumber:
      user?.phoneNumber !== null ? user.phoneNumber : currentUser?.phoneNumber,
  };
  return defUser;
}

export function getAppState() {
  return useSelector(selectCurrentAppState);
}
