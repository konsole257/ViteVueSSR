<script setup lang="ts">
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
</script>

<template>
	<Header />

	<main id="main">
		<div id="content">
			<router-view />
		</div>
	</main>

	<Footer />
</template>