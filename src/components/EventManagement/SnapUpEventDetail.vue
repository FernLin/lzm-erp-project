<template>
	<div class="snapUpEventDetail-container">
		<div class="snapUpEventDetail-container-header">{{ `${status === 'add' ? '添加' : '编辑'}限时秒杀商品` }}</div>
		<div class="detail-item">
			<span class="lable-word">编号：</span>
			<el-input v-model="num" placeholder="请输入编号" style="width: 100px" />
		</div>
		<div class="detail-item" style="align-items: flex-start">
			<span class="lable-word">选择商品：</span>
			<div>
				<el-button class="primary add-btn" @click="selectProduct">添加</el-button>
				<el-table :data="ProductList" class="lzm-table" style="width: 625px">
					<el-table-column prop="imgUrl" label="商品首图" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.imgUrl" class="image" />
						</template>
					</el-table-column>
					<el-table-column prop="title" label="商品标题" align="center" width="200"> </el-table-column>
					<el-table-column prop="price" label="价格" align="center"> </el-table-column>
					<el-table-column prop="inventory" label="总库存" align="center"> </el-table-column>
					<el-table-column label="操作" align="center" width="80">
						<template slot-scope="scope">
							<span class="manage" @click="deleteData(scope.row)">移除</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="detail-item">
			<span class="lable-word">商品标题：</span>
			<el-input v-model="title" placeholder="请输入秒杀的商品标题" style="width: 300px" />
		</div>
		<el-row>
			<el-col :span="12">
				<div class="detail-item">
					<span class="lable-word">设置秒杀价格：</span>
					<el-input v-model="price" placeholder="请输入价格" style="width: 220px" />
				</div>
			</el-col>
			<el-col :span="12">
				<div class="detail-item">
					<span class="lable-word">设置秒杀数量：</span>
					<el-input v-model="quantity" placeholder="请输入数量" style="width: 220px" />
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div class="detail-item">
					<span class="lable-word">设置秒杀开始时间：</span>
					<el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="detail-item">
					<span class="lable-word">设置秒杀结束时间：</span>
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
				</div>
			</el-col>
		</el-row>
		<div class="btn-content">
			<el-button :class="isDisable ? 'is-disabled' : 'primary'" :disabled="isDisable" @click="saveEdit">确认保存</el-button>
			<el-button class="dark" @click="cancelEdit">{{ `取消${status === 'add' ? '添加' : '编辑'}` }}</el-button>
		</div>
		<FloatContainer v-if="showPopup">
			<template v-slot:header>
				<div>选择商品</div>
			</template>
			<template v-slot:body>
				<div class="float-body">
					<div>
						<el-input v-model="filterCondition" placeholder="输入商品名称">
							<el-button slot="append" icon="el-icon-search" @click="filterEvent">搜索</el-button>
						</el-input>
						<el-table :data="FilterProductList" class="lzm-table" style="width: 625px">
							<el-table-column prop="imgUrl" label="商品首图" align="center" width="100">
								<template slot-scope="scope">
									<img :src="scope.row.imgUrl" class="image" />
								</template>
							</el-table-column>
							<el-table-column prop="title" label="商品标题" align="center" width="180"> </el-table-column>
							<el-table-column prop="type" label="商品分类" align="center" width="100"> </el-table-column>
							<el-table-column prop="price" label="价格" align="center"> </el-table-column>
							<el-table-column prop="inventory" label="总库存" align="center"> </el-table-column>
							<el-table-column label="操作" align="center" width="80">
								<template slot-scope="scope">
									<span class="manage" @click="selectThis(scope.row)">添加</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</template>
		</FloatContainer>
	</div>
</template>

<script>
import FloatContainer from '../Frame/FloatContainer';
export default {
	name: 'SnapUpEventDetail',
	components: { FloatContainer },
	props: {
		status: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isDisable: true,
			showPopup: false,
			ProductList: [
				{
					imgUrl:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603826336158&di=92de5f7fb4c29bb4f7e3ddff6fa69841&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181209%2F38467a58f9264ca68eefa37719b4b739.jpeg',
					title: '维达纸巾',
					price: 100,
					inventory: 1000,
				},
			],
			num: '',
			title: '',
			price: '',
			quantity: '',
			startTime: '',
			endTime: '',
			filterCondition: '',
			FilterProductList: [
				{
					imgUrl:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603826336158&di=92de5f7fb4c29bb4f7e3ddff6fa69841&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181209%2F38467a58f9264ca68eefa37719b4b739.jpeg',
					title: '维达纸巾',
					type: '秒杀',
					price: 100,
					inventory: 1000,
				},
			],
		};
	},
	methods: {
		selectProduct() {
			console.log('选择商品');
			this.showPopup = true;
		},
		saveEdit() {
			console.log('保存编辑');
		},
		cancelEdit() {
			this.$swal
				.fire({
					title: `是否确认取消${this.status === 'add' ? '添加' : '编辑'}此秒杀商品？`,
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						this.$emit('backToList');
					}
				});
		},
		deleteData(data) {
			this.$swal
				.fire({
					title: `是否确认移除此商品？`,
					type: 'warning',
					showCancelButton: true,
					focusCancel: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认',
				})
				.then(async (result) => {
					if (result.value) {
						console.log('移除商品');
					}
				});
		},
		filterEvent() {
			console.log('开始筛选', this.filterCondition);
		},
		selectThis(data) {
			this.showPopup = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.snapUpEventDetail-container {
	width: 100%;
	&-header {
		margin-bottom: 20px;
		font-weight: bold;
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
	.detail-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.lable-word {
		display: inline-block;
		width: 150px;
	}
	.add-btn {
		margin-bottom: 10px;
	}
	.btn-content {
		margin-top: 30px;
		display: inline-flex;
		width: 280px;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
