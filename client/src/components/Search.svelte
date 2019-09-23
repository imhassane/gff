<script>
    import { push } from "svelte-spa-router";
    let search = "";

    function searchChange(event) {
        search = event.target.value;
    }

    function submit(event) {
        if(search.length > 0) localStorage.setItem('x-search', search);
    }
</script>

<form class="uk-search uk-search-navbar" action="/search" on:submit={submit}>
    <span uk-search-icon></span>
    <input class="uk-search-input" type="search" on:input={searchChange} placeholder="Rechercher...">
</form>