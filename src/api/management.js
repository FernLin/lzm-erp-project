import reqJsonData from './axios';

/** 商城/上下游/中端管理--商品管理模块 */
// 获取商品列表
export const GetProductList = (params) => {
	return reqJsonData
		.fetchPost('/product/getStatuePageByQueryParam', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 上架/下架单个商品
export const OperateProduct = (id, param) => {
	return reqJsonData
		.fetchPost(`/product/updatePublishStatus/${id}?publishStatus=${param}`)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 批量上架/下架商品
export const BatchOperateProduct = (params) => {
	return reqJsonData
		.fetchPost('/product/updatePublishStatusBatch', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 批量删除商品
export const BatchDeleteProduct = (params) => {
	return reqJsonData
		.fetchPost('/product/deleteBatch', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

// 添加商品
export const CreateProduct = (params) => {
	return reqJsonData
		.fetchPost('/product/create', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
