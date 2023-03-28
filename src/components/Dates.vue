<template>
<br>
    <div>
        <label for="Date-select">Choisissez une date:</label>
        <br>
            <select id="Date-select"  @change="afficherSalle()">
                <option v-for="epreuve in this.allEpreuves" name="epreuvedate" value={{epreuve.session}}>{{ epreuve.session }}</option>
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
        afficherSalle()
          {
            var elem = document.getElementById('Salle-option');
            elem.style.visibility = 'visible';
          } 
    },
    })
</script>