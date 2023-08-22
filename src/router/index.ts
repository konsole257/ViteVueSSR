import { createRouter, createMemoryHistory, createWebHistory, RouteRecordRaw } from 'vue-router';

const pages = import.meta.glob('../pages/*.vue');
const routes: RouteRecordRaw[] = Object.keys(pages).map((path) => {
	const name = path.match(/\.\.\/pages(.*)\.vue$/) ![1].toLowerCase();

	return {
		path: name === '/home' ? '/' : name,
		component: pages[path],
	};
});

const router = createRouter({
	history: import.meta.env.SSR ? createMemoryHistory('/ViteVueSSR/') : createWebHistory('/ViteVueSSR/'),
	routes,
});

export default router;