<template>
  <v-container fluid>
    <v-flex xs12 pa-5>
      <v-card class="elevation-8">
        <v-card-title>
          Usuarios
          <div class="flex-grow-1"></div>
          <v-layout>
            <v-flex xs9 pa-2>
              <v-text-field
                v-model="search"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs3 pa-2>
              <v-btn
                class="primary-btn"
                rounded
                dark
                large
                @click="dialogNewUser = true"
              >Agregar</v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-flex xs12 pa-2 class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
            v-if="isLoading"
          ></v-progress-circular>
          <v-data-table
            v-else
            :headers="headers"
            :items="users"
            :search="search"
            class="elevation-1"
            hide-default-footer
          ></v-data-table>
        </v-flex>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialogNewUser" max-width="600">
      <v-card class="elevation-8">
        <v-card-title>
          <span class="headline">Nuevo usuario</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-layout row wrap>
              <v-flex xs12 md6 pa-2>
                <v-text-field
                  label="Nombre"
                  outlined
                  v-model="newUser.name"
                  :rules="[() => newUser.name.length > 5 || 'Nombre no valido']"
                  required
                  lazy-validation
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pa-2>
                <v-select
                  label="Rol"
                  outlined
                  :items="roles"
                  v-model="newUser.role"
                  :rules="[() => newUser.role.length > 0 || 'Rol no valido']"
                  required
                ></v-select>
              </v-flex>

              <v-flex xs12 pa-2>
                <v-text-field
                  label="Email"
                  outlined
                  v-model="newUser.email"
                  :rules="[() => newUser.email.length > 4 || 'Correo no valido']"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pa-2>
                <v-text-field
                  label="Contraseña"
                  outlined
                  type="password"
                  v-model="newUser.password"
                  :rules="[() => newUser.password.length >= 8 || 'La contraseña debe contener al menos 8 caracteres']"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pa-2>
                <v-text-field
                  label="Confirma contraseña"
                  outlined
                  type="password"
                  v-model="newUser.confPassword"
                  :rules="[() => newUser.confPassword === newUser.password || 'Las contraseñas no coinciden']"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 pt-2 class="text-right">
                <v-btn style="color: #7264C9" text @click="dialogNewUser = false">Cerrar</v-btn>
                <v-btn
                  class="primary-btn"
                  :dark="valid"
                  rounded
                  @click="createUser"
                  :disabled="!valid"
                >Crear</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

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
          Creando usuario
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    isSending: false,
    valid: false,
    dialogNewUser: false,
    newUser: {
      name: '',
      email: '',
      role: '',
      password: '',
      confPassword: ''
    },
    users: [],
    search: '',
    headers: [
      {
        text: 'Nombre',
        value: 'name'
      },
      {
        text: 'Correo',
        value: 'email'
      },
      {
        text: 'Rol',
        value: 'role'
      },
      {
        text: 'Fecha de creación',
        value: 'createdAt',
      }
    ],
    roles: [
      {
        text: 'Admin',
        value: 'admin'
      },
      {
        text: 'User',
        value:'user'
      }
    ]
  }),
  methods: {
    getClients () {
      this.isLoading = true
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      this.$http.get('users', options).then(response => {
        this.users = response.data
        this.isLoading = false
      })
    },
    createUser () {
      this.dialogNewUser = false
      this.isSending = true
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      this.$http.post('users', this.newUser, options).then(() => {
        this.isSending = false
        this.getClients()
        this.newUser = {
          name: '',
          email: '',
          role: '',
          password: '',
          confPassword: ''
        }
      })
    }
  },
  created() {
    this.getClients()
  }
}
</script>