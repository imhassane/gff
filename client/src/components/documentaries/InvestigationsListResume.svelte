<div class="uk-card uk-card-default">
    <div class="uk-card-media-top uk-cover-container">
        <img src="{data.picture.path}" alt="" uk-cover />
        <canvas width="200" height="180"></canvas>
    </div>
    <div class="uk-card-body">
        <h3 class="uk-card-title uk-text-bold"><a href="#/" class="uk-link-reset">{data.title}</a></h3>
        <p>{data.description}</p>
    </div>
    <div class="uk-card-footer">
        <a href={`#/see/documentary/${data._id}`} class="uk-button uk-button-default">Voir l'enquête</a>
    </div>
</div>

<script>
    export let data;
</script>