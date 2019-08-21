<div class="uk-margin">

    <h3 class="uk-margin uk-text-bold">Quelques reflexions sur cet article</h3>

    {#if comments.length === 0}<Loader />{/if}

    {#each comments as comment}
        <div>
            <CommentDetail data={comment} post={post} />
        </div>
    {/each }

    <div class="uk-margin">
        <h3 class="uk-text-bold">Laissez-nous votre avis sur cet article</h3>
        <CommentForm post={post} />
    </div>

</div>

<script>

    export let post = "", comments = [];
    comments = comments.reverse();

    import CommentForm from "./CommentForm.svelte";
    import CommentDetail from "./CommentDetail.svelte";

    import Loader from "../general/Loader.svelte";

</script>