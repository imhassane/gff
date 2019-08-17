<MainContainer>
    <div class="uk-container">

        {#await $posts}
            {:then response}
                {#each response.data.posts as post}
                    <PostResume data={post} />
                {/each}
            {:catch error}
                <Error message={error.message} />
        {/await}

    </div>
</MainContainer>

<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Error from "../messages/Error.svelte";
    import MainContainer from "../general/MainContainer.svelte";
    import PostResume from "./PostResume.svelte";

    const client = getClient();
    const POSTS = gql`
        {
            posts {
                _id
                title
                author { _id, username }
                comments { _id }
                content
                createdAt
            }
        }
    `;

    const posts = query(client, { query: POSTS });
</script>