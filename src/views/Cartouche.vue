<template>
    <header>
    <link rel="stylesheet" href="{{ asset\cartouche.css }}">
    </header>

    <section class="main">
        <div class="temps">
            <label for="debut"></label>

        </div>

        <div class="horloge">
5
        </div>

        <div class="cartouche">
        6

        </div>
        
        <div class="description">
            <form action="description">
                <textarea name="description" id="description" placeholder="Description" style="margin-left: 3%;resize: none;"  cols="100" rows="8">

                </textarea>
            </form>
        </div>
    </section>
</template>
<script>
import styles from "../assets/cartouche.css";
</script>