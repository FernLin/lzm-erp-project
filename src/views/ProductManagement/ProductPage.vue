<template>
	<div class="ProductPage-container">
		<ProductList v-if="!showDetail" :industryId="3" @editProduct="editProduct" @releaseProduct="releaseProduct" />
		<ProductDetail v-else :detailData="detailData" :componentType="componentType" @cancel="handleCancel" />
	</div>
</template>

<script>
import ProductList from '../../components/ProductManagement/ProductList';
import ProductDetail from '../../components/ProductManagement/ProductDetail';
export default {
	name: 'ProductPage',
	components: { ProductList, ProductDetail },
	data() {
		return {
			showDetail: false,
			componentType: '',
			detailData: {},
		};
	},
	methods: {
		editProduct(data) {
			this.componentType = 'edit';
			this.detailData = data;
			this.showDetail = true;
		},
		releaseProduct() {
			this.componentType = 'release';
			this.showDetail = true;
		},
		handleCancel() {
			this.showDetail = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.ProductPage-container {
	padding: 20px 10px;
}
</style>
