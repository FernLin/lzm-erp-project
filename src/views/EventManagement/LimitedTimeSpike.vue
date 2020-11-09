<template>
	<div class="limitedTimeSpike-container">
		<EventList v-if="!showDetail" :eventList="eventList" @editEvent="handleEditEvent" />
		<SnapUpEventList v-else :industryId="industryId" @back="handleBack" />
	</div>
</template>

<script>
import EventList from '../../components/EventManagement/EventList';
import SnapUpEventList from '../../components/EventManagement/SnapUpEventList';
export default {
	name: 'LimitedTimeSpike',
	components: { EventList, SnapUpEventList },
	data() {
		return {
			showDetail: false,
			industryId: '',
			eventList: [
				{
					name: '上游-限时秒杀',
					value: 1,
				},
				{
					name: '中端-限时秒杀',
					value: 2,
				},
				{
					name: '商城-限时秒杀',
					value: 3,
				},
			],
		};
	},
	methods: {
		handleEditEvent(data) {
			this.industryId = data.value;
			this.showDetail = true;
		},
		handleBack() {
			this.showDetail = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.limitedTimeSpike-container {
	padding: 20px 10px;
}
</style>
