<script setup lang="ts">
// console.log(import.meta.env.VITE_ENV_KEY)

console.log('BASE_URL: '+import.meta.env.BASE_URL)
console.log('MODE: '+import.meta.env.MODE)
console.log('PROD: '+import.meta.env.PROD)
console.log('DEV: '+import.meta.env.DEV)
console.log('SSR: '+import.meta.env.SSR)
</script>

<template>
	<header id="header">
		<router-link to="/">Home</router-link>
		<router-link to="/about">About</router-link>
	</header>
</template>