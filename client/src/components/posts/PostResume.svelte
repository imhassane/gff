<article class="uk-article">

    <h1 class="uk-article-title uk-text-bold"><Link class="uk-link-reset" href={`/posts/read/${data._id}`}>{ data.title }</Link></h1>

    <p class="uk-article-meta">Ecrit par <a href="#">{ data.author.username }</a> le { getFormattedDate(data.createdAt) }.</p>

    <p class="">{@html data.extract }</p>

    <div class="uk-grid-small uk-child-width-auto" uk-grid>
        <div>
            <Link class="uk-button uk-button-text" href={`/posts/read/${data._id}`}>Lire</Link>
        </div>
        <div>
            <a class="uk-button uk-button-text" href="#">{data.comments.length} { data.comments.length > 1 ? "Commentaires" : "Commentaire" }</a>
        </div>
    </div>

</article>

<script>
    import { Link } from "svero";
    import { getFormattedDate } from "../../helpers.js";

    export let data;
</script>