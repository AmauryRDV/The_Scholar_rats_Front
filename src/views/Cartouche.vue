
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
        alertesverif:[],
        timer:"",
        horloge:"",
        timer2:"",
        heuredebut:"",
        heurefin:"",
        miseenloge:"",
        listeAlertes:[],
        chronometre:moment("2025-01-01 00:00:00","HH:mm:ss"),
        go:"1",
        url:"http://tsr_project.test/",



            
      }
  },
  beforeMount(){
    // Avant le chargement de la page
    this.apiUrl = import.meta.env.VITE_API_URL
    this.getCartouche()
    this.getAlertverif()
  },
  mounted() {
    // Lors de l'ouverture de la page

    //FOnction qui permet de vérifier toutes les 60 secondes si une erreur est présente
    this.timer = setInterval(()=>{
        this.getAlert()
        //vérifie si il y a un objet donc une erreur présente
        if(Object.keys(this.alertes).length != 0)
        {
        confirm("Alerte :"+this.alertes.titre+"\n"+"Infos :"+this.alertes.description+"\n"+"Lien :"+this.alertes.pdf)
        //Envoie l'alerte vers le tableau et vide la liste des alertes
        this.listeAlertes.push({titre: this.alertes.titre, description: this.alertes.description, pdf: this.alertes.pdf})
        this.alertes={};
        }
    },60000)

    //Interval pour l'horloge et le chronomètre
    this.timer2 = setInterval(()=>
    {
        // Si le chrono est lancée
        if(this.go==3)
        {
            var elem=document.getElementById('chronometre');
            this.chronometre.add(1,"seconds");
            if(this.chronometre.hours()>=this.moitieduree.hours())
            {
                elem.style.color="orange";
            }
            if(this.chronometre.hours()>=this.tqepreuve.hours() && this.tqepreuve.hours()>this.moitieduree.hours())
            {
                elem.style.color="darkred";
            }
        }
        //Cette fonction met à jour la date
        this.showDate()
    },1000)
    },

  methods:{
    //Définie si on lance le chrono ou qu'on le stop
        setGo()
        {
            if (this.go==1) //On lance le chrno
            {
            this.go=2;
            var elem = document.getElementById('chronometre');
            elem.style.visibility = 'visible';
            elem.style.display='block';
            var elem = document.getElementById('lancer');
            elem.textContent="Stop";
            var elem = document.getElementById('pause');
            elem.style.visibility='visible';

            }
            else //On stop le chrono
            {
                this.go=1;
                var elem = document.getElementById('chronometre');
                elem.style.visibility = 'hidden';
                elem.style.display='none';
                var elem = document.getElementById('lancer');
                elem.textContent="Lancer";
            }
        },

        setPause() //Permet de mettre en pause le chrono ou de relancer le chrono
        {
            var elem = document.getElementById('pause');
            if (elem.textContent=="Pause")
            {
                this.go=4; 
                elem.textContent="Relancer";  
            }
            else
            {
                this.go=3;
                elem.textContent="Pause";
            }
        },
        showDate() //initialise l'horloge et le chrono
        { 
            if(this.go==2)
            {
                this.chronometre=moment("2025-01-01 00:00:00","YYYY-DD-MM HH:mm:ss");
                this.go=3;
            }
            this.horloge=moment().format("HH:mm:ss");
        },

        //récupère l'examen depuis l'id et permet de rentrer les infos cartouches
        getCartouche()
        {
        this.loading=true;
        axios.get(this.apiUrl + "api/examen/"+this.$route.params.id)
            .then(
                (response) => {
                    this.loading=false;
                    this.cartouche = response.data;
                    
                    //Définie les heures de base
                    this.heuredebut=moment("2025-01-01 "+ this.cartouche.epreuve.debutepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.heurefin=moment("2025-01-01 "+ this.cartouche.epreuve.finepreuve,"YYYY-DD-MM HH:mm:ss");
                    this.miseenloge=moment("2025-01-01 "+ this.cartouche.epreuve.miseenloge,"YYYY-DD-MM HH:mm:ss");

                    // Pour calculer la duree de l'épreuve
                    this.stockheurefin=moment(this.heurefin);
                    this.duree=moment(this.stockheurefin.subtract(this.heuredebut.hours(),'hours'));
                    // Pour calculer la moitier de l'épreuve
                    this.moitieduree=moment(this.duree.hours()/2,'hours');
                    this.moitiedureestock=moment(this.moitieduree);
                    // Pour calculer les 3/4 de l'épreuve
                    this.temp=moment(this.moitiedureestock.hours()/2,'hours');
                    this.tqepreuve=(this.moitiedureestock.add(this.temp.hours(),'hours'));

                    //Calcul du tier-temps
                    this.stockduree=moment(this.duree);
                    this.stock=moment(this.stockduree.hours()/3,"hours");
                    this.stockfin=moment(this.heurefin);
                    this.tiertemps=moment(this.stockfin.add(this.stock.hours(),"hours"));

                }
            )
        },

        getAlert() // Fonction qui recherche les erreurs depuis l'API
        {
            axios.get(this.apiUrl + "api/alerte/"+this.$route.params.id)
            .then(
                (response) => {
                    this.alertes = response.data;
                }
            )
        },

        getAlertverif()
        {
            axios.get(this.apiUrl + "api/alerte/verif/"+this.$route.params.id)
            .then(
                (response) => {
                    this.alertesverif = response.data;
                    this.alertesverifstock=Array.from(this.alertesverif);
                    this.alertesverifstock.forEach(alerte => {this.listeAlertes.push({titre: alerte.titre, description: alerte.description, pdf: alerte.pdf})});
                }
            )
        },
        myFunction() {
        alert("this.alertes.description");
            },
        },
})




</script>

<template>


    

    <section class="main">
    <div v-if="this.loading===true">loading</div>
    <div v-else>
        <div class="cartouche-materialise" v-if="this.cartouche.estdematerialise==0" name="materialise">
        <div class="line">
        <div class="text"><p>Examen ou Concours : <b>{{ this.cartouche.epreuve.matiere  }}</b></p></div> <div class="text"><p>Serie * : <b>{{ this.cartouche.formation.serie }}</b></p></div>
        </div>
        <div class="line">
        <div class="text"><p>Repère de l'épreuve : <b>{{ this.cartouche.repere }}</b></p></div> <div class="text"><p>Epreuve/Sous-épreuve : <b>{{ this.cartouche.epreuve.matiere }}</b></p></div>
        </div>
        <div class="line">
        <div class="text m"><p>Session : <b>{{ new Date(this.cartouche.date).getFullYear() }}</b></p></div>
        </div>
        </div>
        <div v-else>
            <div class="contain-cartouche">
        <div class="cartouche" >
        <div class="line">
        <div class="text"> <p>academie : <b>{{ this.cartouche.formation.academie }}</b> </p></div> <div class="text"><p>Session : <b>{{ new Date(this.cartouche.date).getFullYear() }}</b></p></div> <div class="text"><p>Modele :  <b> EN</b></p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Examen ou Concours : <b>{{ this.cartouche.epreuve.matiere  }}</b></p></div> <div class="text"><p>Serie * : <b>{{ this.cartouche.formation.serie }}</b></p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Spécialité/Option : <b>{{ this.cartouche.formation.serie }}</b></p></div> <div class="text"><p>Repère de l'épreuve : <b> {{ this.cartouche.repere }}</b></p></div>
        </div>
        <div class="line">
        <div class="text"> <p>Epreuve/Sous-épreuve : <b>{{ this.cartouche.epreuve.matiere }}</b></p></div>
        </div>
        </div>
    </div>
</div>
        <div class="tous-alerte">
        <h1>ALERTES</h1>
        <div class="table-alerte">
            <table>
                <tr>
                    <th id="pour_border">Titre</th>
                    <th id="pour_border">Description</th>
                    <th>Lien</th>
                </tr>
                <tr v-for="alerte in this.listeAlertes">
                    <td id="pour_border" class="pour_border">{{ alerte.titre }}</td>
                    <td id="pour_border" class="pour_border"> <button @click="myFunction()" > Description</button>
                    </td>
                    <td class="pour_border"><a target="_blank" :href="href=this.url+alerte.pdf">Lien</a></td>
                    
                </tr>
            </table>
        </div>
        </div>


        <div class="temps">
            <label for="debut">Debut de l'épreuve : {{ this.heuredebut.format("HH:mm") }}</label>
            <label for="fin">Fin de l'épreuve : {{ this.heurefin.format("HH:mm") }}</label>
            <label for="sortie">Mise en loge : {{ this.miseenloge.format("HH:mm") }}</label>
            <label for="tier_temp">tiers-temps : {{ this.tiertemps.format("HH:mm") }}</label>
        </div>
    <div class="horloge">
        <div class="le-tout">
        <svg style="width: 5%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
        <span id='horloge' style="color:blue;font-size:7em;margin-right: 6%;">{{ this.horloge }}</span>
        </div>
    </div>
    <div style="display: flex;flex-direction: column;align-items: center;">
         <span id="chronometre" style="color:green;font-size:7em;visibility: hidden;display: none;">{{ this.chronometre.format("HH:mm:ss")}}</span>
    </div>
    <div style="display: flex;flex-direction: row;justify-content:center;">
            <button id="lancer" @click="setGo()">Lancer</button>
            <button style="visibility:hidden;" id="pause" @click="setPause()">Pause</button>
    </div>
    </div>
    </section>
    

</template>