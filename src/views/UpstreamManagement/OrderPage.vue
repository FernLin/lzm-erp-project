<template>
	<div class="orderPage-container">
		<OrderList :industryId="1" />
	</div>
</template>

<script>
import OrderList from '../../components/Frame/OrderList';
export default {
	name: 'OrderPage',
	components: { OrderList },
	data() {
		return {};
	},
	methods: {},
};
</script>
<style lang="scss" scoped>
.orderPage-container {
	padding: 20px 10px;
}
</style>
