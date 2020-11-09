<template>
	<div class="ProductPage-container">
		<ProductList :industryId="2" />
	</div>
</template>

<script>
import ProductList from '../../components/Frame/ProductList';
export default {
	name: 'ProductPage',
	components: { ProductList },
	data() {
		return {};
	},
	methods: {},
};
</script>
<style lang="scss" scoped>
.ProductPage-container {
	padding: 20px 10px;
}
</style>
