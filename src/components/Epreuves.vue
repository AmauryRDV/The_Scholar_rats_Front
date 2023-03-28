<template>
<br>
<div id="Epreuve-option" style="visibility:hidden;">
    <label for="Epreuve-select">Choisissez une épreuve:</label>
    <br>
        <select id="Epreuve-select"  @change="afficherExamen()">
            <option v-for="epreuve in this.allEpreuves" name="epreuveid" value={{epreuve.examen_id}}>{{ epreuve.epreuve }}</option>
        </select>
</div>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
    name: "Epreuves",
    data() {
        return {
            apiUrl: "",
            allEpreuves: []
        }
    },
    mounted() {
        this.apiUrl = import.meta.env.VITE_API_URL;
        axios.get(this.apiUrl + "api/Epreuves")
            .then(
                (response) => {
                    this.allEpreuves = response.data;
                }
            )
            .catch(
                (error) => {
                    console.log("ERROR:", error);
                }
            );
    },
    methods:{
        afficherExamen()
          {
            var elem = document.getElementById('Examen-option');
            elem.style.visibility = 'visible';
          },
    },
    })
</script>