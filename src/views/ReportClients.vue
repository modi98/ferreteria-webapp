<template>
  <v-container fluid>
    <v-flex xs12 pa-5>
      <v-card class="elevation-8">
        <v-card-text>
          <v-layout row wrap>
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
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-chip :color="getColor(item.calories)" dark>Ver</v-chip>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isLoading: true,
    clients: [],
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
        text: 'Información',
        value: 'actions',
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

      this.$http.get('clients', {}, options).then(response => {
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