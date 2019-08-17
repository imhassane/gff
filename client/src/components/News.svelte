<div class="uk-grid-small uk-grid-match uk-child-width-1-2@m" uk-grid>
    {#await $posts}
        {:then response}
            {#each response.data.getPosts as post}
                <div>
                    <PostResume
                        data={post}
                    />
                </div>
            {/each}
        {:catch error}
            <Error message={error.message} />
    {/await}
</div>

<script>

    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";
    import PostResume from "./posts/NewsResume.svelte";
    import Error from "./messages/Error.svelte";

    const client = getClient();

    const POSTS = gql`
        {
            getPosts(limit: 2) {
                _id
                title
                author { _id, username }
                content
            }
        }
    `;

    let posts = query(client, { query: POSTS });

</script>