<article class="uk-margin">
    <header class="uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
            <img src={`https://ui-avatars.com/api/?name=${data.username}`} width="30" height="30" alt="{data.username}">
        </div>
        <div class="uk-width-expand">
            <h4 class="uk-margin-remove uk-text-bold"><a class="uk-link-reset" href="#/">{data.username}</a></h4>
        </div>
    </header>
    <div class="">
        <p>{data.content}</p>
    </div>
</article>

<script>
    export let data, post="";
</script>