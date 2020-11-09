<template>
	<div class="productList-container">
		<div class="filter-content">
			<div class="select-content">
				<span class="label-word">商品分类</span>
				<el-cascader v-model="productType" :props="productOptions" @change="filterEvent" clearable></el-cascader>
				<el-input v-model="filterCondition" placeholder="输入商品分类名称" style="width: 330px; margin-left: 10px">
					<el-button slot="append" icon="el-icon-search" @click="filterEvent">搜索</el-button>
				</el-input>
			</div>
			<div class="btn-content">
				<el-button :class="showSale ? 'primary' : 'dark'" @click="handleShowSale">出售中</el-button>
				<el-button :class="showSale ? 'dark' : 'primary'" @click="handleShowOff">已下架</el-button>
			</div>
		</div>
		<div style="margin-bottom: 10px">
			<el-button :class="[selectProduct ? 'primary' : 'is-disabled', 'small']" :disabled="!selectProduct" @click="operateProduct('batch')">{{ showSale ? '批量下架' : '批量上架' }}</el-button>
			<el-button v-show="!showSale" :class="[selectProduct ? 'primary' : 'is-disabled', 'small']" :disabled="!selectProduct" @click="deleteProduct">删除</el-button>
			<span class="note-word">{{ `（*${showSale ? '批量下架' : '批量上架/删除'}已选中的商品）` }}</span>
		</div>
		<el-table :data="productList" class="lzm-table" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"> </el-table-column>
			<el-table-column prop="pic" label="商品首图" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.pic" class="image" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="商品标题" align="center" :show-overflow-tooltip="true"> </el-table-column>
			<el-table-column prop="productType" label="商品分类" align="center" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="price" label="价格" align="center"> </el-table-column>
			<el-table-column prop="stock" label="总库存" align="center"> </el-table-column>
			<el-table-column prop="sale" label="销量" align="center"> </el-table-column>
			<el-table-column label="操作" align="center" width="120">
				<template slot-scope="scope">
					<div class="manage-content">
						<span class="manage">查看</span>
						<span class="manage" @click="operateProduct('single', scope.row)">{{ showSale ? '下架' : '上架' }}</span>
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
</template>

<script>
import { GetProductList, OperateProduct, BatchOperateProduct, BatchDeleteProduct } from '../../api/management.js';
import { GetFirstLevelList, GetAllLevelList } from '../../api/common.js';
export default {
	name: 'ProductList',
	components: {},
	computed: {
		selectProduct() {
			return this.multipleSelection.length;
		},
	},
	props: {
		industryId: {
			type: Number,
		},
	},
	data() {
		return {
			publishStatus: 1,
			showSale: true,
			filterCondition: '',
			productType: '',
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
			multipleSelection: [],
			productList: [],
			productOptions: {
				lazy: true,
				async lazyLoad(node, resolve) {
					const { level, value } = node;
					let result;
					if (level === 0) {
						result = await GetFirstLevelList();
					} else {
						result = await GetAllLevelList(value);
					}
					result = result.map((item) => {
						return {
							value: item.id,
							label: item.name,
							leaf: level >= 2,
						};
					});
					resolve(result);
				},
			},
		};
	},
	beforeMount() {
		this.filterEvent();
	},
	methods: {
		async filterEvent() {
			let params = {
				name: this.filterCondition,
				productCategory1Id: this.productType[0],
				productCategory2Id: this.productType[1],
				productCategory3Id: this.productType[2],
				publishStatus: this.publishStatus,
				industryId: this.industryId,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			const res = await GetProductList(params);
			if (!_.isEmpty(res)) {
				this.productList = res.list.map((el) => {
					el.productType = this.getProductCategoryName(el);
					return el;
				});
				this.total = res.total;
			}
		},
		// 获取分类名称
		getProductCategoryName(data) {
			const first = data.productCategory1Name ? data.productCategory1Name : '';
			const second = data.productCategory2Name ? `-${data.productCategory2Name}` : '';
			const third = data.productCategory3Name ? `-${data.productCategory3Name}` : '';
			return first + second + third;
		},
		// 切换出售中列表
		handleShowSale() {
			this.publishStatus = 1;
			this.filterEvent();
			this.showSale = true;
		},
		// 切换已下架列表
		handleShowOff() {
			this.publishStatus = 0;
			this.filterEvent();
			this.showSale = false;
		},
		// 单个/批量——下架/上架商品
		async operateProduct(type, data) {
			if (type === 'batch') {
				const res = await BatchOperateProduct({ ids: this.multipleSelection, publishStatus: this.publishStatus });
				if (res) this.$message.success(`批量${this.showSale ? '下' : '上'}架商品成功！`);
			} else {
				const res = await OperateProduct(data.id, this.publishStatus);
				if (res) this.$message.success(`${this.showSale ? '下' : '上'}架商品成功！`);
			}
			this.filterEvent();
		},
		// 删除商品
		deleteProduct() {
			this.$swal
				.fire({
					title: '是否确认删除所选商品？',
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						const res = await BatchDeleteProduct({ ids: this.multipleSelection });
						if (res) this.$message.success('批量删除架商品成功！');
					}
				});
		},
		// 获取勾选的商品
		handleSelectionChange(val) {
			this.multipleSelection = val.map((el) => {
				return el.id;
			});
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
.productList-container {
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
				display: inline-block;
				width: 70px;
			}
		}
		.btn-content {
			width: 200px;
			display: flex;
			justify-content: space-between;
			align-items: center;
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
