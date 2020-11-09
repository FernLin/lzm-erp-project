<template>
	<div class="snapUpEventList-container">
		<div v-if="!showProductDetail">
			<div class="snapUpEventList-container-header">
				<span class="back-content" @click="back">
					<i class="el-icon-arrow-left" />
					<span>返回</span>
				</span>
				<el-button class="primary" @click="addData">添加</el-button>
			</div>
			<el-table :data="dataList" class="lzm-table" height="100%" style="width: 100%">
				<el-table-column prop="id" label="编号" align="center"> </el-table-column>
				<el-table-column prop="imgUrl" label="商品图片" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.imgUrl" class="image" />
					</template>
				</el-table-column>
				<el-table-column prop="title" label="商品标题" align="center"> </el-table-column>
				<el-table-column prop="quantity" label="秒杀数量" align="center"> </el-table-column>
				<el-table-column prop="status" label="状态" align="center"> </el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template slot-scope="scope">
						<div class="manage-content">
							<span class="manage" @click="editData(scope.row)">编辑</span>
							<span class="manage" @click="deleteData(scope.row)">移除</span>
						</div>
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
		</div>
		<SnapUpEventDetail v-else :status="status" @backToList="handleBack" />
	</div>
</template>

<script>
import SnapUpEventDetail from './SnapUpEventDetail';
import { GetProductSkillList } from '../../api/management';
export default {
	name: 'SnapUpEventList',
	components: { SnapUpEventDetail },
	props: {
		industryId: {
			type: Number,
		},
	},
	data() {
		return {
			showProductDetail: false,
			status: '',
			dataList: [],
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
		};
	},
	beforeMount() {
		this.getListData();
	},
	methods: {
		async getListData() {
			const params = {
				industryId: this.industryId,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			const res = await GetProductSkillList(params);
			if (!_.isEmpty(res)) {
				this.dataList = res.list;
				this.total = res.total;
			}
		},
		back() {
			this.$emit('back');
		},
		handleBack() {
			this.showProductDetail = false;
		},
		addData() {
			console.log('添加秒杀商品');
			this.status = 'add';
			this.showProductDetail = true;
		},
		editData(data) {
			console.log('编辑秒杀商品', data);
			this.status = 'edit';
			this.showProductDetail = true;
		},
		deleteData(data) {
			this.$swal
				.fire({
					title: '是否确认删除此秒杀商品？',
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						console.log('删除秒杀商品', data);
					}
				});
		},
		// 改变pageSize事件
		handleSizeChange(val) {
			this.pageSize = val;
			this.currentPage = 1;
			this.getListData();
		},
		// 跳转页面事件
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getListData();
		},
	},
};
</script>
<style lang="scss" scoped>
.snapUpEventList-container {
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
	.manage-content {
		display: flex;
		justify-content: space-around;
		.manage {
			cursor: pointer;
			color: $link-font;
			padding-bottom: 2px;
			border-bottom: 1px solid $link-font;
		}
	}
}
</style>
