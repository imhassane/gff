<script>
	import ApolloClient from "apollo-boost";
	import { setClient } from "svelte-apollo";
	import { Router, Route } from "svero";

	import { ROUTER } from "./components/router";

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
	import Category from "./components/categories/Category.svelte";
	import Search from "./components/search/Search.svelte";
	import EmptyPage from "./components/general/EmptyPage.svelte";

	const client = new ApolloClient({ uri: 'http://localhost:4000/graphql '});
	setClient(client);

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/css/uikit.min.css" />
</svelte:head>

<div>
		<Navbar />
		<div class="uk-padding uk-padding-remove-left uk-padding-remove-right" uk-height-viewport>
			<Router>
				<Route exact path="{ROUTER.HOME}" component={Home} />
				<Route exact path="{ROUTER.CONTACT}" component={Contact} />
				<Route exact path="{ROUTER.AUTHOR(":_id")}" component={User} />
				<Route exact path="{ROUTER.POSTS_LIST}" component={PostList} />
				<Route exact path="{ROUTER.POSTS_READ(":_id")}" component={Post} />
				<Route exact path="{ROUTER.DOCUMENTARIES_TYPE(":type")}" component={Documentaries} />
				<Route exact path="{ROUTER.DOCUMENTARIES_WATCH(":_id")}" component={Documentary} />
				<Route exact path="{ROUTER.PAGE(":rank", ":slug")}" component={Page} />

				<Route exact path="{ROUTER.CATEGORY_DETAIL(":_id")}" component={Category} />
				<Route exact path="{ROUTER.SEARCH}" component={Search} />
				<Route path="*" component={EmptyPage} message="Désolé cette page n'existe pas" />
			</Router>
		</div>
		<Footer />
</div>