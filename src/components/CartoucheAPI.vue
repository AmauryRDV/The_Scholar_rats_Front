<template>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
    name: "Salles",
    data() {
        return {
            apiUrl: "",
            allSalles: []
        }
    },
    mounted() {
        this.apiUrl = import.meta.env.VITE_API_URL;
        axios.get(this.apiUrl + "api/Salles")
            .then(
                (response) => {
                    this.allSalles = response.data;
                }
            )
            .catch(
                (error) => {
                    console.log("ERROR:", error);
                }
            );
    },
    methods:{
        afficherEpreuve()
          {
            var elem = document.getElementById('Epreuve-option');
            elem.style.visibility = 'visible';
          },
    },
    })
</script>