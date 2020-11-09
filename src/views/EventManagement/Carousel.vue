<template>
	<div class="carousel-container">
		<EventList v-if="!showDetail" :eventList="eventList" @editEvent="handleEditEvent" />
		<EventDetail v-else :industryId="industryId" :industryName="industryName" @back="handleBack" />
	</div>
</template>

<script>
import EventList from '../../components/EventManagement/EventList';
import EventDetail from '../../components/EventManagement/EventDetail';
export default {
	name: 'Carousel',
	components: { EventList, EventDetail },
	data() {
		return {
			showDetail: false,
			eventList: [
				{
					name: '上游轮播图',
					industryId: 1,
					industryName: '上游',
				},
				{
					name: '中端轮播图',
					industryId: 2,
					industryName: '中端',
				},
				{
					name: '商城轮播图',
					industryId: 3,
					industryName: '商城',
				},
				{
					name: '农林轮播图',
					industryId: 4,
					industryName: '农林',
				},
				{
					name: '二手轮播图',
					industryId: 5,
					industryName: '二手',
				},
				// {
				// 	name: '物流轮播图',
				// },
				// {
				// 	name: '定制轮播图',
				// },
			],
			industryId: Number,
			industryName: '',
		};
	},
	methods: {
		async handleEditEvent(data) {
			this.industryId = data.industryId;
			this.industryName = data.industryName;
			this.showDetail = true;
		},
		handleBack() {
			this.showDetail = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.carousel-container {
	padding: 20px 10px;
}
</style>
