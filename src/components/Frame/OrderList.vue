<template>
	<div class="orderList-container">
		<div class="btn-content">
			<el-button :class="status === '' ? 'primary' : 'dark'" @click="getCurrentList()">{{ `全部订单（${getNum(countList.omsOrderSubListCount)}）` }}</el-button>
			<el-button :class="status === 0 ? 'primary' : 'dark'" @click="getCurrentList(0)">{{ `待付款（${getNum(countList.omsOrderSubListCount0)}）` }}</el-button>
			<el-button :class="status === 1 ? 'primary' : 'dark'" @click="getCurrentList(1)">{{ `待发货（${getNum(countList.omsOrderSubListCount1)}）` }}</el-button>
			<el-button :class="status === 2 ? 'primary' : 'dark'" @click="getCurrentList(2)">{{ `已发货（${getNum(countList.omsOrderSubListCount2)}）` }}</el-button>
			<el-button :class="status === 3 ? 'primary' : 'dark'" @click="getCurrentList(3)">{{ `已完成（${getNum(countList.omsOrderSubListCount3)}）` }}</el-button>
			<el-button :class="status === 4 ? 'primary' : 'dark'" @click="getCurrentList(4)">{{ `已关闭（${getNum(countList.omsOrderSubListCount4)}）` }}</el-button>
		</div>
		<div class="filter-content">
			<div class="filter-item">
				<span class="label-word">订单编号：</span>
				<el-input v-model="orderNum" placeholder="请输入订单编号" />
			</div>
			<div class="filter-item">
				<span class="label-word">收货人：</span>
				<el-input v-model="receiver" placeholder="请输入收货人名称" />
			</div>
			<div class="filter-item">
				<span class="label-word">手机号：</span>
				<el-input v-model="phoneNum" placeholder="请输入手机号" />
			</div>
			<el-button class="primary" @click="search">搜索</el-button>
		</div>
		<el-table :data="orderList" class="lzm-table">
			<el-table-column prop="orderSubSn" label="订单编号" align="center" width="200"> </el-table-column>
			<el-table-column prop="shopName" label="店铺名称" align="center"> </el-table-column>
			<el-table-column prop="createTime" label="提交时间" align="center"> </el-table-column>
			<el-table-column prop="username" label="用户昵称" align="center"> </el-table-column>
			<el-table-column prop="totalAmount" label="订金金额" align="center">
				<template slot-scope="scope">
					<span>￥{{ scope.row.totalAmount }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="订单状态" align="center">
				<template slot-scope="scope">
					<span>{{ getOrderStatus(scope.row.status) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<span class="manage" @click="watchOrder(scope.row)">查看订单</span>
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
import { GetOrderList, GetOrderNum, GetOrderDetail } from '../../api/management.js';
export default {
	name: 'OrderList',
	components: {},
	props: {
		industryId: {
			type: Number,
		},
	},
	data() {
		return {
			orderNum: '',
			receiver: '',
			phoneNum: '',
			status: '',
			countList: {},
			orderList: [],
			pageSizes: [10, 15, 20],
			pageSize: 10,
			currentPage: 1,
			total: 0,
		};
	},
	async beforeMount() {
		const result = await GetOrderNum(this.industryId);
		if (!_.isEmpty(result)) {
			this.countList = result;
		}
		this.search();
	},
	methods: {
		async search() {
			const params = {
				industryId: this.industryId,
				orderSubSn: this.orderNum,
				pageNum: this.currentPage,
				pageSize: this.pageSize,
				receiverName: this.receiver,
				receiverPhone: this.phoneNum,
				status: this.status,
			};
			const res = await GetOrderList(params);
			if (!_.isEmpty(res)) {
				this.orderList = res.list;
				this.total = res.total;
			}
		},
		getNum(count) {
			if (count) return count > 999 ? '999+' : count;
			return 0;
		},
		// 按钮点击事件
		getCurrentList(data = '') {
			this.status = data;
			this.orderNum = '';
			this.receiver = '';
			this.phoneNum = '';
			this.currentPage = 1;
			this.search();
		},
		// 展示对应订单状态
		getOrderStatus(data) {
			switch (data) {
				case 0:
					return '待付款';
				case 1:
					return '待发货';
				case 2:
					return '已发货';
				case 3:
					return '已完成';
				case 4:
					return '已关闭';
				default:
					return '无效订单';
			}
		},
		async watchOrder(data) {
			const res = await GetOrderDetail(data.id);
			if (!_.isEmpty(res)) {
				console.log('订单详情', res);
			}
		},
		// 改变pageSize事件
		handleSizeChange(val) {
			this.pageSize = val;
			this.currentPage = 1;
			this.search();
		},
		// 跳转页面事件
		handleCurrentChange(val) {
			this.currentPage = val;
			this.search();
		},
	},
};
</script>
<style lang="scss" scoped>
.orderList-container {
	.btn-content {
		display: flex;
		margin-bottom: 10px;
	}
	.filter-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		.filter-item {
			display: flex;
			align-items: center;
			.label-word {
				margin-right: 6px;
				display: inline-block;
				width: 120px;
			}
		}
	}
	.manage {
		cursor: pointer;
		color: $link-font;
		padding-bottom: 2px;
		border-bottom: 1px solid $link-font;
	}
}
</style>
