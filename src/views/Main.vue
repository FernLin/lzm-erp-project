<template>
    <div class="main-container" v-loading="loading">
		<router-view />
	</div>
</template>

<script>
export default {
    name: 'Main',
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
}
</style>
