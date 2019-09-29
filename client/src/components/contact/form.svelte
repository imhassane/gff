<script>

    import { mutate, getClient } from "svelte-apollo";
    import { gql } from "apollo-boost";

    import Error from "../messages/Error.svelte";
    import Success from "../messages/Success.svelte";

    let email = "", message = "", object = "", success = false;
    let errors = {};

    const SEND_MESSAGE = gql`
        mutation CreateContact($email: String!, $object: String!, $message: String!) {
            createContact(email: $email, object: $object, message: $message) {
                _id
            }
        }
    `;

    const client = getClient();

    function validate() {
        if(!/\w+@\w+\.\w+/i.test(email)) errors = { ...errors, email: "Votre adresse email n'est pas correcte" };
        else errors = { ...errors, email: null };

        if(object.length < 5) errors = { ...errors, object: "L'objet de votre message est trop court, il doit dépasser 5 caractères" };
        else errors = { ...errors, object: null };

        if(message.length < 10) errors = { ...errors, message: "Votre message est trop court, il doit dépasser 10 caractères"};
        else errors = { ...errors, message: null };

        return !errors.email && !errors.message;
    }

    async function sendMessage() {
        if(validate()) {
            try {
                const { data: { createContact } } = await mutate(client, { mutation: SEND_MESSAGE, variables: { email, object, message } });
                success = createContact !== null;
            } catch({ message }) {
                errors = { ...errors, server: message };
            }
        }
    }

</script>

<form class="uk-form-stacked uk-padding-large" on:submit={ e => e.preventDefault()}>
    <fieldset class="uk-fieldset">

        <legend class="uk-legend">Nous contacter</legend>

        <p class="uk-text-meta">
            Nous repondrons à votre mail dans les plus brefs délais. <br>
            Merci pour l'intérêt que vous nous accordez.
        </p>

        {#if errors.server}<Error message={errors.server} />{/if}

        {#if !success}
    
        <div class="uk-margin">
            <label for="email">Votre adresse email</label>
            {#if errors.email}<Error message={errors.email} />{/if}
            <input type="email" bind:value={email} class="uk-input" />
        </div>

        <div class="uk-margin">
            <label for="object">Objet de votre message</label>
            {#if errors.object}<Error message={errors.object} />{/if}
            <input type="text" bind:value={object} class="uk-input" />
        </div>

        <div class="uk-margin">
            <label for="message">Votre message</label>
            {#if errors.message}<Error message={errors.message} />{/if}
            <textarea cols="30" rows="10" bind:value={message} class="uk-textarea"></textarea>
        </div>

        <button class="uk-button" on:click={ _ => sendMessage() }>Envoyer le message</button>

        {:else}
        <Success message="Votre message a été envoyé succès" />
        {/if}
    </fieldset>
</form>