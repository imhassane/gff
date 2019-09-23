<script>
    import {Link} from "svero";
    import Title from "../Title.svelte";
    import { getFormattedDate } from "../../helpers";
    export let data = {};
</script>


<section class="uk-container-expand uk-padding">
    <ul class="uk-breadcrumb uk-margin">
        <li><Link href="/">Accueil</Link></li>
        <li><Link href={`/author/${data._id}`}>{data.username}</Link></li>
    </ul>
    <div class="uk-text-center">
       <p>
            <img class="uk-border-pill" width="200" height="200" src="https://st4.depositphotos.com/1028735/22757/v/1600/depositphotos_227577174-stock-illustration-animation-portrait-beautiful-african-woman.jpg" alt="">
       </p> 
       <p>
            <strong>@{data.username}</strong>
       </p>
       <p class="uk-text-meta">
            Membre depuis le {getFormattedDate(data.createdAt)} / {data.posts.length} {data.posts.length > 1 ? "articles publiés": "article publié"}
       </p>
    </div>
</section>

<hr>

<div class="uk-container">

    <Title begin="" end="Articles publiés" />

    {#each data.posts as post}
        <div class="uk-margin">
            <h3>{post.title}</h3>
            <p class="uk-article-meta">Ecrit par <a href="#">{ data.username }</a> le { getFormattedDate(post.createdAt) }.</p>
            {@html post.extract}
            <p><Link href={`/posts/read/${post._id}`} className="uk-button uk-button-text">Lire</Link></p>
        </div>
    {/each}

</div>
