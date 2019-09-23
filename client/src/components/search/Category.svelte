<script>
    import { Link, navigateTo } from "svero";
    export let data = {};

    function showCategory(event) {
        navigateTo(`/categories/detail/${data._id}`);
        return ;
    }
</script>

<button class="uk-button uk-margin-right" on:click={showCategory}>{data.name}</button>