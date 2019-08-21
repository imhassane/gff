<div>
    <h1 class="uk-text-bold">{ data.title }</h1>

    <div class="uk-cover-container uk-height-large">
        <img uk-cover src="" alt="">
    </div>

    <div class="uk-margin uk-text-justify">
        {@html data.content }
    </div>

    <div></div>

</div>

<script>
    export let data;
    console.log(data)
</script>