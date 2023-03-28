<template>
<br>
    <div>
        <label for="Date-select">Choisissez une date:</label>
        <br>
            <select id="Date-select"  @change="afficherSalle()">
                <option v-for="examen in this.allExamens" name="examendate" value={{examen.date}}>{{ examen.date }}</option>
            </select>
    </div>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
    name: "Examens",
    data() {
        return {
            apiUrl: "",
            allExamens: []
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
        afficherSalle()
          {
            var elem = document.getElementById('Salle-option');
            elem.style.visibility = 'visible';
          } 
    },
    })
</script>