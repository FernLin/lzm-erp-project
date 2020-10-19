import reqJsonData from "./axios";

export const getVerificationCode = (params) => {
  return reqJsonData
    .fetchPost("/signUp/sendVerification", params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const register = (params) => {
  return reqJsonData
    .fetchPost("/signUp/registerMember", params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
