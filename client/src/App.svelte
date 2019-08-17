<script>
	import ApolloClient from "apollo-boost";
	import { setClient } from "svelte-apollo";
	import Router from "svelte-spa-router";

	import Navbar from "./components/Navbar.svelte";
	import Home from "./components/Home.svelte";
	import PostList from "./components/posts/Posts.svelte";
	import Post from "./components/posts/Post.svelte";
	import Footer from "./components/Footer.svelte";

	const client = new ApolloClient({ uri: 'http://localhost:4000/graphql '});
	setClient(client);

	const routes = {
		'/': Home,
		'/posts': PostList,
		'/read/post/:_id': Post,
		'*': Home,
	}

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/css/uikit.min.css" />
</svelte:head>

<style>
	body, * {
		margin: 0; padding: 0;
	}
</style>

<body class="uk-container uk-container-expand">
	<div>
		<Navbar />
		<Router {routes} />
		<Footer />
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit.min.js"></script>
</body>