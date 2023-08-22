import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

const ctx = {}

const renderHead = () => {
	return `
		<link rel="canonical" href="{{ url }}">
		<meta property="og:locale" content="ko_KR">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="{{ site_name }}">
		<meta property="og:url" content="{{ url }}">
		<meta property="og:image" content="image">
		<meta property="og:title" content="title">
		<meta property="og:description" content="{{ description }}">

		<meta name="description" content="{{ description }}">
		<meta name="keywords" content="{{ keywords }}">

		<title>SSR App</title>
	`;
}

const render = async (url: any) => {
	const { app, router } = createApp();

	await router.push(url);
	await router.isReady();

	const htmlHead = renderHead();
	const htmlBody = await renderToString(app, ctx);

	return [htmlHead, htmlBody];
}

export { render };