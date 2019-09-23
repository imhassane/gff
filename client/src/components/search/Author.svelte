<script>
    import { Link } from "svero";
    export let data = {};
</script>

<div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
    <div class="uk-card-media-left uk-cover-container">
        <img src="https://st4.depositphotos.com/1028735/22757/v/1600/depositphotos_227577174-stock-illustration-animation-portrait-beautiful-african-woman.jpg" alt="" uk-cover>
        <canvas width="600" height="400"></canvas>
    </div>
    <div>
        <div class="uk-card-body">
            <p>{data.username}</p>
            <p class="uk-text-meta">{data.posts.length} post(s) publié(s)</p>
            <p><Link href={`/author/${data._id}`}>Voir</Link></p>
        </div>
    </div>
</div>