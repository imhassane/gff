<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import { getFormattedDate, getDocumentaryType } from "../../helpers";
    import Loader from "../general/Loader.svelte";
    import Error from "../messages/Error.svelte";
    
    export let params = {};

    const client = getClient();
    const QUERY = gql`
        query GetDocumentary($_id: ID!) {
            documentary(_id: $_id) {
                _id, TYPE, title, content, createdAt, url
            }
        }
    `;

    const post = query(client, { query: QUERY, variables: params });
</script>

{#await $post}
    <Loader />
    {:then response}
    <section class="uk-section uk-section-secondary">
        <div class="uk-container">
            <h3>[{getDocumentaryType(response.data.documentary.TYPE)}] {response.data.documentary.title}</h3>
            <p class="uk-text-meta">
                Ajouté le { getFormattedDate(response.data.documentary.createdAt) }
            </p>
        </div>
    </section>

    <div class="uk-padding">

        <div class="uk-breadcrumb">
            <li><a href="#/">Accueil</a></li>
            <li><a href="#/documentaries">Documentaires</a></li>
            <li><a href={`#/see/documentary/${params._id}`}>{response.data.documentary.title}</a></li>
        </div>

        <p>
            <button class="uk-button" onclick={`
                UIkit.modal.dialog("<p class='uk-modal-body'><iframe uk-video class='uk-width-1-1' src='${response.data.documentary.url}' /></p>")
            `}>
                Voir la vidéo
            </button>
        </p>
    
        <article>
            {@html response.data.documentary.content}
        </article>

    </div>

    {:catch ex}
    <Error message={ex.message} />
{/await}