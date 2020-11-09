<template>
	<div class="shopList-container">
		<div class="filter-content">
			<el-input v-model="filterCondition" placeholder="输入店铺名、负责人、手机号搜索" style="width: 330px">
				<el-button slot="append" icon="el-icon-search" @click="filterEvent">搜索</el-button>
			</el-input>
			<div v-if="isUDS" class="select-content">
				<span class="label-word">店铺类型</span>
				<el-select v-model="shopType" @change="filterEvent">
					<el-option v-for="item in shopTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
			</div>
			<div class="select-content">
				<span class="label-word">店铺状态</span>
				<el-select v-model="shopStatus" @change="filterEvent">
					<el-option v-for="item in shopStatusList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
			</div>
		</div>
		<el-table :data="shopList" class="lzm-table">
			<el-table-column prop="id" label="店铺ID" align="center"> </el-table-column>
			<el-table-column prop="name" label="店铺名称" align="center" width="200"> </el-table-column>
			<el-table-column prop="industryName" label="店铺类型" align="center"> </el-table-column>
			<el-table-column prop="ownerName" label="负责人" align="center"> </el-table-column>
			<el-table-column prop="ownerPhone" label="联系方式" align="center"> </el-table-column>
			<el-table-column v-if="isNotSH" prop="type" label="范围" align="center">
				<template slot-scope="scope">
					<div>{{ scope.row.type === 0 ? '全国商铺' : '本地商铺' }}</div>
				</template>
			</el-table-column>
			<el-table-column prop="shopStatus" label="店铺状态" align="center">
				<template slot-scope="scope">
					<div>{{ getShopType(scope.row) }}</div>
				</template>
			</el-table-column>
			<el-table-column prop="deposit" label="店铺押金" align="center"> </el-table-column>
			<el-table-column label="操作" align="center" width="120">
				<template slot-scope="scope">
					<div class="manage-content">
						<span class="manage" @click="editPoints(scope.row)">棕苞粒</span>
						<span class="manage" @click="editData(scope.row)">查看</span>
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
		<el-dialog title="发放棕苞粒" :visible.sync="showDialog" :show-close="false" width="30%" center>
			<div class="dialog-content">
				<span style="width: 100px">发放数量：</span>
				<el-input v-model.trim="dispenseNum" placeholder="请输入发放数量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button :class="canDispense ? 'primary' : 'is-disabled'" :disabled="!canDispense" @click="confirmPoints">确定</el-button>
				<el-button class="dark" @click="cancelPoints">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { GetUDShopList, UDDistributePoints, GetUDShopDetail } from '../../api/management.js';
import { GetAgricultureShopList, AgricultureDistributePoints, GetAgricultureShopDetail } from '../../api/management.js';
import { GetSHShopList, SHDistributePoints, GetSHShopDetail } from '../../api/management.js';
export default {
	name: 'ShopList',
	components: {},
	props: {
		isNotSH: {
			// 非二手店铺
			type: Boolean,
			default: true,
		},
		isUDS: {
			// 上下游店铺
			type: Boolean,
			default: false,
		},
		industryId: {
			// 所属行业id
			type: Number,
		},
	},
	computed: {
		canDispense() {
			return !!this.dispenseNum;
		},
	},
	data() {
		return {
			paramData: {},
			showDialog: false,
			dispenseNum: '',
			shopTypeList: [
				{ label: '全部分类', value: 0 },
				{ label: '上游', value: 1 },
				{ label: '中端', value: 2 },
				{ label: '商城', value: 3 },
			],
			shopType: 0,
			shopStatusList: [
				{ label: '全部状态', value: '' },
				{ label: '开启', value: '11' },
				{ label: '关闭', value: '12' },
				{ label: '待审核', value: '0' },
				{ label: '不通过', value: '20' },
			],
			shopStatus: '',
			filterCondition: '',
			shopList: [],
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
			currentData: '', // 当前选中的数据
		};
	},
	beforeMount() {
		this.filterEvent();
	},
	methods: {
		getShopType(data) {
			const { delFlag, status } = data;
			if (delFlag === 1) {
				return '开启';
			}
			if (delFlag === 2) {
				return '关闭';
			}
			if (status === 0) {
				return '待审核';
			}
			if (status === 2) {
				return '不通过';
			}
		},
		// 获取店铺列表
		async filterEvent() {
			let res;
			this.paramData = {
				delFlagAndDelFlag: this.shopStatus,
				keyword: this.filterCondition,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
			};
			if (this.industryId === 0) {
				this.paramData.industryId = this.shopType;
				res = await GetUDShopList(this.paramData);
			} else if (this.industryId === 4) {
				res = await GetAgricultureShopList(this.paramData);
			} else {
				res = await GetSHShopList(this.paramData);
			}
			if (!_.isEmpty(res)) {
				this.shopList = res.list;
				this.total = res.total;
			}
		},
		// 打开发放棕苞粒操作弹窗
		editPoints(data) {
			this.currentData = data;
			this.showDialog = true;
		},
		// 查看店铺详情事件
		async editData(data) {
			let res;
			if (this.industryId === 0) {
				res = await GetUDShopDetail(data.id);
			} else if (this.industryId === 4) {
				res = await GetAgricultureShopDetail(data.id);
			} else {
				res = await GetSHShopDetail(data.id);
			}
			if (!_.isEmpty(res)) {
				this.$emit('showDetailPage', res);
			}
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
		// 发放棕苞粒事件
		async confirmPoints() {
			const params = {
				id: this.currentData.id,
				integration: Number(this.dispenseNum),
			};
			let res;
			if (this.industryId === 1) {
				res = await UDDistributePoints(params);
			} else if (this.industryId === 4) {
				res = await AgricultureDistributePoints(params);
			} else {
				res = await SHDistributePoints(params);
			}
			if (res && !_.isEmpty(res)) {
				this.$message.success('棕苞粒发放成功！');
				this.dispenseNum = '';
				this.showDialog = false;
			}
		},
		// 取消发放事件
		cancelPoints() {
			this.dispenseNum = '';
			this.showDialog = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.shopList-container {
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
	.dialog-content {
		display: flex;
		align-items: center;
	}
}
</style>
