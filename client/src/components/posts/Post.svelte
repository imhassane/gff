<MainContainer>

    <div class="uk-breadcrumb uk-margin">
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/posts">Articles</Link></li>
        <li><Link href={`/posts/read/${router.params._id}`}>{title}</Link></li>
    </div>

    <div>
    
        {#await $post}
            <Loader />
            {:then response }
                { setTitle(response.data.post.title) }
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-4@m">
                        <PostInfo
                            author={response.data.post.author}
                            createdAt={response.data.post.createdAt}
                            categories={response.data.post.categories}
                            tags={response.data.post.tags}
                        />
                    </div>
                    <div class="uk-width-3-4@m">
                        <PostDetail data={response.data.post} />
                    </div>
                </div>
                
                <hr />

                <Comment post={router.params._id} comments={response.data.post.comments} />
            {:catch error }
                <Error message={error.message} />
        {/await}
    
        
    </div>

</MainContainer>

<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";
    import { Link } from "svero";

    import MainContainer from "../general/MainContainer.svelte";
    import Comment from "../comments/Comment.svelte";
    import PostInfo from "./PostInfo.svelte";
    import PostDetail from "./PostDetail.svelte";

    import Error from "../messages/Error.svelte";
    import Loader from "../general/Loader.svelte";

    export let router = {}, title =  "";

    const client = getClient();

    const POST = gql`
        query GetPost($_id: ID!){
            post(_id: $_id) {
                _id
                title
                content
                author { _id, username, posts { _id } }
                picture { path }
                comments { _id, username, content, createdAt }
                tags { _id, name }
                categories { _id, name }
                createdAt
            }
        }
    `;

    const post = query(client, { query: POST, variables: router.params });

    function setTitle(_title) {
        title = _title;
        return "";
    }
</script>