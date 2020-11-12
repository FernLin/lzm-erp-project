<template>
	<div class="ProductDetail-container">
		<div class="ProductDetail-container-header">
			<span class="back-content" @click="back">
				<i class="el-icon-arrow-left" />
				<span>返回</span>
			</span>
		</div>
		<el-form :model="formData" :rules="rules" ref="formData" label-width="100px">
			<el-card shadow="never">
				<div slot="header" class="my-card-header">
					<i class="el-icon-collection-tag" />
					<span>选择商品分类</span>
				</div>
				<el-form-item label="一级分类" prop="firstLevel">
					<el-select v-model="formData.firstLevel" placeholder="请选择一级分类" style="width: 300px" @change="handleChange($event, 'second')">
						<el-option v-for="(item, index) in firstLevelList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级分类" prop="secondLevel">
					<el-select v-model="formData.secondLevel" :disabled="!formData.firstLevel" placeholder="请选择二级分类" style="width: 300px" @change="handleChange($event, 'thired')">
						<el-option v-for="(item, index) in secondLevelList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="三级分类" prop="thiredLevel">
					<el-select v-model="formData.thiredLevel" :disabled="!formData.secondLevel" placeholder="请选择三级分类" style="width: 300px">
						<el-option v-for="(item, index) in thiredLevelList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-card>
			<el-card shadow="never">
				<div slot="header" class="my-card-header">
					<i class="el-icon-collection-tag" />
					<span>商品基本信息</span>
				</div>
				<el-form-item label="商品标题" prop="title">
					<el-input v-model="formData.title" placeholder="请输入商品标题" maxlength="30" show-word-limit style="width: 500px"></el-input>
				</el-form-item>
				<el-form-item label="商品规格" prop="specification">
					<el-input v-model="specification" placeholder="请输入规格名称" style="width: 200px; margin-right: 10px"></el-input>
					<el-button :class="canAdd ? 'primary' : 'is-disabled'" :disabled="!canAdd" @click="addNewAttr" icon="el-icon-plus">新增规格</el-button>
					<span class="note-word" style="margin-left: 10px">*最大可添加6个规格</span>
					<div>
						<AttrAdd v-for="(item, index) in attrList" :key="index" :attrName="item.name" @deleteAttr="deleteAttr" @getValList="getValList(arguments)" />
					</div>
					<el-table :data="attrData" :span-method="objectSpanMethod" class="lzm-table" border style="margin-top: 10px">
						<el-table-column v-for="(item, index) in tableNameList" :key="index" :prop="item.propNmae" :label="item.label" align="center">
							<template slot-scope="scope">
								<span>{{ scope['row'][`${item.propName}`] }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="销售价格" align="center">
							<template slot-scope="scope">
								<el-input v-model="scope.row.price" />
							</template>
						</el-table-column>
						<el-table-column prop="stock" label="商品库存" align="center">
							<template slot-scope="scope">
								<el-input v-model="scope.row.stock" />
							</template>
						</el-table-column>
						<el-table-column prop="lowStock" label="库存预警值" align="center">
							<template slot-scope="scope">
								<el-input v-model="scope.row.lowStock" />
							</template>
						</el-table-column>
						<el-table-column prop="skuCode" label="SKU编码" align="center">
							<template slot-scope="scope">
								<el-input v-model="scope.row.skuCode" />
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item label="商品图片" prop="imageList">
					<span class="note-word" style="margin-left: 10px">*上传图片最佳尺寸720*720，图片大小不超过2M，最多可上传5张图片，默认第一张为主图</span>
					<div class="upload-content">
						<div v-for="(item, index) in formData.imageList" :key="index" class="image-content">
							<img :src="item" class="img-show" />
							<i class="el-icon-error close-icon" @click="deleteAttrVal(item)" />
						</div>
						<el-upload
							v-show="formData.imageList.length < 5"
							class="img-upload"
							accept=".jpg, .png, .bmp"
							action=""
							:show-file-list="false"
							:before-upload="beforeAvatarUpload"
							:http-request="uploadSectionFile"
						>
							<i class="el-icon-plus img-upload-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="商品详情页" prop="productDetail">
					<div class="detail-content">
						<el-upload class="img-upload" accept=".jpg, .png, .bmp" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadDetailFile">
							<img v-if="formData.productDetail" :src="formData.productDetail" class="detail-show" />
							<i v-else class="el-icon-plus img-upload-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
			</el-card>
			<el-card shadow="never">
				<div slot="header" class="my-card-header">
					<i class="el-icon-collection-tag" />
					<span>商品活动</span>
				</div>
				<el-form-item label="棕苞粒" prop="points">
					<el-checkbox v-model="formData.points">下单回馈棕苞粒</el-checkbox>
					<span class="note-word" style="margin-left: 10px">*消费金额回馈相应数量棕苞粒，如：消费100则回馈100棕苞粒</span>
				</el-form-item>
			</el-card>
			<el-card shadow="never">
				<div slot="header" class="my-card-header">
					<i class="el-icon-collection-tag" />
					<span>配送服务</span>
				</div>
				<div>
					<div>
						<el-radio v-model="formData.server" label="1" @change="serveChange">统一运费</el-radio>
						<el-input v-model.trim="formData.unifiedFeight" :disabled="formData.server !== '1'" placeholder="请输入金额" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" style="width: 200px">
							<span slot="prefix" class="deposit-word">￥</span>
						</el-input>
					</div>
					<div style="margin-top: 15px">
						<el-radio v-model="formData.server" label="2" @change="serveChange">运费模版</el-radio>
						<el-select v-model="formData.feightTemplateId" placeholder="请选择配送费模版" style="width: 300px">
							<el-option v-for="(item, index) in templateList" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</div>
				</div>
			</el-card>
			<el-form-item>
				<el-button class="primary" @click="submitForm('formData', 1)">发布商品至出售中</el-button>
				<el-button class="primary" @click="submitForm('formData', 0)">发布商品至下架中</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import AttrAdd from '../Frame/AttrAdd';
import { UploadImg, GetFirstLevelList, GetAllLevelList } from '../../api/common.js';
import { CreateProduct } from '../../api/management.js';
export default {
	name: 'ProductDetail',
	components: { AttrAdd },
	props: {
		detailData: {
			type: Object,
			default() {
				return {};
			},
		},
		componentType: {
			type: String,
			default: '',
		},
	},
	computed: {
		canAdd() {
			return this.specification && this.attrList.length < 6;
		},
	},
	data() {
		return {
			productAttributeList: [], //商品规格及自定义规格属性
			productFeightTemplateRelationList: [], //商品运费关联集合
			skuStockList: [], //商品的sku库存信息
			formData: {
				title: '',
				firstLevel: '',
				secondLevel: '',
				thiredLevel: '',
				specification: ['1'],
				imageList: [],
				pic: '',
				productDetail: '',
				points: false,
				server: '',
				unifiedFeight: '',
				feightTemplateId: '',
			},
			rules: {
				firstLevel: [{ required: true, message: '请选一级分类', trigger: 'change' }],
				secondLevel: [{ required: true, message: '请选二级分类', trigger: 'change' }],
				thiredLevel: [{ required: true, message: '请选三级分类', trigger: 'change' }],
				title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
				specification: [{ required: true }],
				imageList: [{ required: true }],
				productDetail: [{ required: true }],
			},
			firstLevelList: [],
			secondLevelList: [],
			thiredLevelList: [],
			specification: '',
			attrList: [],
			attrData: [],
			tableNameList: [],
			spanArr: [],
			tempList: [],
			templateList: [{ name: '测试模版', id: 1 }],
		};
	},
	watch: {
		attrList: {
			deep: true,
			handler(val) {
				this.spanArr = [];
				this.tempList = val.map((el) => {
					this.spanArr.push(el.value.length);
					return el.value;
				});
				this.attrData = this.getTableData(this.tempList);
			},
		},
	},
	async beforeMount() {
		const res = await GetFirstLevelList();
		if (!_.isEmpty(res)) {
			this.firstLevelList = res;
		}
	},
	methods: {
		back() {
			this.$swal
				.fire({
					title: `确定取消${this.componentType === 'release' ? '发布' : '编辑'}当前商品？`,
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						this.$emit('cancel');
					}
				});
		},
		async handleChange(e, type) {
			const res = await GetAllLevelList(e);
			if (type === 'second') {
				this.formData.secondLevel = '';
				this.formData.thiredLevel = '';
				this.secondLevelList = res;
			} else {
				this.formData.thiredLevel = '';
				this.thiredLevelList = res;
			}
		},
		// 新增规格
		addNewAttr() {
			const res = _.find(this.attrList, (el) => {
				return el.name === this.specification;
			});
			if (_.isEmpty(res)) {
				this.attrList.push({
					name: this.specification,
					value: [{ [this.specification]: '' }],
				});
				this.tableNameList.push({
					propName: this.specification,
					label: this.specification,
				});
			} else {
				this.$message.error('当前规格已存在，请重新添加！');
			}
			this.specification = '';
		},
		// 删除规格
		deleteAttr(val) {
			this.attrList = this.attrList.filter((el) => {
				return el.name !== val;
			});
			this.tableNameList = this.tableNameList.filter((el) => {
				return el.propName !== val;
			});
		},
		// 上传之前进行文件类型判断
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (isLt2M) {
				if (!/(jpeg|png|bmp)$/.test(file.type)) {
					this.$message.error('只允许上传jpg、jpeg、png、bmp类型文件！');
					return false;
				} else {
					return true;
				}
			} else {
				this.$message.error('上传图片大小不能超过 2MB!');
				return false;
			}
		},
		// 上传图片获取图片的url
		async uploadSectionFile(params) {
			const res = await UploadImg(params.file);
			if (!_.isEmpty(res)) {
				this.formData.imageList.push(res);
			}
		},
		// 上传图片获取图片的url
		async uploadDetailFile(params) {
			const res = await UploadImg(params.file);
			if (!_.isEmpty(res)) {
				this.formData.productDetail = res;
			}
		},
		submitForm(formName, publishStatus) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const productAttributeList = this.attrList.map((el) => {
						return {
							name: el.name,
							inputList: _.join(
								el.value.map((val) => {
									return val[el.name];
								}),
								','
							),
						};
					});
					const skuData = this.getSKUData(this.tempList);
					const skuStockList = this.attrData.map((el, index) => {
						return {
							price: el.price,
							stock: el.stock,
							lowStock: el.lowStock,
							skuCode: el.skuCode,
							spData: JSON.stringify(skuData[index]),
						};
					});
					let params = {
						pmsProductParam: {
							albumPics: _.join(this.formData.imageList, ','), //画册图片，连产品图片限制为5张，以逗号分割 ,
							feightTemplateId: this.formData.feightTemplateId, //运费模板id ,
							industryId: 3, //行业id ,
							isGiftPoint: this.formData.points ? 1 : 0, //是否赠送积分:0->否；1->是 ,
							name: this.formData.title, //商品标题 ,
							pic: this.formData.imageList[0], //商品图片，主图
							productCategory1Id: this.formData.firstLevel, //商品分类1id ,
							productCategory1Name: this.getCategoryName(this.formData.firstLevel, this.firstLevelList), //商品分类1名称 ,
							productCategory2Id: this.formData.secondLevel, //商品分类2id ,
							productCategory2Name: this.getCategoryName(this.formData.secondLevel, this.secondLevelList), //商品分类2名称
							productCategory3Id: this.formData.thiredLevel, //商品分类3id ,
							productCategory3Name: this.getCategoryName(this.formData.thiredLevel, this.thiredLevelList), //商品分类3名称 ,
							publishStatus: publishStatus, //上架状态：0->下架；1->上架 ,
							shopId: 38, //店铺id ,
							unifiedFeight: this.formData.unifiedFeight, //统一运费
						},
						productAttributeList, //商品规格及自定义规格属性
						// productFeightTemplateRelationList: 1, //商品运费关联集合
						skuStockList, //商品的sku库存信息
					};
					const res = await CreateProduct(params);
					console.log(res);
				} else {
					return false;
				}
			});
		},
		// 获取规格值
		getValList(msg) {
			this.attrList = this.attrList.map((el) => {
				if (el.name === msg[0]) {
					if (!_.isEmpty(msg[1])) {
						el.value = _.cloneDeep(msg[1]);
					} else {
						el.value = _.cloneDeep([{ [msg[0]]: '' }]);
					}
				}
				return el;
			});
		},
		// 表格合并行
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			for (let index = 0; index < this.spanArr.length - 1; index++) {
				if (columnIndex === index) {
					let _rowSpan = 1;
					for (let j = index + 1; j < this.spanArr.length; j++) {
						_rowSpan *= this.spanArr[j];
					}
					if (rowIndex % _rowSpan === 0) {
						return {
							rowspan: _rowSpan,
							colspan: 1,
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0,
						};
					}
				}
			}
		},
		// 获取表格数据
		getTableData(arr) {
			if (arr.length == 0) return [];
			if (arr.length == 1) {
				let res = [];
				for (let i in arr[0]) {
					let newObj = { ...arr[0][i], ...{ price: '', stock: '', lowStock: '', skuCode: '' } };
					res.push(newObj);
				}
				return res;
			} else {
				let result = arr.reduce((pre, cur) => {
					if (cur.length != 0) {
						let res = [];
						for (let i in pre) {
							for (let j in cur) {
								let newObj = { ...pre[i], ...cur[j], ...{ price: '', stock: '', lowStock: '', skuCode: '' } };
								res.push(newObj);
							}
						}
						return res;
					} else {
						let res = [];
						for (let i in pre) {
							let newObj = { ...pre[i], ...{ price: '', stock: '', lowStock: '', skuCode: '' } };
							res.push(newObj);
						}
						return res;
					}
				});
				return result;
			}
		},
		getSKUData(arr) {
			if (arr.length == 0) return [];
			if (arr.length == 1) {
				let res = [];
				arr[0].forEach((element) => {
					let newObj = [element];
					res.push(newObj);
				});
				return res;
			} else {
				let result = arr.reduce(function (pre, cur) {
					if (cur.length != 0) {
						let res = [];
						for (let i = 0; i < pre.length; i++) {
							for (let j = 0; j < cur.length; j++) {
								let newObj = [pre[i], cur[j]];
								res.push(newObj);
							}
						}
						return res;
					} else {
						return pre;
					}
				});
				return result;
			}
		},
		getCategoryName(id, list) {
			const res = _.find(list, (el) => {
				return el.id === id;
			});
			if (!_.isEmpty(res)) {
				return res.name;
			} else {
				return '';
			}
		},
		serveChange(val) {
			if (val === '2') {
				this.formData.unifiedFeight = '';
			} else {
				this.formData.feightTemplateId = '';
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.ProductDetail-container {
	&-header {
		margin-bottom: 20px;
		.back-content {
			font-weight: bold;
			cursor: pointer;
			& .el-icon-arrow-left {
				font-weight: bold;
			}
		}
	}
	.my-card-header {
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
	}
	.upload-content {
		display: flex;
		.image-content {
			position: relative;
			.img-show {
				width: 80px;
				height: 80px;
				display: block;
				margin-right: 10px;
			}
			.close-icon {
				position: absolute;
				top: -7px;
				right: 2px;
				color: $delete-color;
				font-size: 18px;
				cursor: pointer;
			}
		}

		.img-upload-icon {
			font-size: 28px;
			color: $border-color;
			width: 80px;
			height: 80px;
			line-height: 80px;
			text-align: center;
		}
	}
	.detail-content {
		align-items: flex-start;
		.detail-show {
			width: 80px;
			height: 80px;
			display: block;
		}
		.img-upload-icon {
			font-size: 28px;
			color: $border-color;
			width: 80px;
			height: 80px;
			line-height: 80px;
			text-align: center;
		}
	}
	.deposit-word {
		height: 35px;
		line-height: 35px;
		font-size: 18px;
		font-weight: bold;
		color: $black-color;
	}
}
</style>
