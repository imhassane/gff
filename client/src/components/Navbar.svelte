<script>
  import { ROUTER } from "./router";
  import Search from "./Search.svelte";
</script>

<nav class="uk-navbar-container uk-visible@m" uk-navbar>
  <div class="uk-navbar-left">

    <ul class="uk-navbar-nav">
    
        <li><a href="/">Accueil</a></li>
        <li><a href="{ROUTER.PAGE(1, "presentation")}">Présentation</a></li>
        <li><a href="{ROUTER.PAGE(2, "activites")}">Nos activités</a></li>
        <li>
          <a href="{ROUTER.PAGE(3, "droits")}">Droits</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="{ROUTER.PAGE(4, "droits/droits-de-l-homme")}">Droits de l'Homme</a></li>
              <li><a href="{ROUTER.PAGE(5, "droits/droits-de-la-femme")}">Droits de la femme</a></li>
              <li><a href="{ROUTER.PAGE(6, "droits/droits-des-enfants")}">Droits des enfants</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="/documentaries/type/reportage">Véritas</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("reportage")}">Reportages</a></li>
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("investigation")}">Enquêtes</a></li>
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("interview")}">Interviews</a></li>
            </ul>
          </div>
        </li>
        <li><a href="{ROUTER.PAGE(7, "apprendre-a-s-engager")}">Apprendre à s'engager</a></li>

    </ul>

  </div>

  <div class="uk-navbar-right">

      <div class="uk-navbar-item">
        <Search />
      </div>

  </div>
</nav>

<nav class="uk-navbar uk-navbar-container uk-margin uk-hidden@m">
    <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav" href="#"></a>
    </div>
    <div class="uk-navbar-center">
      <a href="/" class="uk-logo uk-link-reset uk-text-muted">Girls For Future</a>
    </div>
</nav>

<div id="offcanvas-nav" uk-offcanvas="overlay: true">
    <div class="uk-offcanvas-bar">

        <ul class="uk-nav uk-nav-default">
            <li><a href="/">Accueil</a></li>
        <li><a href="{ROUTER.PAGE(1, "presentation")}">Présentation</a></li>
        <li><a href="{ROUTER.PAGE(2, "activites")}">Nos activités</a></li>
        <li>
          <a href="{ROUTER.PAGE(3, "droits")}">Droits</a>
          <ul class="uk-nav-sub">
              <li><a href="{ROUTER.PAGE(4, "droits/droits-de-l-homme")}">Droits de l'Homme</a></li>
              <li><a href="{ROUTER.PAGE(5, "droits/droits-de-la-femme")}">Droits de la femme</a></li>
              <li><a href="{ROUTER.PAGE(6, "droits/droits-des-enfants")}">Droits des enfants</a></li>
            </ul>
        </li>
        <li>
          <a href="/documentaries/type/reportage">Véritas</a>
          <ul class="uk-nav-sub">
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("reportage")}">Reportages</a></li>
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("investigation")}">Enquêtes</a></li>
              <li><a href="{ROUTER.DOCUMENTARIES_TYPE("interview")}">Interviews</a></li>
          </ul>
        </li>
        <li><a href="{ROUTER.PAGE(7, "apprendre-a-s-engager")}">Apprendre à s'engager</a></li>
        </ul>

    </div>
</div>