<template>
	<div class="eventList-container">
		<el-table :data="eventList" class="lzm-table list-table" height="100%" style="width: 100%">
			<el-table-column prop="name" label="功能"> </el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<span class="manage" @click="editEvent(scope.row)">管理</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'EventList',
	components: {},
	props: {
		eventList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		editEvent(data) {
			this.$emit('editEvent', data);
		},
	},
};
</script>
<style lang="scss" scoped>
.eventList-container {
	width: 100%;
	.manage {
		cursor: pointer;
		color: $link-font;
		padding-bottom: 2px;
		border-bottom: 1px solid $link-font;
	}
}
</style>
