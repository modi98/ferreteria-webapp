<template>
  <v-container fluid>
    <v-card class="elevation-8">
      <v-card-title>
        <v-flex class="text-center">
          <p class="display-1">Crea un cliente nuevo</p>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="createForm">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 pa-2>
              <v-text-field
                :rules="[() => nombre.length > 5 || 'Nombre no valido']"
                lazy-validation
                v-model="nombre"
                outlined
                label="Nombre"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4 pa-2>
              <v-text-field
                :rules="[() => telefono.length >= 8 || 'Teléfono no valida']"
                lazy-validation
                v-model="telefono"
                outlined
                label="Teléfono"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4 pa-2>
              <v-text-field
                :rules="[() => telefono.length >= 8 || 'Email no valida']"
                lazy-validation
                v-model="email"
                outlined
                label="Correo"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 pa-2>
              <v-text-field
                :rules="[() => rfc.length > 11 && rfc.length < 14 || 'RFC no valida']"
                lazy-validation
                v-model="rfc"
                outlined
                label="RFC"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 pa-2>
              <v-text-field
                :rules="[() => direccion.length > 5 || 'Dirección no valida']"
                v-model="direccion"
                outlined
                label="Dirección"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 pa-2 class="text-center">
              <v-btn
                rounded
                class="primary-btn"
                :dark="valid"
                @click="createClient"
                :disabled="!valid"
              >Agregar</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialogSuccess"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Cliente creado</v-card-title>

        <v-card-text>
          El cliente se agrego correctamente a la base de datos, si cometiste algun error contacta a un administrador.
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            class="primary-btn"
            text
            dark
            @click="dialogSuccess = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
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
          Creando cliente
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
    isSending: false,
    dialogSuccess: false,
    valid: false,
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    rfc: ''
  }),
  methods: {
    createClient () {
      this.isSending = true
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      let payload = {
        name: this.nombre,
        email: this.email,
        phone: this.telefono,
        direction: this.direccion,
        rfc: this.rfc
      }

      this.$http.post('clients', payload, options).then(response => {
        this.nombre = '',
        this.email = '',
        this.telefono = '',
        this.direccion = '',
        this.rfc = ''
        this.dialogSuccess = true
        this.$refs.createForm.reset()
        this.isSending = false
      }, response => {
        this.isSending = false
      })
    }
  }
}
</script>