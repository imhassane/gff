<script>
    import { getClient, query } from "svelte-apollo";
    import gql from "graphql-tag";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";

    import Detail from "./PageDetail.svelte";

    export let router = {};

    const PAGES = gql`
        query Page($rank: Int!){
            page(rank: $rank) {
                content
            }
        }
    `;

    const client = getClient();
    const pages = query(client, { query: PAGES, variables: { rank: parseInt(router.params.rank) } });
</script>

{#await $pages}
    <Loader />
{:then response}
    <Detail data={response.data.page} />
{:catch error}
    <Error message={error.message} />
{/await}