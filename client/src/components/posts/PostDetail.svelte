<div>
    <h1 class="uk-text-bold">{ data.title }</h1>

    <div class="uk-cover-container uk-height-large">
        <img uk-cover src="http://scd.rfi.fr/sites/filesrfi/imagecache/rfi_16x9_1024_578/sites/images.rfi.fr/files/aef_image/cessou_0.jpg" alt="">
    </div>

    <div class="uk-margin uk-text-justify">
        {@html data.content }
    </div>

    <div></div>

</div>

<script>
    export let data;
</script>