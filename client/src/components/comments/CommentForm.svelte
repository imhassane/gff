<form id="comment-form">

    <div class="uk-margin">
        <label for="" class="uk-form-label">Votre pseudo</label>
        <input type="text" class="uk-input" bind:value={username} />
        <span>{#if errorUsername.length > 0} <Error message={errorUsername} />  {/if}</span>
    </div>

    <div class="uk-margin">
        <label for="" class="uk-form-label">Votre adresse email</label>
        <input type="email" class="uk-input" bind:value={email} />
        <span>{#if errorEmail.length > 0} <Error message={errorEmail} /> {/if}</span>
    </div>

    <div class="uk-margin">
        <label for="" class="uk-form-label">Votre commentaire</label>
        <textarea class="uk-textarea" rows="10" bind:value={content}></textarea>
        <span>{#if errorContent.length > 0} <Error message={errorContent} /> {/if}</span>
    </div>

    <input type="button" on:click={validate} value="Poster le commentaire" class="uk-button uk-button-secondary">

</form>

<script>
    import Error from "../messages/Error.svelte";

    import { getClient, mutate } from "svelte-apollo";
    import { gql } from "apollo-boost";

    let username = "imthassane", email = "imthassane@gmail.com", content = "Cet article il est impressionnant, bravo", comment = "";
    let errorUsername = "", errorEmail = "", errorContent = "";
    let valid = false, success = false;

    export let post = "";

    const client = getClient();
    const ADD_COMMENT = gql`
        mutation AddComment($username: String!, $email: String!, $content: String!, $post: ID!, $comment: ID) {
            createComment(username: $username, email: $email, content: $content, post: $post, comment: $comment) {
                _id
            }
        }
    `;

    function validate(event) {
        if(username.length < 3) errorUsername = "Votre nom d'utilisateur est trop petit: au moins 3 caractères";
        else errorUsername = "";

        if(!(/^\w+@\w+\.\w+$/i.test(email))) errorEmail = "Votre adresse email n'est pas correcte";
        else errorEmail = "";

        if(content.length < 10) errorContent = "Votre commentaire est trop court: au moins 10 caractères";
        else errorContent = "";

        if(!errorUsername.length && !errorEmail.lenght && !errorContent.length) valid = true
        else valid = false;

        if(valid) addComment();
    }

    async function addComment() {
        let _comment = await mutate(client, { mutation: ADD_COMMENT, variables: { username, email, content, post, comment } });
        if(_comment.data.createComment) success = true;
    }
</script>