<template>
  <v-container fluid>
    <v-card class="elevation-8">
      <v-card-title>
        <v-flex class="text-center">
          <p class="display-1">Crea un cliente nuevo</p>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 sm12 md4 pa-2>
            <v-text-field :rules="[() => direccion.size > 5 || 'Dirección no valida']" validate-on-blur v-model="nombre" solo label="Nombre"></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md4 pa-2>
            <v-text-field
              :rules="[() => rfc.length > 11 && rfc.length < 14 || 'RFC no valida']"
              validate-on-blur
              v-model="rfc"
              solo
              label="RFC"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md4 pa-2>
            <v-text-field :rules="[() => telefono.size >= 8 || 'Teléfono no valida']" validate-on-blur v-model="telefono" solo label="Teléfono"></v-text-field>
          </v-flex>

          <v-flex xs12 pa-2>
            <v-text-field :rules="[() => direccion.size > 5 || 'Dirección no valida']" validate-on-blur v-model="direccion" solo label="Dirección"></v-text-field>
          </v-flex>

          <v-flex xs12 pa-2 class="text-center">
            <v-btn rounded class="primary-btn" dark>Agregar</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    nombre: '',
    rfc: '',
    telefono: '',
    direccion: ''
  }),
  methods: {
    createClient () {

    }
  }
}
</script>