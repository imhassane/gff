<article class="uk-article">

    <h1 class="uk-article-title uk-text-bold"><a class="uk-link-reset" href={`#/read/post/${data._id}`}>{ data.title }</a></h1>

    <p class="uk-article-meta">Written by <a href="#/">{ data.author.username }</a> on { data.createdAt }. Posted in <a href="#/">Blog</a></p>

    <p class="uk-text-lead">{ data.content.slice(0, 100) }</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

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
    export let data;
</script>