
<script type="text/javascript">
import styles from "../assets/cartouche.css";
import axios, { formToJSON } from "axios";
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
        horloge:"",
        timer2:"",
        heuredebut:"",
        heurefin:"",
        miseenloge:"",



            
      }
  },
  beforeMount(){
    this.apiUrl = import.meta.env.VITE_API_URL
    this.getCartouche()
  },
  mounted() {
    this.timer = setInterval(()=>{
        this.getAlert()
        if(Object.keys(this.alertes).length != 0)
        {
        confirm("Alerte :"+this.alertes.titre+"\n"+"Infos :"+this.alertes.description+"\n"+"Lien :"+this.alertes.pdf)
        this.alertes={};
        }
    },10000)
    this.timer2 = setInterval(()=>
    {
        this.showDate()
    },1000)
    },
  methods:{
        showDate()
        {
            this.horloge=moment().format("HH:mm:ss");
        },
        getCartouche()
        {
        this.loading=true;
        axios.get(this.apiUrl + "api/examen/"+this.$route.params.id)
            .then(
                (response) => {
                    this.loading=false;
                    this.cartouche = response.data;
                    this.heuredebut=moment("2025-01-01 "+ this.cartouche.epreuve.debutepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.heurefin=moment("2025-01-01 "+ this.cartouche.epreuve.finepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.miseenloge=moment("2025-01-01 "+ this.cartouche.epreuve.miseenloge,"YYYY-DD-MM HH:mm:ss");

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


    

    <section class="main">
    <div v-if="this.loading===true">loading</div>
    <div v-else>
        <div class="cartouche-materialise" v-if="this.cartouche.estdematerialise==0" name="materialise">
        <div class="line">
        <div class="text"><p>Examen ou Concours : {{ this.cartouche.epreuve.matiere  }}</p></div> <div class="text"><p>Serie * : {{ this.cartouche.formation.serie }}</p></div>
        </div>
        <div class="line">
        <div class="text"><p>Repère de l'épreuve : {{ this.cartouche.repere }}</p></div> <div class="text"><p>Epreuve/Sous-épreuve : {{ this.cartouche.epreuve.matiere }}</p></div>
        </div>
        <div class="line">
        <div class="text m"><p>Session : {{ new Date(this.cartouche.date).getFullYear() }}</p></div>
        </div>
        </div>

        <div class="cartouche" v-else>
        <div class="line">
        <div class="text"> <p>academie : {{ this.cartouche.formation.academie }} </p></div> <div class="text"><p>Session : {{ new Date(this.cartouche.date).getFullYear() }}</p></div> <div class="text"><p>Modele : EN</p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Examen ou Concours : {{ this.cartouche.epreuve.matiere  }}</p></div> <div class="text"><p>Serie * : {{ this.cartouche.formation.serie }}</p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Spécialité/Option : {{ this.cartouche.formation.serie }}</p></div> <div class="text"><p>Repère de l'épreuve : {{ this.cartouche.repere }}</p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Epreuve/Sous-épreuve : {{ this.cartouche.epreuve.matiere }}</p></div>
        </div>
        </div>
        <h1>ALERTES</h1>
        <div class="table-alerte">
            <table>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Lien</th>
                </tr>
                <tr>
                    <td>afzfafza</td>
                    <td>zaffza</td>
                    <td>azfzaffzaf</td>
                </tr>
            </table>
        </div>
        
        <div class="temps">
            <label for="debut">Debut de l'épreuve : {{ this.heuredebut.format("HH:mm") }}</label>
            <label for="fin">Fin de l'épreuve : {{ this.heurefin.format("HH:mm") }}</label>
            <label for="sortie">Mise en loge : {{ this.miseenloge.format("HH:mm") }}</label>
            <label for="tier_temp">Tier-temp : </label>
        </div>
    <div>
        <span id='horloge' style="color:lightblue;font-size:7em;">{{ this.horloge }}</span>
    </div>
    </div>
    </section>
    

</template>