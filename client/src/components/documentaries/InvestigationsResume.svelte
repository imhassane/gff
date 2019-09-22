<div uk-slider="center: true">

    <div class="uk-position-relative uk-visible-toggle" tabindex="-1">

        <ul class="uk-slider-items uk-child-width-1-2@s uk-grid">
            

            {#await $documentaries}
                <Loader />
                {:then response}
                    {#if response.data.documentaries.length === 0}
                        <Empty message="Aucune enquête pour le moment" />
                    {/if}
                    {#each response.data.documentaries as data }
                        <li class="uk-width-3-4">
                            <Resume data={data} />
                        </li>
                    {/each}
                {:catch error}
                    <Error message={error.message} />
            {/await}

        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

        <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>

</div>

<script>
    import { getClient, query } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Loader from "../general/Loader.svelte";
    
    import Empty from "../general/Empty.svelte";
    import Error from "../messages/Error.svelte";

    import Resume from "./InvestigationsListResume.svelte";

    const INVESTIGATIONS = gql`
        {
            documentaries(TYPE: "INVESTIGATION") {
                _id
                title
                picture { path }
                content
                description
                createdAt
            }
        }
    `;

    let datas = [], error = null;

    const client = getClient();
    const documentaries = query(client, { query: INVESTIGATIONS });

</script>