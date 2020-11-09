import reqJsonData from './axios';
/** 活动管理--轮播图模块 */
// 轮播图列表
export const GetAdList = (params) => {
	return reqJsonData
		.fetchPost('/home/advertise/page', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 添加轮播图
export const AddAdvertise = (params) => {
	return reqJsonData
		.fetchPost('/home/advertise/create', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 编辑轮播图
export const UpdateAdvertise = (id, params) => {
	return reqJsonData
		.fetchPost(`/home/advertise/update/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 活动管理--轮播图模块 */
// 限时秒杀商品列表
export const GetProductSkillList = (params) => {
	return reqJsonData
		.fetchPost('/productSkill/getPage', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 添加限时秒杀商品
export const CreateProductSkill = (params) => {
	return reqJsonData
		.fetchPost('/productSkill/create', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 修改限时秒杀商品
export const UpdateProductSkill = (id, params) => {
	return reqJsonData
		.fetchPost(`/home/advertise/update/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 删除限时秒杀商品
export const DeleteProductSkill = (id, params) => {
	return reqJsonData
		.fetchPost(`/productSkill/update/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 店铺管理--上下游店铺模块 */
// 获取店铺列表
export const GetUDShopList = (params) => {
	return reqJsonData
		.fetchPost('/pms/marchantApply/page', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 发放棕苞粒
export const UDDistributePoints = (params) => {
	return reqJsonData
		.fetchPost('/pms/marchantApply/issueIntegration', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取店铺详情信息
export const GetUDShopDetail = (id, params) => {
	return reqJsonData
		.fetchPost(`/pms/marchantApply/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 修改店铺状态
export const UDUpdateShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/pms/marchantApply/updateClosedStatus', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 审核店铺状态
export const UDVerifyShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/pms/marchantApply/verify', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 店铺管理--农林店铺模块 */
// 获取店铺列表
export const GetAgricultureShopList = (params) => {
	return reqJsonData
		.fetchPost('/operatorApply/page', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 发放棕苞粒
export const AgricultureDistributePoints = (params) => {
	return reqJsonData
		.fetchPost('/operatorApply/issueIntegration', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取店铺详情信息
export const GetAgricultureShopDetail = (id, params) => {
	return reqJsonData
		.fetchPost(`/operatorApply/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 修改店铺状态
export const AgricultureUpdateShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/operatorApply/updateClosedStatus', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 审核店铺状态
export const AgricultureVerifyShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/operatorApply/verify', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 店铺管理--二手店铺模块 */
// 获取店铺列表
export const GetSHShopList = (params) => {
	return reqJsonData
		.fetchPost('/ems/marchantApply/page', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 发放棕苞粒
export const SHDistributePoints = (params) => {
	return reqJsonData
		.fetchPost('/ems/marchantApply/issueIntegration', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取店铺详情信息
export const GetSHShopDetail = (id, params) => {
	return reqJsonData
		.fetchPost(`/ems/marchantApply/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 修改店铺状态
export const SHUpdateShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/ems/marchantApply/updateClosedStatus', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 审核店铺状态
export const SHVerifyShopStatus = (params) => {
	return reqJsonData
		.fetchPost('/ems/marchantApply/verify', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 商城管理--分类管理模块 */
// 获取分类列表
export const GetProductCategoryList = (params) => {
	return reqJsonData
		.fetchPost('/pms/productCategoryShow/getPage', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取商品分类详细信息
export const GetProductCategoryDetail = (id, params) => {
	return reqJsonData
		.fetchPost(`/pms/productCategoryShow/getItem/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 删除分类
export const DeleteProductCategory = (id, params) => {
	return reqJsonData
		.fetchPost(`/pms/productCategoryShow/delete/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 创建分类
export const CreateProductCategory = (params) => {
	return reqJsonData
		.fetchPost('/pms/productCategoryShow/create', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 编辑分类
export const UpdateProductCategory = (params) => {
	return reqJsonData
		.fetchPost('/pms/productCategoryShow/update', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

/** 商城/上下游/中端管理--商品管理模块 */
// 获取商品列表
export const GetProductList = (params) => {
	return reqJsonData
		.fetchPost('/product/getPage', params)
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

/** 商城/上下游/中端管理--订单管理模块 */
// 获取订单列表
export const GetOrderList = (params) => {
	return reqJsonData
		.fetchPost('/orderSub/getPage', params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取订单数
export const GetOrderNum = (industryId, params) => {
	return reqJsonData
		.fetchPost(`/orderSub/countAllPlatform/${industryId}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取订单详情
export const GetOrderDetail = (id, params) => {
	return reqJsonData
		.fetchPost(`/orderSub/${id}`, params)
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
};

