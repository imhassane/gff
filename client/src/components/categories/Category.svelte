<script>
    export let router = {};

    import { getClient, query } from "svelte-apollo";
    import gql from "graphql-tag";
    import { Link } from "svero";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";
    import PostResume from "../posts/PostResume.svelte";

    import { ROUTER } from "../router";

    let title = "";
    function setCategoryTitle(_title) {
        title = _title;
        return "";
    }

    const CATEGORY = gql`
        query GetCategory($_id: ID!){
            category(_id: $_id) {
                _id, name, posts { _id, title, extract, comments { _id }, createdAt, author { username, posts { _id } } }
            }
        }
    `;

    const client = getClient();
    const category = query(client, { query: CATEGORY, variables: router.params });
</script>

<ul class="uk-margin uk-breadcrumb">
    <li><Link href="/">Accueil</Link></li>
    <li><Link href="">Catégories</Link></li>
    <li><Link href="{ROUTER.CATEGORY_DETAIL(router.params._id)}">{ title }</Link></li>
</ul>



{#await $category}
    <Loader />
{:then response}
    { setCategoryTitle(response.data.category.name) }
    <section class="uk-margin uk-padding uk-section uk-section-muted">
        <h1><strong>{ response.data.category.name }</strong></h1>
    </section>

    <div class="uk-container">

        {#each response.data.category.posts as post}
            <PostResume data={post} />
        {/each}

    </div>
{:catch error}
    <Error message={error.message} />
{/await}
