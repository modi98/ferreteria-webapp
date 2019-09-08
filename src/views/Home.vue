<template>
  <v-container fluid>
    <v-flex pa-5>
      <v-card class="elevation-8 mx-auto" max-width="1200">
        <v-layout wrap justify-center>
          <v-flex xs12 class="text-center" pt-5>
            <p class="display-3" transition="slide-x-transition">Bienvenido a <b>Ferrimax</b></p>
          </v-flex>

          <v-flex xs12 pt-5>
            <v-row align="center" justify="center">
              <v-img src="../assets/homeIcon.gif" max-height="200" max-width="700"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs6 class="text-center" pt-5>
            <p class="display-1">En esta aplicación tú tienes el poder para administrar a tus clientes y tener toda información respaldada en la nube.</p>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="pb-5">
          <v-flex xs6 class="text-right" pa-2>
            <v-btn
              class="primary-btn"
              dark
              large
              rounded
              @click="$router.push('/createClient')"
            >Agregar cliente</v-btn>
          </v-flex>
          
          <v-flex xs6 class="text-left" pa-2>
            <v-btn
              class="primary-btn"
              dark
              large
              rounded
            >Lista de clientes</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    
  </v-container>
</template>

<script>
export default {
  
}
</script>
