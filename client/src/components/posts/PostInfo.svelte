<div>

    <div class="uk-margin">
        <img width="150" height="150" src="{author.picture.path}" alt="{author.username}" />
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
    export let author={}, createdAt="", posts = [];
</script>