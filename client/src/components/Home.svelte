<script>
    import News from "./News.svelte";
    import Ads from "./Ads.svelte";
    import Title from "./Title.svelte";
    import Reportages from "./documentaries/ReportagesResume.svelte";
    import Investigations from "./documentaries/InvestigationsResume.svelte";
    import Interviews from "./documentaries/InterviewsResume.svelte";
    import NewsLetter from "./newsletter/NewsLetter.svelte";
</script>

<div>

    <section class="uk-padding">
        <div class="uk-grid-small" uk-grid>
            <div class="uk-width-1-1">
                <div>
                    <div class="uk-flex uk-flex-between">
                        <div><Title begin="Nos" end="Actualités" /></div>
                        <div><a href="#/posts" class="uk-button uk-button-default">Toutes les actualités</a></div>
                    </div>
                </div>
                <News />
            </div>
        </div>
    </section>

    <hr/>

    <section class="uk-section">
        <div class="uk-container">
            <div class="uk-flex uk-flex-between">
                <div><Title begin="Nos" end="Reportages" /></div>
                <div><a href="#/documentaries/type/reportage" class="uk-button uk-button-default">Voir tous les reportages</a></div>
            </div>
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-2-3@m">
                    <Reportages />
                </div>
                <div class="uk-width-1-3@m">
                    <Title end="Des reportages qui illustrent la société africaine" />
                </div>
            </div>
        </div>
    </section>

    <hr />

    <section class="uk-section">
        <div class="uk-container">
            <div class="uk-flex uk-flex-between">
                <div><Title begin="Nos" end="Enquêtes" /></div>
                <div><a href="#/documentaries/type/investigation" class="uk-button uk-button-default">Voir toutes les enquêtes</a></div>
            </div>
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3@m">
                    <Title end="Grâce à notre équipe, nous éffectuons des enquêtes dans tout le pays." />
                </div>
                <div class="uk-width-2-3@m">
                    <Investigations />
                </div>
            </div>
        </div>
    </section>

    <hr />

    <section class="uk-section">
        <div class="uk-container">
            <div class="uk-flex uk-flex-between">
                <div><Title begin="Nos" end="Interviews" /></div>
                <div><a href="#/documentaries/type/interview" class="uk-button uk-button-default">Voir toutes les interviews</a></div>
            </div>
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-2-3@m">
                    <Interviews />
                </div>
                <div class="uk-width-1-3@m">
                    <Title end="Nous réalisons des interviews avec des personnes inspirantes et prêtes à changer la donne" />
                </div>
            </div>
        </div>
    </section>

    <hr />

    <section class="uk-section">
        <div class="uk-container">

            <div class="uk-grid-small uk-grid-match uk-child-width-1-3@m" uk-grid>
        
                <div class="">
                    <div class="uk-card uk-card-default uk-card-body">
                        <p class="heading h4">
                            Nous nous battons pour un monde où tout le monde
                            est traité équitablement. <br />
                        </p>
                    </div>
                </div>
                <div class="">
                    <div class="uk-card uk-card-default uk-card-body">
                        <p class="heading h4">
                            Nous disons "Non !" aux injustices liées au sexe ou à l'origine.
                        </p>
                    </div>
                </div>
                <div class="">
                    <div class="uk-card uk-card-default uk-card-body">
                        <p class="heading h4">
                            Ensemble nous pouvons changer la donne
                        </p>
                    </div>
                </div>

            </div>
        
        </div>
        <hr>
    </section>

    <section class="uk-section">
        <div class="uk-container">
            <div><Title begin="Notre" end="Newsletter" /></div>
            <NewsLetter />
        </div>
    </section>

</div>