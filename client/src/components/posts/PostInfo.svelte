<div>

    <div class="">
        <img width="150" src="{picture}" alt="" class="uk-border-pill" />
    </div>

    <div>
        <p class="uk-text-meta">Par <strong>{author.username}</strong> / {author.posts.length} articles { author.posts.length > 1 ? "publiés" : "publié" }</p>
        <p class="uk-text-meta">Ajouté le <strong>{createdAt}</strong></p>
    </div>

</div>

<script>
    export let author={}, createdAt="", posts = [], picture="https://st4.depositphotos.com/1028735/22757/v/1600/depositphotos_227577174-stock-illustration-animation-portrait-beautiful-african-woman.jpg";
</script>