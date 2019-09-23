<div>

    <div class="">
        <img width="150" src="{picture}" alt="" class="uk-border-pill" />
    </div>

    <div>
        <p class="uk-text-meta">Par <strong><Link href={`/author/${author._id}`}>{author.username}</Link></strong> / {author.posts.length} articles { author.posts.length > 1 ? "publiés" : "publié" }</p>
        <p class="uk-text-meta">Ajouté le <strong>{getFormattedDate(createdAt)}</strong></p>
    </div>

    <div class="uk-margin-small">
        <p><strong>Publié dans les catégories</strong></p>
        {#each categories as cat}
            <Category data={cat} />
        {/each}
    </div>

    <div class="uk-margin-small">
        <p><strong>Liste des tags</strong></p>
        {#each tags as tag}
            <Tag data={tag} />
        {/each}
    </div>

</div>

<script>
    import { Link } from "svero";
    import Category from "../general/Category.svelte";
    import Tag from "../general/Tag.svelte";
    import { getFormattedDate } from "../../helpers.js";
    export let categories=null, tags=null;
    export let author={}, createdAt="", posts = [],picture="https://st4.depositphotos.com/1028735/22757/v/1600/depositphotos_227577174-stock-illustration-animation-portrait-beautiful-african-woman.jpg";
</script>