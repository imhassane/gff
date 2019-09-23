<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";
    import { Link } from "svero";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";
    import Title from "../Title.svelte";

    let error = false;
    let search = localStorage.getItem('x-search');

    if(!search) error = true;

    localStorage.removeItem('x-search');

    const SEARCH = gql`
        query Search($text: String!){
            search(text: $text) {
                tags { _id, name }
                categories { _id, name, description }
                posts { _id, title, extract, picture { path } createdAt }
                authors { _id, username }
            }
        }
    `;

    const client = getClient();

    const results = query(client, { query: SEARCH, variables: { text: search } });

    
</script>

{#if error}
    <h3 style="text-align:center">Aucun terme de recherche n'a été entré</h3>

{:else}
    {#await $results}
        <Loader />
        {:then response}
        <Title begin="Resultats de" end="votre recherche" />
        {:catch ex}
        <Error message={ex.message} />
    {/await}
{/if}

