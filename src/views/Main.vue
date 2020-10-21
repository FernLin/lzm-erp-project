<template>
	<div class="main-container" v-loading="loading">
		<Header></Header>
		<div class="main-content">
			<NavigationBar></NavigationBar>
			<div class="detail-content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import Header from '../components/Frame/Header';
import NavigationBar from '../components/Frame/NavigationBar';
export default {
	name: 'Main',
	components: { Header, NavigationBar },
	data() {
		return {
			loading: false,
		};
	},
};
</script>

<style lang="scss" scoped>
.main-container {
	height: 100%;
	.main-content {
		height: calc(100% - 91px);
		display: flex;
		.detail-content {
			flex: 1;
			height: 100%;
			margin: 8px 0 0 8px;
			background-color: $white-color;
		}
	}
}
</style>
