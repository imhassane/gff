<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";

    export let router = {};

    const client = getClient();
    const QUERY = gql`
        query DocumentaryList($type: String!){
            documentaries(TYPE: $type) {
                _id
                title
                description
                picture { path }
                TYPE
            }
        }
    `;
    const documentaries = query(client, { query: QUERY, variables: { type: router.params.type.toUpperCase() }});
</script>

{#await $documentaries}
    <Loader />
    {:then response}
        {#each response.data.documentaries as doc}
            <div>
                <h1>{doc.title}</h1>
            </div>
        {/each}
    {:catch ex}
    <Error message={ex.message} />
{/await}

