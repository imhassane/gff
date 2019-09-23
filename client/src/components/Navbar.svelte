<script>
  import Search from "./Search.svelte";
</script>

<nav class="uk-navbar-container" uk-navbar>
  <div class="uk-navbar-left">

    <ul class="uk-navbar-nav">
    
        <li><a href="/">Accueil</a></li>
        <li><a href="/">Présentation</a></li>
        <li><a href="/">Nos activités</a></li>
        <li>
          <a href="/rights">Droits</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="/rights/men-rights">Droits de l'Homme</a></li>
              <li><a href="/rights/women-rights">Droits de la femme</a></li>
              <li><a href="/rights/children-rights">Droits des enfants</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="_">Véritas</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="/documentaries/type/reportage">Reportages</a></li>
              <li><a href="/documentaries/type/investigation">Enquêtes</a></li>
              <li><a href="/documentaries/type/interview">Interviews</a></li>
            </ul>
          </div>
        </li>
        <li><a href="/">Apprendre à s'engager</a></li>

    </ul>

  </div>

  <div class="uk-navbar-right">

      <div class="uk-navbar-item">
        <Search />
      </div>

  </div>
</nav>

