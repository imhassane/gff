<script>
    import PostResume from "../posts/PostResume.svelte";
    import { getFormattedDate } from "../../helpers";
    export let data;
</script>

<section>
hello
    <div class="uk-grid-small" uk-grid>
        <div>
        
        </div>
        <div>

        </div>
    </div>
    <p>
        <strong>{data.username}</strong> est membre depuis <strong>{ getFormattedDate(data.createdAt) }</strong>
    </p>
</section>

<div>

    {#each data.author.posts as post}
        <PostResume data={post} />
    {/each}

</div>
