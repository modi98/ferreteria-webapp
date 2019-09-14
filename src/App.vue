<template>
  <v-app v-if="user !== null">
    <v-app-bar app dark v-if="this.$vuetify.breakpoint.name !== 'sm' && this.$vuetify.breakpoint.name !== 'xs'">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/')">Ferrimax</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="user.role === 'admin'" text @click="$router.push('/reportUsers')">
        <span class="mr-2">Usuarios</span>
      </v-btn>
      <v-btn text @click="$router.push('/createClient')">
        <span class="mr-2">Agregar cliente</span>
      </v-btn>
      <v-btn v-if="user.role === 'admin'" text @click="$router.push('/reportClients')">
        <span class="mr-2">Clientes</span>
      </v-btn>
      <v-btn text @click="logout">
        <span class="mr-2">Cerrar sesión</span>
      </v-btn>
    </v-app-bar>

    <div v-else>
      <v-app-bar
        class="primary-background"
        dark
        app
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        
        <v-toolbar-title class="headline text-uppercase">
          <span>Ferrimax</span>
        </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        v-model="drawer"
        temporary
        app
      >
        <v-list
          nav
          dense
          class="pt-5"
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-if="user.role === 'admin'" @click="$router.push('/reportUsers')">
              <v-list-item-content>
                <v-list-item-title>Usuarios</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="user.role === 'admin'" @click="$router.push('/reportClients')">
              <v-list-item-title>Clientes</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/createClient')">
              <v-list-item-title>Agregar cliente</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>

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
    isSending: false,
    drawer: false
  }),
  methods: {
    getMe () {
      this.isSending = true

      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      this.$http.get('users/me', options).then(response => {
        this.user = response.data
        this.isSending = false
      }, response => {
        this.isSending = false
      })
    },
    logout () {
      this.$cookies.remove('authToken')
      this.$router.go(0)
    }
  },
  created() {
    if (this.$cookies.isKey('authToken')) {
      this.getMe()
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Questrial");
  .v-toolbar {
    background-color: #7264C9 !important;
  }

  .primary-btn {
    background-color: #00C2A2 !important;
  }

  .primary-background {
    background-color: #7264C9 !important;
  }

  .v-application {
    font-family: 'Montserrat', sans-serif;
  }
</style>
