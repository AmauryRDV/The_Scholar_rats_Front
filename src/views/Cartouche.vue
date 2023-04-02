
<script type="text/javascript">
import styles from "../assets/cartouche.css";
import axios from "axios";

export default({
  name: "HomeView",
  components: {},
  data() {
      return {
        apiUrl: "",
        cartouche: {},
        loading: false,


            
      }
  },
  beforeMount(){
    this.apiUrl = import.meta.env.VITE_API_URL
    this.getCartouche()
  },
  mounted() {
    },
  methods:{
        getCartouche()
        {
        this.loading=true;
        axios.get(this.apiUrl + "api/examen/"+this.$route.params.id)
            .then(
                (response) => {
                    console.log(response);
                    this.loading=false;
                    this.cartouche = response.data;
                }
            )
        }
        },
})
</script>

<template>
    <header>
    </header>

    <section class="main">
    <div v-if="this.loading===true">loading</div>
    <div v-else>
        <h1>CARTOUCHE</h1>
    <div class="cartouche">
        <p>academie : {{ this.cartouche.formation.academie }} </p> <p>Session : {{ new Date(this.cartouche.date).getFullYear() }}</p> <p>Modele : EN</p>
        <p>Examen ou Concours : {{ this.cartouche.epreuve.matiere  }}</p> <p>Serie : {{ this.cartouche.formation.serie }}</p>
        <p>Spécialité/Option : {{ this.cartouche.formation.serie }}</p> <p>Repère de l'épreuve : {{ this.cartouche.repere }}</p>
        <p>Epreuve/Sous-épreuve : {{ this.cartouche.epreuve.matiere }}</p>
        </div>

        <div class="temps">
            <label for="debut">Debut de l'épreuve : {{ this.cartouche.epreuve.debutepreuve }}</label>
            <label for="fin">Fin de l'épreuve : {{ this.cartouche.epreuve.finepreuve }}</label>
            <label for="sortie">Mise en loge : {{ this.cartouche.epreuve.miseenloge }}</label>
            <label for="tier_temp">Tier-temp : Enzo c'est Chazelle viens 1vs1 si t'es un homme un vrai</label>
        </div>
    <div class="containe_horloge">
    <iframe width='480' height='215' style='border:none !important;background:none !important;background:transparent !important' marginheight='0' marginwidth='0' frameborder='0' scrolling='no' comment='/*defined*/' src='https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjp0cnVlLCJ3LTExIjpmYWxzZSwidy0xMyI6dHJ1ZSwidy0xNCI6ZmFsc2UsInctMTUiOnRydWUsInctMTEwIjpmYWxzZSwidy13aWR0aC0wIjp0cnVlLCJ3LXdpZHRoLTEiOmZhbHNlLCJ3LXdpZHRoLTIiOmZhbHNlLCJ3LTE2IjoiMjRweCIsInctMTkiOiI5NiIsInctMTciOiIxNiIsInctMjEiOnRydWUsImJnaW1hZ2UiOi0xLCJiZ2ltYWdlU2V0IjpmYWxzZSwidy0yMWMwIjoiI2ZmZmZmZiIsInctMCI6dHJ1ZSwidy0zIjpmYWxzZSwidy0zYzAiOiIjMzQzNDM0Iiwidy0zYjAiOiIxIiwidy02IjoiIzM0MzQzNCIsInctMjAiOnRydWUsInctNCI6IiNmZmZmZmYiLCJ3LTE4IjpmYWxzZSwidy13aWR0aC0yYy0wIjoiMzAwIiwidy0xMTUiOmZhbHNlfQ==&lang=fr&cityid=1020'></iframe>
    </div>
    </div>
    </section>
        

</template>