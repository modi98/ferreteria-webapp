<template>
  <div>
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
                solo
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 pa-2>
              <v-text-field
                label="email"
                solo
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 pa-2>
              <v-text-field
                label="Contraseña"
                solo
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 pa-2>
              <v-text-field
                label="Confirma contraseña"
                solo
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text>Close</v-btn>
        <v-btn color="blue darken-1" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    email: '',
    password: ''
  })
}
</script>