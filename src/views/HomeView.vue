<script>
import Examens from "@/components/Examens.vue";
import Epreuves from "../components/Epreuves.vue";
import Salles from "../components/Salles.vue";
import Dates from "../components/Dates.vue";
import styles from "../assets/base.css";
import { defineComponent } from "vue";


export default defineComponent({
  name: "HomeView",
  components: {Epreuves, Examens,Salles,Dates},
  data() {
      return {
      }
  },
  methods:{
      afficherExamen()
          {
            var test = document.getElementById("Examen-select");
            this.allExamens.find(test=>test.examen_id == id);
          },
      submitForm(){
        this.$router.push('/cartouche');
      }
      ,
      
        },
})
</script>

<template>
  <main>
    <div class="cool">
      <form id="ipc" @submit.prevent="submitForm">
      <Dates></Dates>
      <Salles></Salles>
      <Epreuves></Epreuves>
      <Examens></Examens>
      <br>
      <button id="validation" style="visibility:hidden" type="submit">Valider</button>
    </form>
  </div>

  </main>
</template>

<style>
</style>
