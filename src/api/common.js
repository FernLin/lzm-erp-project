import reqJsonData from "./axios";

export const UploadImg = (file) => {
	let config = {
		headers: { 'Content-Type': 'multipart/form-data;' }
	};
	let param = new FormData(); // 创建form对象
	param.append('multipartFile', file);
	return reqJsonData
		.fetchPost("/oss/upload/image", param, config)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

// 获取一级分类
export const GetFirstLevelList = () => {
	return reqJsonData
	  .fetchGet("/merchantApplyCategory/getLevel1All")
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
};

// 获取二级/三级分类
export const GetAllLevelList = (id) => {
	return reqJsonData
	  .fetchGet(`/merchantApplyCategory/getListAllByParentId/${id}`)
	  .then((data) => {
		return data;
	  })
	  .catch((err) => {
		console.log(err);
	  });
};
