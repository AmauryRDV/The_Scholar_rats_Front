
<script type="text/javascript">
import styles from "../assets/cartouche.css";
import axios from "axios";
import moment from 'moment';

export default({
  name: "HomeView",
  components: {},
  data() {
      return {
        apiUrl: "",
        cartouche: {},
        alertes: {},
        loading: false,
        timer:"",
        mescouilles:"",


            
      }
  },
  beforeMount(){
    this.apiUrl = import.meta.env.VITE_API_URL
    this.getCartouche()
    this.getAlert()
  },
  mounted() {
    this.timer = setInterval(()=>{
        this.getAlert()
        confirm("Alerte :"+this.alertes.titre+"\n"+"Infos :"+this.alertes.description+"\n"+"Lien :"+this.alertes.pdf)
        },6000000)
        
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
                    this.macouille=moment("2025-01-01 "+ this.cartouche.epreuve.debutepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.macouillebleu=moment("2025-01-01 "+ this.cartouche.epreuve.finepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.pausecouille=moment("2025-01-01 "+ this.cartouche.epreuve.miseenloge,"YYYY-DD-MM HH:mm:ss");
                    this.stockcouillasse=moment(this.macouillebleu);
                    console.log(this.macouillebleu);
                    this.stockcouillasse3=moment(this.macouillebleu);
                    this.stockcouillasse2=moment(this.stockcouillasse.subtract(this.macouille.hours(),"hours"));
                    this.pluscouille=moment(this.stockcouillasse3.add(this.stockcouillasse2.hours(),"hours"));
                }
            )
        },

        getAlert()
        {
            axios.get(this.apiUrl + "api/alerte/"+this.$route.params.id)
            .then(
                (response) => {
                    this.alertes = response.data;
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
            <label for="debut">Debut de l'épreuve : {{ this.macouille.format("HH:mm") }}</label>
            <label for="fin">Fin de l'épreuve : {{ this.macouillebleu.format("HH:mm") }}</label>
            <label for="sortie">Mise en loge : {{ this.pausecouille.format("HH:mm") }}</label>
            <label for="tier_temp">Tier-temp : {{ this.pluscouille.format("HH:mm") }}</label>
        </div>
    <div class="containe_horloge">
    <iframe width='480' height='215' style="border:none !important;background:none !important;background:transparent !important" marginheight='0' marginwidth='0' frameborder='0' scrolling='no' comment='/*defined*/' src='https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjp0cnVlLCJ3LTExIjpmYWxzZSwidy0xMyI6dHJ1ZSwidy0xNCI6ZmFsc2UsInctMTUiOnRydWUsInctMTEwIjpmYWxzZSwidy13aWR0aC0wIjp0cnVlLCJ3LXdpZHRoLTEiOmZhbHNlLCJ3LXdpZHRoLTIiOmZhbHNlLCJ3LTE2IjoiMjRweCIsInctMTkiOiI5NiIsInctMTciOiIxNiIsInctMjEiOnRydWUsImJnaW1hZ2UiOi0xLCJiZ2ltYWdlU2V0IjpmYWxzZSwidy0yMWMwIjoiI2ZmZmZmZiIsInctMCI6dHJ1ZSwidy0zIjpmYWxzZSwidy0zYzAiOiIjMzQzNDM0Iiwidy0zYjAiOiIxIiwidy02IjoiIzM0MzQzNCIsInctMjAiOnRydWUsInctNCI6IiNmZmZmZmYiLCJ3LTE4IjpmYWxzZSwidy13aWR0aC0yYy0wIjoiMzAwIiwidy0xMTUiOmZhbHNlfQ==&lang=fr&cityid=1020'></iframe>
    </div>
    </div>
    </section>
        

</template>