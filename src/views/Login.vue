<template>
  <v-container fluid>
    <v-form v-model="valid">
      <v-layout row wrap>
        <v-flex xs12 class="text-center" pa-2>
          <p class="display-1">Login</p>
        </v-flex>

        <v-flex xs12 class="text-center" pa-2>
          <v-text-field
            label="Correo"
            outlined
            v-model="email"
            :rules="[() => email.length >= 6]"
            required
            validate-on-blur
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 class="text-center" pa-2>
          <v-text-field
            label="Contraseña"
            outlined
            type="password"
            v-model="password"
            :rules="[() => password.length >= 6]"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 pa-2 class="text-center">
          <v-btn
            large
            rounded
            class="primary-btn"
            :dark="valid"
            @click="login"
            :disabled="!valid"
          >Login</v-btn>
        </v-flex>
      </v-layout>
    </v-form>

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
          Esperando respuesta de servidor
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
    valid: false,
    isSending: false,
    email: '',
    password: ''
  }),
  methods: {
    login () {
      this.isSending = true
      let options = {
        headers: {
          'Authorization': 'Basic ' + btoa(this.email + ':' + this.password)
        }
      }

      this.$http.post('auth', {}, options).then(response => {
        this.isSending = false
        this.$cookies.set('authToken', response.data.token, '30d')
        this.$router.go(0)
      })
    }
  }
}
</script>