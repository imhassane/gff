<script>

    import { mutate, getClient } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Success from "../messages/Success.svelte";
    import Error from "../messages/Error.svelte";


    let email = "", success = false, error = false;
    const CREATE_READER = gql`
        mutation CreateReader($email: String!) {
            createReader(email: $email) {
                _id
            }
        }
    `;

    const client = getClient();

    function validateEmail() {
        return /\w+@\w+\.\w+/i.test(email);
    }

    async function addEmail() {
        if(validateEmail()) {
            let { data: { createReader } } = await mutate(client, { mutation: CREATE_READER, variables: { email }});
            error = false;
            success = true;
        } else {
            error = true;
        }
    }


</script>

<form>

    <div class="uk-margin">
    
        <p class="uk-text-bold">
            Recevez nos actualités, nos reportages, enquêtes et interviews directement dans votre boîte mail. <br>
            Joignez-vous à nous à notre combat afin de changer les choses.
        </p>

        {#if error}
            <Error message="Votre adresse email est incorrecte" />
        {/if}

        {#if success}
            <Success message="Vous recevrez désormais nos articles, vérifier régulièrement votre boîte email et merci pour le soutien" />
        {/if}

        {#if !success}
        <div class="uk-grid-small uk-grid-match" uk-grid>
            <div class="uk-width-expand">
                <input type="email" bind:value={email} class="uk-input uk-width-1-1" placeholder="Votre adresse email" />
            </div>
            <div class="uk-width-auto">
                <input type="button" class="uk-button" value="M'inscrire" on:click={ _ => addEmail() } />
            </div>
        </div>
        {/if}
    
    </div>

</form>