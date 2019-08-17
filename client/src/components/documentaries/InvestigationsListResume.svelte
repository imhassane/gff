<div class="uk-card uk-card-default">
    <div class="uk-card-media-top uk-cover-container">
        <img src="{data.picture.path}" alt="" uk-cover />
        <canvas width="200" height="150"></canvas>
    </div>
    <div class="uk-card-body">
        <h3 class="uk-card-title uk-text-bold">{data.title}</h3>
        <p>
            <a href="#/" class="uk-button uk-button-default">Voir l'enquête</a>
        </p>
    </div>
</div>

<script>
    export let data;
</script>