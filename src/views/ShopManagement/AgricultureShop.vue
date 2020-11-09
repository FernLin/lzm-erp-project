<template>
	<div class="agricultureShop-container">
		<ShopList :industryId="4" @showDetailPage="showDetailPage" />
		<ShopDetail v-if="showDetail" :industryId="4" :detailData="detailData" @hideContainer="hideContainer" />
	</div>
</template>

<script>
import ShopList from '../../components/ShopManagement/ShopList';
import ShopDetail from '../../components/ShopManagement/ShopDetail';
export default {
	name: 'AgricultureShop',
	components: { ShopList, ShopDetail },
	data() {
		return {
			showDetail: false,
			detailData: Object,
		};
	},
	methods: {
		showDetailPage(data) {
			this.showDetail = true;
			this.detailData = data;
		},
		hideContainer() {
			this.showDetail = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.agricultureShop-container {
	padding: 20px 10px;
}
</style>
