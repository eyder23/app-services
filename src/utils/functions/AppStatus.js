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
      user?._idPerson === undefined ? currentUser._idPerson : user?._idPerson,
    _idAddress:
      user?._idAddress === undefined
        ? currentUser._idAddress
        : user?._idAddress,
    displayName:
      user?.displayName === undefined
        ? currentUser?.displayName
        : user.displayName,
    lastLoginAt:
      user?.lastLoginAt === undefined
        ? currentUser?.lastLoginAt
        : user.lastLoginAt,
    createdAt:
      user?.createdAt === undefined ? currentUser?.createdAt : user.createdAt,
    uid: user?.uid === undefined ? currentUser?.uid : user.uid,
    email: user?.email === undefined ? currentUser?.email : user.email,
    initialToken:
      user?.initialToken === undefined
        ? currentUser?.initialToken
        : user.initialToken,
    accessToken:
      user?.accessToken === undefined
        ? currentUser?.accessToken
        : user.accessToken,
    apiKey: user?.apiKey === undefined ? currentUser?.apiKey : user.apiKey,
    expirationTime:
      user?.expirationTime === undefined
        ? currentUser?.expirationTime
        : user.expirationTime,
    refreshToken:
      user?.refreshToken === undefined
        ? currentUser?.refreshToken
        : user.refreshToken,
    hasPersonalDataCompleted:
      user?.hasPersonalDataCompleted === undefined
        ? currentUser?.hasPersonalDataCompleted
        : user.hasPersonalDataCompleted,
    countryCodePhoneNumber:
      user?.countryCodePhoneNumber === undefined
        ? currentUser?.countryCodePhoneNumber
        : user.countryCodePhoneNumber,
    phoneNumber:
      user?.phoneNumber === undefined
        ? currentUser?.phoneNumber
        : user.phoneNumber,
    personalInformation:
      user?.personalInformation === undefined
        ? currentUser?.personalInformation
        : user.personalInformation,
  };
  return defUser;
}

export function getAppState() {
  return useSelector(selectCurrentAppState);
}
