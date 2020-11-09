<template>
	<div class="eventDetail-container">
		<div class="eventDetail-container-header">
			<span class="back-content" @click="back">
				<i class="el-icon-arrow-left" />
				<span>返回</span>
			</span>
			<el-button class="primary" @click="addData">添加</el-button>
		</div>
		<el-table :data="dataList" class="lzm-table" style="width: 100%">
			<el-table-column prop="sort" label="编号"> </el-table-column>
			<el-table-column prop="pic" label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.pic" class="image" />
				</template>
			</el-table-column>
			<el-table-column prop="url" label="链接"> </el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<span class="manage" @click="editData(scope.row)">编辑</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="pageSizes"
			:page-size="pageSize"
			layout="sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
		<FloatContainer v-if="showPopup">
			<template v-slot:header>
				<div class="float-header">商城首页活动轮播图</div>
			</template>
			<template v-slot:body>
				<div class="float-body">
					<div class="float-item">
						<span>编号：</span>
						<el-input v-model.trim="paramData.sort" placeholder="请输入编号" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
					</div>
					<div class="float-item img-content">
						<span>图片：</span>
						<el-upload class="img-upload" accept=".jpg, .png, .bmp" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadSectionFile">
							<img v-if="paramData.pic" :src="paramData.pic" class="img-show" />
							<i v-else class="el-icon-plus img-upload-icon"></i>
						</el-upload>
					</div>
					<div class="float-item">
						<span>链接：</span>
						<el-input v-model.trim="paramData.url" placeholder="请输入链接地址" />
					</div>
					<div class="float-btn">
						<el-button :class="isDisable ? 'is-disabled' : 'primary'" :disabled="isDisable" @click="saveEdit">保存</el-button>
						<el-button class="dark" @click="hideFloatTemplate">关闭</el-button>
					</div>
				</div>
			</template>
		</FloatContainer>
	</div>
</template>

<script>
import { GetAdList, AddAdvertise, UpdateAdvertise } from '../../api/management.js';
import { UploadImg } from '../../api/common.js';
import FloatContainer from '../Frame/FloatContainer';
export default {
	name: 'EventDetail',
	components: { FloatContainer },
	props: {
		industryId: {
			type: Number,
		},
		industryName: {
			type: String,
		},
	},
	data() {
		return {
			showPopup: false,
			dataList: [],
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
			currentStatus: '',
			paramData: {},
			editID: '',
		};
	},
	computed: {
		isDisable() {
			return !this.paramData.sort || !this.paramData.pic || !this.paramData.url;
		},
	},
	beforeMount() {
		this.getAdListData();
	},
	methods: {
		async getAdListData(pageNum = 1, pageSize = 10) {
			let params = {
				industryId: this.industryId,
				pageNum,
				pageSize,
			};
			const res = await GetAdList(params);
			if (!_.isEmpty(res)) {
				this.dataList = res.list;
				this.total = res.total;
			}
		},
		back() {
			this.$emit('back');
		},
		// 添加按钮点击事件
		addData() {
			this.currentStatus = 'add';
			this.paramData = {
				sort: '', // 编号
				pic: '', // 图片地址
				industryId: this.industryId, // 分类id
				industryName: this.industryName, // 分类名称
				url: '', // 链接地址
				name: 'test', // 轮播图名称 TODO:跟廖民确认是否添加
			};
			this.showPopup = true;
		},
		// 编辑按钮的点击事件
		editData(data) {
			this.currentStatus = 'edit';
			this.paramData = {
				sort: data.sort, // 编号
				pic: data.pic, // 图片地址
				industryId: this.industryId, // 分类id
				industryName: this.industryName, // 分类名称
				url: data.url, // 链接地址
				name: 'test', // 轮播图名称 TODO:跟廖民确认是否添加
			};
			this.editID = data.id;
			this.showPopup = true;
		},
		// 关闭弹窗
		hideFloatTemplate() {
			this.$swal
				.fire({
					title: '是否确认关闭当前编辑页面？',
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						this.paramData = {};
						this.showPopup = false;
					}
				});
		},
		// 保存编辑
		async saveEdit() {
			if (this.currentStatus === 'add') {
				const res = await AddAdvertise(this.paramData);
				this.getAdListData();
			} else {
				const res = await UpdateAdvertise(this.editID, this.paramData);
				this.getAdListData();
			}
			this.showPopup = false;
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
				this.paramData.pic = res;
			}
		},
		// 改变pageSize事件
		handleSizeChange(val) {
			this.pageSize = val;
			this.currentPage = 1;
			this.getAdListData(this.currentPage, val);
		},
		// 跳转页面事件
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getAdListData(val, this.pageSize);
		},
	},
};
</script>
<style lang="scss" scoped>
.eventDetail-container {
	width: 100%;
	&-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		.back-content {
			font-weight: bold;
			cursor: pointer;
			& .el-icon-arrow-left {
				font-weight: bold;
			}
		}
	}
	.image {
		max-width: 24px;
		max-height: 24px;
		min-width: 24px;
		min-height: 24px;
		display: inline-block;
		vertical-align: middle;
	}
	.manage {
		cursor: pointer;
		color: $link-font;
		padding-bottom: 2px;
		border-bottom: 1px solid $link-font;
	}
	.float-body {
		width: 400px;
		.float-item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			& span {
				display: inline-block;
				min-width: 60px;
			}
			&.img-content {
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
		.float-btn {
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}
}
</style>
