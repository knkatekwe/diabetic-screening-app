<template xmlns:div="http://www.w3.org/1999/html">
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Notifications</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Notifications</p>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  clearable
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="notifications"
                :search="search"
                item-key="name">
              <template v-slot:[`item.priority`]="{ item }">
                <v-chip
                    small
                    color="warning"
                    class="ma-2">
                  {{ item.priority }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import mock from "../Patients/mock";

export default {
  name: 'Notifications',
  data() {
    return {
      mock,
      selected: [],
      search: '',
      notifications: [],
      headers: [
        {text: 'Recorded date', value: 'createdAt'},
        {text: 'Patient', value: 'title'},
        {text: 'Priority', value: 'priority'},
        {text: 'Content', value: 'content'},
      ],
    }
  },

  methods: {
    async getNotifications() {
      try {
        this.$http.get(
            "http://localhost:4000/notifications"
        ).then((res) => {
          this.notifications = res.data.payload;
        });
        console.log(`###`, this.notifications);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getNotifications();
  }
};

</script>

<style src="./Notifications.scss" lang="scss"></style>
