<template>
	<FloatContainer class="shopDetail-container">
		<template v-slot:header>
			<div class="float-header">
				<span>店铺详情</span>
				<i class="el-icon-close close-icon" @click="hideContainer" />
			</div>
		</template>
		<template v-slot:body>
			<div class="float-body">
				<el-row>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">店铺名称：</span>
							<span>{{ detailData.name }}</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">申请时间：</span>
							<span>{{ detailData.createTime }}</span>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">负责人：</span>
							<span>{{ detailData.ownerName }}</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">联系方式：</span>
							<span>{{ detailData.ownerPhone }}</span>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">店铺类型：</span>
							<span>{{ detailData.industryName || detailData.operatorCategoryName }}</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">店铺地址：</span>
							<span>{{ detailData.addr }}</span>
						</div>
					</el-col>
				</el-row>
				<el-row v-if="industryId === 0">
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">一级分类：</span>
							<span>{{ detailData.categoryLevel1Name }}</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">二级分类：</span>
							<span>{{ detailData.categoryLevel2Name }}</span>
						</div>
					</el-col>
				</el-row>
				<el-row v-if="detailData.industryId === 4">
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">店铺属性：</span>
							<span>{{ detailData.attrName }}</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="detail-item">
							<span class="lable-word">商品分类：</span>
							<span>{{ detailData.operatorCategoryName }}</span>
						</div>
					</el-col>
				</el-row>
				<div v-if="isNotSH" class="detail-item">
					<span class="lable-word">范围：</span>
					<span>{{ detailData.type === 0 ? '全国店铺' : '本地店铺' }}</span>
				</div>
				<el-row>
					<el-col :span="12">
						<div class="img-content">
							<span class="lable-word">营业执照：</span>
							<span class="image-detail">
								<img :src="detailData.businesslicenseUrl" />
							</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-content">
							<span class="lable-word">经营许可证：</span>
							<span class="image-detail">
								<img :src="detailData.businesslicensesUrl" />
							</span>
						</div>
					</el-col>
				</el-row>
				<!--开启/关闭状态显示店铺押金-->
				<div v-if="[1, 2].includes(detailData.delFlag)">
					<div class="detail-item">
						<span class="lable-word">店铺押金：</span>
						<el-input v-model.trim="deposit" placeholder="请输入金额" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" style="width: 200px">
							<span slot="prefix" class="deposit-word">￥</span>
						</el-input>
					</div>
					<el-row>
						<el-col :span="12">
							<div class="special-item">
								<span class="lable-word">店铺状态：</span>
								<div class="close-content">
									<el-switch v-model="currntStatus" active-color="#13ce66" inactive-color="#ff4949" @change="handleChange"> </el-switch>
									<el-input v-if="detailData.delFlag === 1 && !currntStatus" v-model="closeReason" placeholder="请输入关闭原因" style="width: 200px; margin-top: 6px" />
									<div class="note-word">注：关闭后该店主将无法运营和管理店铺</div>
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<div v-if="detailData.delFlag === 2" class="detail-item">
									<span class="lable-word">关闭原因：</span>
									<span>{{ detailData.delReason }}</span>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<div v-if="detailData.status === 0" class="special-item">
					<span class="lable-word">审核结果：</span>
					<div class="close-content">
						<span>
							<el-radio v-model="checkResult" label="1">通过</el-radio>
							<el-radio v-model="checkResult" label="2">不通过</el-radio>
						</span>
						<el-input v-if="checkResult === '2'" v-model="refuseReason" placeholder="请输入拒绝原因" style="width: 200px; margin-top: 6px"></el-input>
					</div>
				</div>
				<div v-if="detailData.status === 2" class="detail-item">
					<span class="lable-word">不通过原因：</span>
					<span>{{ detailData.delReason }}</span>
				</div>
				<el-button class="primary" style="display: block; margin: 30px auto 0" @click="saveData">确定</el-button>
			</div>
		</template>
	</FloatContainer>
</template>

<script>
import FloatContainer from '../Frame/FloatContainer';
import { UDUpdateShopStatus, UDVerifyShopStatus } from '../../api/management.js';
import { AgricultureUpdateShopStatus, AgricultureVerifyShopStatus } from '../../api/management.js';
import { SHUpdateShopStatus, SHVerifyShopStatus } from '../../api/management.js';
export default {
	name: 'ShopDetail',
	components: { FloatContainer },
	props: {
		isNotSH: {
			// 非二手店铺
			type: Boolean,
			default: true,
		},
		detailData: {
			type: Object,
			default() {
				return {};
			},
		},
		industryId: {
			// 所属行业id
			type: Number,
		},
	},
	data() {
		return {
			currntStatus: this.detailData.status === 1 && this.detailData.delFlag === 1,
			deposit: this.detailData.deposit,
			checkResult: '',
			closeReason: this.detailData.delReason || '',
			refuseReason: this.detailData.delReason || '',
		};
	},
	methods: {
		hideContainer() {
			this.$emit('hideContainer');
		},
		handleChange(val) {
			if (val) this.closeReason = '';
		},
		async saveData() {
			// 关闭/开启
			if ([1, 2].includes(this.detailData.delFlag)) {
				let params = {
					delFlag: this.currntStatus ? 1 : 2,
					delReason: this.closeReason,
					id: this.detailData.id,
					deposit: this.deposit,
				};
				if (this.industryId === 0) {
					const res = await UDUpdateShopStatus(params);
				} else if (this.industryId === 4) {
					const res = await AgricultureUpdateShopStatus(params);
				} else {
					const res = await SHUpdateShopStatus(params);
				}
				this.$emit('hideContainer', true);
			}
			// 待审核
			if (this.detailData.status === 0) {
				let params = {
					status: this.checkResult,
					delReason: this.refuseReason,
					id: this.detailData.id,
				};
				if (this.industryId === 0) {
					const res = await UDVerifyShopStatus(params);
				} else if (this.industryId === 4) {
					const res = await AgricultureVerifyShopStatus(params);
				} else {
					const res = await SHVerifyShopStatus(params);
				}
				this.$emit('hideContainer', true);
			}
			// 不通过
			if (this.detailData.status === 2) {
				this.$emit('hideContainer');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.shopDetail-container {
	padding: 20px 10px;
	.float-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30px;
		.close-icon {
			cursor: pointer;
			font-weight: bold;
		}
	}
	.float-body {
		width: 800px;
		.detail-item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}
		.lable-word {
			display: inline-block;
			width: 100px;
		}
		.img-content {
			display: flex;
			align-items: flex-start;
			margin-bottom: 10px;
			.image-detail {
				box-sizing: border-box;
				width: 200px;
				height: 200px;
				border: 1px solid $border-color;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					max-width: 200px;
					max-height: 200px;
				}
			}
		}
		.deposit-word {
			height: 35px;
			line-height: 35px;
			font-size: 18px;
			font-weight: bold;
			color: $black-color;
		}
		.special-item {
			display: flex;
			align-items: flex-start;
			margin-bottom: 10px;
			.close-content {
				display: flex;
				flex-direction: column;
			}
		}
	}
}
</style>
