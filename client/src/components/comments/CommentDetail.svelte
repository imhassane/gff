<article class="uk-comment uk-comment-primary uk-margin">
    <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
            <img class="uk-comment-avatar" src={`https://ui-avatars.com/api/?name=${data.username}`} width="80" height="80" alt="">
        </div>
        <div class="uk-width-expand">
            <h4 class="uk-comment-title uk-margin-remove uk-text-bold"><a class="uk-link-reset" href="#/">{data.username}</a></h4>
            <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                <li><a href="#/">12 days ago</a></li>
                <li><a href={`#/read/post/${post}/#comment-form`}>Reply</a></li>
            </ul>
        </div>
    </header>
    <div class="uk-comment-body">
        <p>{data.content}</p>
    </div>
</article>

<script>
    export let data, post="";
</script>