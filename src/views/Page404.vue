<template>
    <div class="error-container">
        <img src="@/assets/lzm_404.png" />
        <div class="error-word">出错啦！您访问的页面没找着！</div>
    </div>
</template>

<script>
export default {
    name: 'Page404',
};
</script>

<style lang="scss" scoped>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .error-word {
        padding-top: 20px;
        font-size: 30px;
    }
}
</style>
