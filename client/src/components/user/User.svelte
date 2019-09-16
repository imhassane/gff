<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";
    import UserInfo from "./UserInfo.svelte";

    export let params = {};
    const QUERY = gql`
        query User($_id: ID!){
            user(_id: $_id) {
                username
                createdAt
                posts {
                    _id
                    title
                    extract
                    createdAt
                }
            }
        }
    `;

    const client = getClient();
    const author = query(client, { query: QUERY, variables: params });
</script>

<div>

    {#await $author}
        <Loader />
        {:then response}
        <UserInfo data={response.data.user} />
        {:catch ex}
        <Error message={ex.message} />
    {/await}

</div>

