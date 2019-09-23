<script>
    import { Link } from "svero";
    import PostResume from "../posts/PostResume.svelte";
    export let data = {};
</script>

<div class="uk-grid-medium" uk-grid>
    <div class="uk-width-auto  uk-cover-container">
        <img src={data.picture.path} alt="{data.title}" uk-cover>
        <canvas width="400" height="200"></canvas>
    </div>
    <div class="uk-width-expand">
        <PostResume data={data} />
    </div>
</div>