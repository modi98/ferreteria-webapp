<template>
  <v-app v-if="user !== null">
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/')">Ferrimax</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text >
        <span class="mr-2">Usuarios</span>
      </v-btn>
      <v-btn text >
        <span class="mr-2">Clientes</span>
      </v-btn>
      <v-btn text @click="$router.push('/CreateClient')">
        <span class="mr-2">Agregar cliente</span>
      </v-btn>
      <v-btn text >
        <span class="mr-2">Cerrar sesión</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

  <v-app v-else-if="isSending">
    <v-dialog
      v-model="isSending"
      persistent
      width="300"
    >
      <v-card
        class="primary-background"
        dark
      >
        <v-card-text class="text-center">
          Cargando
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>

  <v-app v-else>
    <v-app-bar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/')">Ferrimax</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-flex pa-5>
        <v-card class="elevation-8 mx-auto" max-width="600">
          <v-card-text>
            <Login/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-content>
  </v-app>
</template>

<script>
import Login from './views/Login'
export default {
  components: {
    Login
  },
  name: 'App',
  data: () => ({
    user: null,
    isSending: false
  }),
  created() {
    if (this.$cookies.isKey('authToken')) {
      this.isSending = true

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      this.$http.get('users/me', options).then(response => {
        console.log(response.data)
        this.user = response.data
        this.isSending = false
      })
    }
  },
};
</script>

<style>
  .v-toolbar {
    background-color: #7264C9 !important;
  }

  .primary-btn {
    background-color: #7264C9 !important;
  }

  .primary-background {
    background-color: #7264C9 !important;
  }
</style>
