<template>
	<div class="ProductDetail-container">
		<div class="ProductDetail-container-header">
			<span class="back-content" @click="back">
				<i class="el-icon-arrow-left" />
				<span>返回</span>
			</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-card shadow="never">
				<div slot="header" class="my-card-header">
					<i class="el-icon-collection-tag" />
					<span>选择商品分类</span>
				</div>
				<el-form-item label="一级分类" prop="firstLevel">
					<el-select v-model="ruleForm.firstLevel" placeholder="请选择一级分类" style="width: 300px" @change="handleChange($event, 'second')">
						<el-option v-for="(item, index) in firstLevelList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级分类" prop="secondLevel">
					<el-select v-model="ruleForm.secondLevel" :disabled="!ruleForm.firstLevel" placeholder="请选择二级分类" style="width: 300px" @change="handleChange($event, 'thired')">
						<el-option v-for="(item, index) in secondLevelList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="三级分类" prop="thiredLevel">
					<el-select v-model="ruleForm.thiredLevel" :disabled="!ruleForm.secondLevel" placeholder="请选择三级分类" style="width: 300px">
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
					<el-input v-model="ruleForm.title" placeholder="请输入商品标题" maxlength="30" show-word-limit></el-input>
				</el-form-item>
			</el-card>
			<el-form-item>
				<el-button class="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button class="dark" @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { GetFirstLevelList, GetAllLevelList } from '../../api/common.js';
export default {
	name: 'ProductDetail',
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
	data() {
		return {
			ruleForm: {
				title: '',
				firstLevel: '',
				secondLevel: '',
				thiredLevel: '',
			},
			rules: {
				firstLevel: [{ required: true, message: '请选一级分类', trigger: 'change' }],
				secondLevel: [{ required: true, message: '请选二级分类', trigger: 'change' }],
				thiredLevel: [{ required: true, message: '请选三级分类', trigger: 'change' }],
				title: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
				],
			},
			firstLevelList: [],
			secondLevelList: [],
			thiredLevelList: [],
		};
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
				this.ruleForm.secondLevel = '';
				this.ruleForm.thiredLevel = '';
				this.secondLevelList = res;
			} else {
				this.ruleForm.thiredLevel = '';
				this.thiredLevelList = res;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
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
}
</style>
