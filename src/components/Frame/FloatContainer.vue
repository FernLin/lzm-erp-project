<template>
	<div class="float-container">
		<div class="float-container-wrapper" @click.self="hideContainer($event)">
			<!-- 这里不能用stop阻止冒泡，使用之后弹窗内类似el-popover的一些点击外部隐藏事件会失效，所以只能在父组件添加.self防止点击子组件触发 -->
			<div class="float-container-tmp">
				<div class="float-container-header">
					<slot name="header"></slot>
				</div>
				<div class="float-container-center">
					<slot name="body"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FloatContainer',
	methods: {
		hideContainer(value) {
			this.$emit('hideContainer', true);
		},
	},
};
</script>

<style scoped lang="scss">
.float-container {
	box-sizing: border-box;
	z-index: 1000;
	min-width: 1440px;
	position: fixed;
	margin: auto;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(255, 255, 255, 0.8);
	height: 100%;
	&-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	&-tmp {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 80%;
		position: relative;
		border: 1px solid $border-color;
		box-shadow: -1px 10px 18px 2px rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		background-color: $white-color;
		padding: 30px 0 30px 30px; // 存在滚动条，因此在center内容框设置adding right
	}
	&-header {
		width: 100%;
		box-sizing: border-box;
		padding-right: 30px;
		font-weight: bold;
		font-size: 18px;
		margin-bottom: 10px;
	}
	&-center {
		background-color: $white-color;
		max-height: 80vh;
		padding-right: 30px;
	}
}
</style>
