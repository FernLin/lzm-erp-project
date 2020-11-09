<template>
	<div class="upstreamShop-container">
		<ShopList :isUDS="true" :industryId="0" @showDetailPage="showDetailPage" ref="shopList" />
		<ShopDetail v-if="showDetail" :industryId="0" :detailData="detailData" :isUDS="true" @hideContainer="hideContainer" />
	</div>
</template>

<script>
import ShopList from '../../components/ShopManagement/ShopList';
import ShopDetail from '../../components/ShopManagement/ShopDetail';
export default {
	name: 'UpstreamShop',
	components: { ShopList, ShopDetail },
	data() {
		return {
			showDetail: false,
			detailData: Object,
		};
	},
	methods: {
		showDetailPage(data) {
			this.detailData = data;
			this.showDetail = true;
		},
		hideContainer(fresh = false) {
			if (fresh) this.$refs.shopList.filterEvent();
			this.showDetail = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.upstreamShop-container {
	padding: 20px 10px;
}
</style>
