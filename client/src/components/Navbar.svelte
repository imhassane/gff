<script>
  import { Link } from "svero";
  import Search from "./Search.svelte";
</script>

<nav class="uk-navbar-container" uk-navbar>
  <div class="uk-navbar-left">

    <ul class="uk-navbar-nav">
    
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/">Présentation</Link></li>
        <li><Link href="/">Nos activités</Link></li>
        <li>
          <Link href="/rights">Droits</Link>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><Link href="/rights/men-rights">Droits de l'Homme</Link></li>
              <li><Link href="/rights/women-rights">Droits de la femme</Link></li>
              <li><Link href="/rights/children-rights">Droits des enfants</Link></li>
            </ul>
          </div>
        </li>
        <li>
          <Link href="/documentaries/type/reportage">Véritas</Link>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="/documentaries/type/reportage">Reportages</a></li>
              <li><a href="/documentaries/type/investigation">Enquêtes</a></li>
              <li><a href="/documentaries/type/interview">Interviews</a></li>
            </ul>
          </div>
        </li>
        <li><Link href="/">Apprendre à s'engager</Link></li>

    </ul>

  </div>

  <div class="uk-navbar-right">

      <div class="uk-navbar-item">
        <Search />
      </div>

  </div>
</nav>

