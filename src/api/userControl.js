import reqJsonData from "./axios";

export const UserLogin = (params) => {
  return reqJsonData
    .fetchPost("/admin/login", params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UserLogout = () => {
	return reqJsonData
	  .fetchPost("/admin/logout")
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
  };
