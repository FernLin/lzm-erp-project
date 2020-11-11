import reqJsonData from "./axios";

export const UserLogin = (params) => {
  return reqJsonData
    .fetchPost("/merchant/login", params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UserLogout = () => {
	return reqJsonData
	  .fetchPost("/merchant/logout")
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
};

export const RefreshToken = () => {
	return reqJsonData
	  .fetchGet("/merchant/refreshToken")
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
};

export const GetUserInfo = () => {
	return reqJsonData
	  .fetchGet("/merchant/info")
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
};
