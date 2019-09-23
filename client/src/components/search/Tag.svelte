<script>
    import { Link } from "svero";
    export let data = {};
</script>

<Link class="uk-label uk-margin-right" href={`/tags/detail/${data._id}`}>{data.name}</Link>