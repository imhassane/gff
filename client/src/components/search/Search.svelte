<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";
    import { Link } from "svero";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";
    import Title from "../Title.svelte";

    import Tag from "./Tag.svelte";
    import Category from "./Category.svelte";
    import Post from "./Post.svelte";
    import Author from "./Author.svelte";

    let error = false;
    let search = localStorage.getItem('x-search');

    if(!search) error = true;

    localStorage.removeItem('x-search');

    const SEARCH = gql`
        query Search($text: String!){
            search(text: $text) {
                tags { _id, name }
                categories { _id, name, description }
                posts { _id, title, extract, picture { path } createdAt author { _id, username } comments { _id } }
                authors { _id, username, posts { _id } }
            }
        }
    `;

    const client = getClient();

    const results = query(client, { query: SEARCH, variables: { text: search } });

    
</script>

{#if error}
    <h3 class="uk-position-center">Aucun terme de recherche n'a été entré</h3>

{:else}
<div class="uk-container-expand uk-padding">
    {#await $results}
        <Loader />
        {:then response}
        <Title begin="Resultats de" end="votre recherche" />
        {#if response.data.search.categories.length > 0}
            <Title begin="Nos" end="Categories" />
            <hr />
            <div class="uk-margin">
                {#each response.data.search.categories as d}
                <Category data={d} />
                {/each}
            </div>
        {/if}
        {#if response.data.search.tags.length > 0}
            <Title begin="Nos" end="Tags" />
            <hr />
            <div class="uk-margin">
                {#each response.data.search.tags as d}
                <Tag data={d} />
                {/each}
            </div>
        {/if}
        {#if response.data.search.authors.length > 0}
            <Title begin="Nos" end="Auteurs" />
            <hr />
            <div class="uk-grid-small uk-child-width-1-3@m uk-grid-match uk-margin" uk-grid>
                {#each response.data.search.authors as d}
                <div>
                    <Author data={d} />
                </div>
                {/each}
            </div>
        {/if}
        {#if response.data.search.posts.length > 0}
            <Title begin="Nos" end="Actualités" />
            <hr />
            <div class="uk-margin">
                {#each response.data.search.posts as d}
                <Post data={d} />
                {/each}
            </div>
        {/if}
        {:catch ex}
        <Error message={ex.message} />
    {/await}
</div>
{/if}

