<template>
  <v-container fluid>
    <v-flex xs12 pa-5>
      <v-card class="elevation-8">
        <v-card-title>
          Clientes
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
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
            :items="clients"
            :search="search"
            class="elevation-1"
            hide-default-footer
          >
          </v-data-table>
        </v-flex>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isLoading: true,
    clients: [],
    search: '',
    headers: [
      {
        text: 'Nombre',
        value: 'name'
      },
      {
        text: 'Teléfono',
        value: 'phone'
      },
      {
        text: 'Correo',
        value: 'email'
      },
      {
        text: 'Dirección',
        value: 'direction',
      },
      {
        text: 'RFC',
        value: 'rfc',
      }
    ]
  }),
  methods: {
    getClients () {
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      this.$http.get('clients', options).then(response => {
        this.clients = response.data
        this.isLoading = false
      }, response => {
        this.isLoading = false
      })
    }
  },
  created() {
    this.getClients()
  }
}
</script>