<div class="uk-card uk-card-default">
    <div class="uk-card-media-top uk-cover-container">
        <canvas width="250" height="200"></canvas>
        <img src="{data.picture.path}" alt="{data.title}" uk-cover />
    </div>
    <div class="uk-card-body">

        <div class="card-content white-text">
            <span class="uk-card-title uk-text-bold">{ data.title }</span>
            <p class="uk-text-meta">Par <strong>@{ data.author.username }</strong></p>
            {@html data.extract.slice(0, 150) } ...
        </div>

    </div>

    <div class="uk-card-footer">
        <a class="uk-button uk-button-default" href={`#/read/post/${data._id}`}>Voir cet article</a>
    </div>

</div>

<script>

    export let data;
</script>