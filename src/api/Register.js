import reqJsonData from "./axios";
// 接口文档: https://github.com/found-solutions/CRM-Back-End/tree/develop

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
