<template>
  <main>
    <div class="cool">
      <form id="ipc" @submit.prevent="submitForm">
        <br>
        <div>
        <label for="Date-select">Choisissez une date:</label>
        <br>
            <select  v-model="this.date" id="Date-select" @change="afficherSalle()">
              <option>--Choisissez une date--</option>
                <option v-for="examen in this.allExamens" name="examendate">{{ examen.date }}</option>
            </select>
        </div>
        <br>
    <div style="visibility:hidden;" id="Salle-option">
        <label for="Salle-select">Choisissez une salle:</label>
        <br>
            <select v-model="this.salle" id="Salle-select"  @change="afficherEpreuve()">
              <option>--Choisissez une salle--</option>
                <option v-for="sallebydate in this.SallesByDate" name="salleid" :value=sallebydate.id>{{ sallebydate.nom  }}</option>
            </select>
    </div>
    <br>
    <div id="Epreuve-option" style="visibility:hidden;">
    <label for="Epreuve-select">Choisissez une épreuve:</label>
    <br>
        <select v-model="this.epreuve" id="Epreuve-select"  @change="afficherFormation()">
          <option>--Choisissez une epreuve--</option>
            <option v-for="epreuve in this.EpreuvesBydates" name="epreuveid" :value=epreuve.id>{{ epreuve.matiere }}</option>
        </select>
    </div>
    <br>
    <div style="visibility:hidden;" id="Formation-option">
        <label for="Formation-select">Choisissez une formation:</label>
        <br>
            <select  v-model="this.formation" id="Formation-select"  @change="afficherBouton()">
              <option>--Choisissez une formation--</option>
                <option v-for="formation in this.FormationsBydates" name="formationid" :value=formation.id>{{ formation.nom   }}</option>
            </select>
    </div>
      <br>
      <button id="validation" style="visibility:hidden" type="submit">Valider</button>
    </form>
  </div>

  </main>
</template>

<style>
</style>

<script>
/*import Examens from "@/components/Examens.vue";
import Epreuves from "../components/Epreuves.vue";
import Salles from "../components/Salles.vue";
import Dates from "../components/Dates.vue";*/
import styles from "../assets/base.css";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
      return {
        apiUrl: "",
            allExamens: [],
            allEpreuves:[],
            SallesByDate:[],
            EpreuvesBydates:[],
            FormationsBydates:[],
            date:'',
            epreuve:'',
            salle:'',
            formation:'',

            
      }
  },
  mounted() {
        this.apiUrl = import.meta.env.VITE_API_URL;
        axios.get(this.apiUrl + "api/Examens")
            .then(
                (response) => {
                    this.allExamens = response.data;
                }
            )
            .catch(
                (error) => {
                    console.log("ERROR:", error);
                }
            );
    },
  methods:{
      submitForm(){
        axios.get(this.apiUrl + "api/cartouche/"+this.date+"/"+this.epreuve+"/"+this.salle+"/"+this.formation)
        .then((response)=>{
          this.cartouche=response.data;
          this.$router.push({name: 'cartouche', params: {id: this.cartouche.id}});  
        })
      },
      
      afficherSalle()
          {
           axios.get(this.apiUrl+"api/salles/date/"+this.date)
           .then((response) => {
            this.SallesByDate=response.data;});
            var elem = document.getElementById('Salle-option');
            elem.style.visibility = 'visible';
          },
          
          afficherEpreuve()
          {
            axios.get(this.apiUrl+"api/Epreuves/date/"+this.date)
           .then((response) => {
            this.EpreuvesBydates=response.data;});
            var elem = document.getElementById('Epreuve-option');
            elem.style.visibility = 'visible';
          },

          afficherFormation()
          {
            axios.get(this.apiUrl+"api/Formations/date/"+this.date)
           .then((response) => {
            this.FormationsBydates=response.data;});
            var elem = document.getElementById('Formation-option');
            elem.style.visibility = 'visible';
          },

        afficherBouton()
          {
            var elem = document.getElementById('validation');
            elem.style.visibility = 'visible';
          },
      
      
        },
})
</script>


