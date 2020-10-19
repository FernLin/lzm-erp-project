<template>
	<div class="register-container">Register</div>
</template>

<script>
import { getVerificationCode, register } from '../api/Register.js';
export default {
	name: 'Register',
	components: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style lang="scss" scoped>
.register-container {
	padding: 20px 10px;
}
</style>
