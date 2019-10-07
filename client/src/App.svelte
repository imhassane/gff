<script>
	import ApolloClient from "apollo-boost";
	import { setClient } from "svelte-apollo";
	import { Router, Route } from "svero";

	import Navbar from "./components/Navbar.svelte";
	import Home from "./components/Home.svelte";
	import Contact from "./components/contact/Contact.svelte";
	import User from "./components/user/User.svelte";
	import PostList from "./components/posts/Posts.svelte";
	import Post from "./components/posts/Post.svelte";
	import Footer from "./components/Footer.svelte";
	import Documentary from "./components/documentaries/Documentary.svelte";
	import Documentaries from "./components/documentaries/Documentaries.svelte";
	import Page from "./components/pages/Page.svelte";
	import Search from "./components/search/Search.svelte";

	const client = new ApolloClient({ uri: 'http://localhost:4000/graphql '});
	setClient(client);

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/css/uikit.min.css" />
</svelte:head>

<style>
	body, * {
		margin: 0; padding: 0;
	}
</style>

<body>
	<div>
		<Navbar />
		<Router>
			<Route exact path="/" component={Home} />
			<Route exact path="/contact" component={Contact} />
			<Route exact path="/author/:_id" component={User} />
			<Route exact path="/posts/list" component={PostList} />
			<Route exact path="/posts/read/:_id" component={Post} />
			<Route exact path="/documentaries/type/:type" component={Documentaries} />
			<Route exact path="/documentaries/watch/:_id" component={Documentary} />
			<Route exact path="/page/:rank/:slug" component={Page} />

			<!-- Affichage de la page de catégories -->
			<Route exact path="/search" component={Search} />
		</Router>
		<Footer />
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit.min.js"></script>
</body>