<template>
<br>
    <div style="visibility:hidden;" id="Examen-option">
        <label for="Examen-select">Choisissez un examen:</label>
        <br>
            <select id="Examen-select"  @change="afficherBouton()">
                <option v-for="examen in this.allExamens" name="examenid" value={{examen.id}}>{{ examen.coderepere   }}</option>
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
        afficherBouton()
          {
            var elem = document.getElementById('validation');
            elem.style.visibility = 'visible';
          },
    },
    },
    )
</script>