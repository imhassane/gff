<article class="uk-article">

    <h1 class="uk-article-title uk-text-bold"><a class="uk-link-reset" href={`#/read/post/${data._id}`}>{ data.title }</a></h1>

    <p class="uk-article-meta">Ecrit par <a href="#/">{ data.author.username }</a> le { getFormattedDate(data.createdAt) }.</p>

    <p class="">{@html data.extract }</p>

    <div class="uk-grid-small uk-child-width-auto" uk-grid>
        <div>
            <a class="uk-button uk-button-text" href={`#/read/post/${data._id}`}>Lire</a>
        </div>
        <div>
            <a class="uk-button uk-button-text" href="#/">{data.comments.length} { data.comments.length > 1 ? "Commentaires" : "Commentaire" }</a>
        </div>
    </div>

</article>

<script>
    import { getFormattedDate } from "../../helpers.js";

    export let data;
</script>