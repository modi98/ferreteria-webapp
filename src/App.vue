<template>
  <v-app>
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
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    
  }),
};
</script>

<style>
  .v-toolbar {
    background-color: #7264C9 !important;
  }

  .primary-btn {
    background-color: #7264C9 !important;
  }
</style>
