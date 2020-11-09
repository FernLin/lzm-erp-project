<template>
	<FloatContainer class="sortPageDetail-container">
		<template v-slot:header>
			<div>商品分类</div>
		</template>
		<template v-slot:body>
			<div class="float-body">
				<div class="detail-item">
					<span class="lable-word">分类名称：</span>
					<el-input v-model="typeName" placeholder="请输入分类名称" style="width: 300px" maxlength="5" show-word-limit />
				</div>
				<div class="detail-item">
					<span class="lable-word">分类编号：</span>
					<el-input v-model="typeNum" placeholder="请设置数字编号" style="width: 300px" />
				</div>
				<div class="detail-item img-content">
					<span class="lable-word" style="margin-top: 10px">商品关联：</span>
					<div class="product-content">
						<div class="level-select-content">
							<el-select v-model="firstLevel" placeholder="请选择商品" @change="handleChange($event, 'first')">
								<el-option v-for="item in firstList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
							<el-card class="box-card">
								<div v-for="(level, index) in selectedList" :key="index" class="box-card-item">
									<el-tooltip :content="level.productCategory1Name" placement="top" effect="light">
										<div class="box-card-content">
											<span>{{ level.productCategory1Name }}</span>
											<i v-if="!level.productCategory2Name" class="el-icon-error error-icon" @click="deleteSelect(index)" />
										</div>
									</el-tooltip>
								</div>
							</el-card>
						</div>
						<div class="level-select-content" style="margin-left: 10px">
							<el-select v-model="secondLevel" placeholder="请选择商品" :disabled="!firstLevel" @change="handleChange($event, 'second')">
								<el-option v-for="item in secondList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
							<el-card class="box-card">
								<div v-for="(level, index) in selectedList" :key="index" class="box-card-item">
									<el-tooltip v-if="level.productCategory2Name" :content="level.productCategory2Name" placement="top" effect="light">
										<div class="box-card-content">
											<span>{{ level.productCategory2Name }}</span>
											<i v-if="!level.productCategory3Name" class="el-icon-error error-icon" @click="deleteSelect(index)" />
										</div>
									</el-tooltip>
									<div v-else class="none-select">无</div>
								</div>
							</el-card>
						</div>
						<div class="level-select-content" style="margin-left: 10px">
							<el-select v-model="thiredLevel" placeholder="请选择商品" :disabled="!secondLevel">
								<el-option v-for="item in thiredList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
							<el-card class="box-card">
								<div v-for="(level, index) in selectedList" :key="index" class="box-card-item">
									<el-tooltip v-if="level.productCategory3Name" :content="level.productCategory3Name" placement="top" effect="light">
										<div class="box-card-content">
											<span>{{ level.productCategory3Name }}</span>
											<i class="el-icon-error error-icon" @click="deleteSelect(index)" />
										</div>
									</el-tooltip>
									<div v-else class="none-select">无</div>
								</div>
							</el-card>
						</div>
						<el-button :class="firstLevel ? 'primary' : 'is-disabled'" :disabled="!firstLevel" @click="addProduct" style="margin: 2px 0 0 10px">添加</el-button>
					</div>
				</div>
				<div class="detail-item img-content">
					<span class="lable-word">分类图标：</span>
					<div>
						<el-upload class="img-upload" accept=".jpg, .png, .bmp" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadSectionFile">
							<img v-if="imageUrl" :src="imageUrl" class="img-show" />
							<i v-else class="el-icon-plus img-upload-icon"></i>
						</el-upload>
						<span class="note-word">上传图片的最佳尺寸：300*300</span>
					</div>
				</div>
				<div class="btn-content">
					<el-button :class="isDisable ? 'is-disabled' : 'primary'" :disabled="isDisable" @click="saveEdit">保存</el-button>
					<el-button class="dark" @click="cancelEdit">取消</el-button>
				</div>
			</div>
		</template>
	</FloatContainer>
</template>

<script>
import FloatContainer from '../Frame/FloatContainer';
import { GetFirstLevelList, GetAllLevelList, UploadImg } from '../../api/common.js';
import { CreateProductCategory, UpdateProductCategory } from '../../api/management.js';
export default {
	name: 'SortPageDetail',
	components: { FloatContainer },
	props: {
		popupType: {
			type: String,
			default: '',
		},
		currentData: {
			type: Object,
			default() {
				return {
					pmsProductCategoryShow: {
						name: '',
						sort: '',
						icon: '',
					},
					pmsProductCategoryShowChildList: [],
				};
			},
		},
	},
	computed: {
		isDisable() {
			return !this.typeName || !this.typeNum || _.isEmpty(this.selectedList) || !this.imageUrl;
		},
	},
	data() {
		return {
			typeName: this.currentData.pmsProductCategoryShow.name,
			typeNum: this.currentData.pmsProductCategoryShow.sort,
			imageUrl: this.currentData.pmsProductCategoryShow.icon,
			firstLevel: '',
			firstList: [],
			secondLevel: '',
			secondList: [],
			thiredLevel: '',
			thiredList: [],
			selectedList: this.currentData.pmsProductCategoryShowChildList,
		};
	},
	async beforeMount() {
		const res = await GetFirstLevelList();
		if (!_.isEmpty(res)) {
			this.firstList = res;
		}
	},
	methods: {
		// 创建/修改商品
		addProduct() {
			const firstSelected = _.find(this.firstList, (item) => {
				return item.id === this.firstLevel;
			});
			const secondSelected = _.find(this.secondList, (item) => {
				return item.id === this.secondLevel;
			});
			const thiredSelected = _.find(this.thiredList, (item) => {
				return item.id === this.thiredLevel;
			});
			const hasVal = _.find(this.selectedList, (item) => {
				return `${item.productCategory1Id}-${item.productCategory2Id}-${item.productCategory3Id}` === `${firstSelected.id}-${secondSelected.id}-${thiredSelected.id}`;
			});
			if (!_.isEmpty(hasVal)) {
				this.$message.warning('当前商品分类已存在，请重新选择！');
				return;
			}
			this.selectedList.push({
				productCategory1Id: firstSelected.id,
				productCategory1Name: firstSelected.name,
				productCategory2Id: secondSelected ? secondSelected.id : '',
				productCategory2Name: secondSelected ? secondSelected.name : '',
				productCategory3Id: thiredSelected ? thiredSelected.id : '',
				productCategory3Name: thiredSelected ? thiredSelected.name : '',
			});
			this.firstLevel = '';
			this.secondLevel = '';
			this.thiredLevel = '';
		},
		// 删除已选择的商品
		deleteSelect(index) {
			this.selectedList = _.filter(this.selectedList, (item, i) => {
				return i !== index;
			});
		},
		async handleChange(val, type) {
			const res = await GetAllLevelList(val);
			if (!_.isEmpty(res)) {
				if (type === 'first') {
					this.secondList = res;
				} else {
					this.thiredList = res;
				}
			}
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
				this.$message.error('上传头像图片大小不能超过 2MB!');
				return false;
			}
		},
		// 上传图片获取图片的url
		async uploadSectionFile(params) {
			const res = await UploadImg(params.file);
			if (!_.isEmpty(res)) {
				this.imageUrl = res;
			}
		},
		async saveEdit() {
			if (this.popupType === 'edit') {
				const id = this.currentData.pmsProductCategoryShow.id;
				this.selectedList = this.selectedList.map((el) => {
					return {
						...el,
						id,
					};
				});
			}
			let params = {
				pmsProductCategoryShow: {
					...this.currentData.pmsProductCategoryShow,
					...{
						name: this.typeName,
						sort: this.typeNum,
						icon: this.imageUrl,
						industryId: 3,
						industryName: '商城',
					},
				},
				pmsProductCategoryShowChildList: this.selectedList,
			};
			if (this.popupType === 'add') {
				const res = await CreateProductCategory(params);
				if (res) {
					this.$message.success('创建商品分类成功！');
					this.$emit('hidenPopup', true);
				}
			} else {
				const res = await UpdateProductCategory(params);
				if (res) {
					this.$message.success('修改商品分类成功！');
					this.$emit('hidenPopup', true);
				}
			}
		},
		cancelEdit() {
			this.$swal
				.fire({
					title: `是否确认取消${this.popupType === 'add' ? '新增' : '修改'}此类？`,
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						this.$emit('hidenPopup');
					}
				});
		},
	},
};
</script>
<style lang="scss" scoped>
.sortPageDetail-container {
	padding: 20px 10px;
	.float-body {
		.detail-item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}
		.lable-word {
			display: inline-block;
			width: 80px;
		}
		.btn-content {
			margin: 30px 0 0 80px;
			display: inline-flex;
			width: 280px;
			align-items: center;
			justify-content: space-between;
		}
		.product-content {
			display: flex;
			align-items: flex-start;
			.level-select-content {
				display: inline-flex;
				width: 200px;
				flex-direction: column;
				.box-card {
					margin-top: 10px;
					height: 150px;
					overflow-y: auto;
					.none-select {
						height: 14px;
						text-align: center;
						color: $disable-font;
					}
					&-item {
						border: 1px solid $border-color;
						padding: 6px 4px;
						margin-bottom: 4px;
						text-align: center;
						border-radius: 5px;
						font-size: 14px;
						position: relative;
						.error-icon {
							color: red;
							position: absolute;
							bottom: 16px;
							right: -8px;
							font-size: 16px;
							cursor: pointer;
						}

						.box-card-content {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
		.img-content {
			align-items: flex-start;
			.img-show {
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
	}
}
</style>
