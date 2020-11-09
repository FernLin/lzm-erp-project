<template>
	<div class="sortPage-container">
		<div class="filter-content">
			<el-input v-model="filterCondition" placeholder="输入商品分类名称" style="width: 330px">
				<el-button slot="append" icon="el-icon-search" @click="filterEvent">搜索</el-button>
			</el-input>
			<el-button class="primary" icon="el-icon-plus" @click="addNew">新增商品分类</el-button>
		</div>
		<el-table :data="sortList" class="lzm-table">
			<el-table-column prop="icon" label="分类图标" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.icon" class="image" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="分类名称" align="center" width="200"> </el-table-column>
			<el-table-column prop="sort" label="分类编码" align="center"> </el-table-column>
			<el-table-column label="操作" align="center" width="120">
				<template slot-scope="scope">
					<div class="manage-content">
						<span class="manage" @click="editData(scope.row)">修改</span>
						<span class="manage" @click="delelteData(scope.row)">删除</span>
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
		<SortPageDetail v-if="showPopup" :popupType="popupType" :currentData="currentData" @hidenPopup="hidenPopup" />
	</div>
</template>

<script>
import SortPageDetail from '../../components/MallManagement/SortPageDetail';
import { GetProductCategoryList, DeleteProductCategory, GetProductCategoryDetail } from '../../api/management.js';
export default {
	name: 'SortPage',
	components: { SortPageDetail },
	data() {
		return {
			currentData: {
				pmsProductCategoryShow: {
					name: '',
					sort: '',
					icon: '',
				},
				pmsProductCategoryShowChildList: [],
			},
			showPopup: false,
			filterCondition: '',
			popupType: '',
			sortList: [],
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
		};
	},
	beforeMount() {
		this.filterEvent();
	},
	methods: {
		async filterEvent() {
			let params = {
				name: this.filterCondition,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			const res = await GetProductCategoryList(params);
			if (!_.isEmpty(res)) {
				this.sortList = res.list;
				this.total = res.total;
			}
		},
		addNew() {
			this.popupType = 'add';
			this.showPopup = true;
		},
		async editData(data) {
			const res = await GetProductCategoryDetail(data.id);
			if (!_.isEmpty(res)) {
				this.popupType = 'edit';
				this.currentData = res;
				this.showPopup = true;
			}
		},
		delelteData(data) {
			this.$swal
				.fire({
					title: `是否确认删除此分类？`,
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						const res = await DeleteProductCategory(data.id);
						if (res) {
							this.$message.success('删除商品分类成功');
							this.filterEvent();
						}
					}
				});
		},
		hidenPopup(fresh = false) {
			if (fresh) this.filterEvent();
			this.currentData = {
				pmsProductCategoryShow: {
					name: '',
					sort: '',
					icon: '',
				},
				pmsProductCategoryShowChildList: [],
			};
			this.showPopup = false;
		},
		// 改变pageSize事件
		handleSizeChange(val) {
			this.pageSize = val;
			this.currentPage = 1;
			this.filterEvent();
		},
		// 跳转页面事件
		handleCurrentChange(val) {
			this.currentPage = val;
			this.filterEvent();
		},
	},
};
</script>
<style lang="scss" scoped>
.sortPage-container {
	padding: 20px 10px;
	.filter-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		.select-content {
			display: flex;
			align-items: center;
			.label-word {
				margin-right: 6px;
			}
		}
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
	.image {
		max-width: 24px;
		max-height: 24px;
		min-width: 24px;
		min-height: 24px;
		display: inline-block;
		vertical-align: middle;
	}
}
</style>
