import reqJsonData from "./axios";

export const userLogin = (params) => {
  return reqJsonData
    .fetchPost("/admin/login", params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
