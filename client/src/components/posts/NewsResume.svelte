<div class="uk-card uk-card-default">

    <div class="uk-card-body">

        <div class="card-content white-text">
            <span class="uk-card-title uk-text-bold">{ data.title }</span>
            <p class="uk-text-meta">Par <strong>@{ data.author.username }</strong></p>
            {@html data.content.slice(0, 80 ) } ...
        </div>

        <div class="card-action">
            <a class="uk-button uk-button-text" href={`#/read/post/${data._id}`}>Voir cet article</a>
        </div>

    </div>

</div>

<script>

    export let data;
    let picture = "http://scd.rfi.fr/sites/filesrfi/imagecache/rfi_16x9_1024_578/sites/images.rfi.fr/files/aef_image/cessou_0.jpg";

</script>