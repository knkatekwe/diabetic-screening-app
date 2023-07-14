<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Patients
        <v-btn color="primary" @click="newPatientDialog = true">Add New</v-btn>
      </h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Patients</p>
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
                :items="patients"
                :search="search"
                item-key="name">
              <template v-slot:[`item.options`]="{ item }">
                <v-btn color="primary"
                       small
                       @click="selectPatientVitals(item.id)">View Vitals {{ item.options }}
                </v-btn>
                <v-btn color="primary"
                       class="ml-3"
                       small
                       @click="selectPatientToAddVitals(item.id)">Add Vitals
                  {{ item.options }}
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!-- add new patient  -->
      <v-row justify="center">
        <v-dialog
            v-model="newPatientDialog"
            persistent
            max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Patient Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        label="First name*"
                        v-model="patientDetails.firstName"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        label="Last name*"
                        v-model="patientDetails.lastname"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="National ID"
                        v-model="patientDetails.idNumber"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6">
                    <v-text-field
                        label="Date of Birth*"
                        v-model="patientDetails.dob"
                        required
                        type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Phone number*"
                        v-model="patientDetails.phoneNumber"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Email"
                        v-model="patientDetails.email"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6">
                    <v-select
                        :items="['Male', 'Female']"
                        v-model="patientDetails.gender"
                        label="Gender*"
                        required
                    ></v-select>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Street address"
                        v-model="patientDetails.streetAddress"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Suburb"
                        v-model="patientDetails.suburb"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="City"
                        v-model="patientDetails.city"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-select
                        :items="['Bulawayo', 'Harare', 'Manicaland', ' Mashonaland Central', ' Mashonaland East', 'Mashonaland West', 'Masvingo', 'Matabeleland North']"
                        v-model="patientDetails.province"
                        label="Province*"
                        required
                    ></v-select>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-select
                        :items="['Zimbabwe']"
                        v-model="patientDetails.country"
                        label="Country*"
                        required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="newPatientDialog = false">
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="saveNewPatient">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- /add new patient -->

      <!-- add patient vitals -->
      <v-row justify="center">
        <v-dialog
            v-model="addPatientVitalsDialog"
            persistent
            max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Add {{ selectedPatient.firstName }} {{ selectedPatient.lastname }}'s vitals</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        label="Weight (kgs)*"
                        type="number"
                        min="0"
                        v-model="patientVitalDetail.weight"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        label="Height (cm)*"
                        type="number"
                        min="0"
                        v-model="patientVitalDetail.height"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Systolic (mm Hg)*"
                        type="number"
                        min="0"
                        v-model="patientVitalDetail.systolic"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Diastolic (mm Hg)*"
                        type="number"
                        min="0"
                        v-model="patientVitalDetail.diastolic"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12"
                         sm="6"
                         md="6">
                    <v-text-field
                        label="Blood glucose level*"
                        type="number"
                        min="0"
                        v-model="patientVitalDetail.bloodGlucoseLevel"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="addPatientVitalsDialog = false">
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="addPatientVitals">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- /add patient vitals -->

      <!-- view patient vitals -->
      <v-row justify="center">
        <v-dialog
            v-model="viewPatientVitalsDialog"
            persistent
            max-width="1200px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ selectedPatient.firstName }} {{ selectedPatient.lastname }}'s vitals</span>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="searchPatientVitals"
                  append-icon="mdi-magnify"
                  label="Search"
                  clearable
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-container>
                <!-- table goes in here -->
                <v-data-table
                    v-model="selected"
                    :headers="patientVitalsHeaders"
                    :items="patientVitals"
                    :search="searchPatientVitals"
                    item-key="name">
                  <template v-slot:[`item.bloodGlucoseLevel`]="{ item }">
                    {{ item.bloodGlucoseLevel }} ({{ item.bloodGlucoseCategory }})
                  </template>
                  <template v-slot:[`item.patientBMI`]="{ item }">
                    {{ item.patientBMI }} ({{ item.patientBMIStatus }})
                  </template>
                  <template v-slot:[`item.bloodPressureCategory`]="{ item }">
                    <v-chip
                        v-if="item.bloodPressureCategory == 'NORMAL'"
                        color="success"
                        class="ma-2">
                      {{ item.bloodPressureCategory }}
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        v-if="item.bloodPressureCategory == 'ELEVATED'"
                        color="warning">
                      {{ item.bloodPressureCategory }}
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        v-if="item.bloodPressureCategory == 'HIGH BLOOD PRESSURE (HYPERTENSION) STAGE 1'"
                        color="orange">
                      {{ item.bloodPressureCategory }}
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="red"
                        v-if="item.bloodPressureCategory == 'HIGH BLOOD PRESSURE (HYPERTENSION) STAGE 2'"
                        text-color="red">
                      {{ item.bloodPressureCategory }}
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="green"
                        v-if="item.bloodPressureCategory == 'HYPERTENSIVE CRISIS'"
                        text-color="red">
                      {{ item.bloodPressureCategory }}
                    </v-chip>
                  </template>
                </v-data-table>
                <!-- /table goes in here -->
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="viewPatientVitalsDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- /view patient vitals -->
    </div>
  </v-container>
</template>

<script>
import mock from './mock'

export default {
  name: 'Tables',
  data() {
    return {
      mock,
      selected: [],
      search: '',
      searchPatientVitals: '',
      headers: [
        {text: 'Recorded date', value: 'createdAt'},
        {text: 'First name', value: 'firstName'},
        {text: 'Last name', value: 'lastname'},
        {text: 'Phone number', value: 'phoneNumber'},
        {text: 'Bate of Birth', value: 'dob'},
        {text: 'Options', value: 'options'},
      ],
      patientVitalsHeaders: [
        {text: 'Record date', value: 'createdAt'},
        {text: 'Height (m)', value: 'height'},
        {text: 'Weight (kg)', value: 'weight'},
        {text: 'Body Mass Index', value: 'patientBMI'},
        {text: 'Blood Glucose Level (mg/dL)', value: 'bloodGlucoseLevel'},
        {text: 'Blood Glucose Category', value: 'bloodGlucoseCategory'},
        {text: 'Blood Pressure Category', value: 'bloodPressureCategory'},
        {text: 'Systolic (mm Hg)', value: 'systolic'},
        {text: 'Diastolic (mm Hg)', value: 'diastolic'},
      ],
      employee: [
        {
          name: 'Joe James',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'NY',
          select: false
        },
        {
          name: 'John Walsh',
          company: 'Example Inc.',
          city: 'Hartford',
          state: 'CT',
          select: false
        },
        {
          name: 'Bob Herm',
          company: 'Example Inc.',
          city: 'Tampa',
          state: 'FL',
          select: false

        },
        {
          name: 'James Houston',
          company: 'Example Inc.',
          city: 'Dallas',
          state: 'TX',
          select: false

        },
        {
          name: 'Prabhakar Linwood',
          company: 'Example Inc.',
          city: 'Hartford',
          state: 'CT',
          select: false
        },
        {
          name: 'Jelly bean',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'NY',
          select: false
        },
        {
          name: 'Kaui Ignace',
          company: 'Example Inc.',
          city: 'Hartford',
          state: 'CT',
          select: false
        },
        {
          name: 'Esperanza Susanne',
          company: 'Example Inc.',
          city: 'Tampa',
          state: 'FL',
          select: false
        },
        {
          name: 'Christian Birgitte',
          company: 'Example Inc.',
          city: 'Hartford',
          state: 'CT',
          select: false
        },
        {
          name: 'Meral Elias',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'NY',
          select: false
        },
        {
          name: 'Deep Pau',
          company: 'Example Inc.',
          city: 'Dallas',
          state: 'TX',
          select: false
        },
        {
          name: 'Sebastiana Hani',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'NY',
          select: false
        },
        {
          name: 'Marciano Oihana',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'TX',
          select: false
        },
        {
          name: 'Brigid Ankur',
          company: 'Example Inc.',
          city: 'Dallas',
          state: 'NY',
          select: false
        },
        {
          name: 'Anna Siranush',
          company: 'Example Inc.',
          city: 'Hartford',
          state: 'CT',
          select: false
        },
        {
          name: 'Avram Sylva',
          company: 'Example Inc.',
          city: 'Tampa',
          state: 'FL',
          select: false
        },
        {
          name: 'Serafima Babatunde',
          company: 'Example Inc.',
          city: 'Tampa',
          state: 'FL',
          select: false
        },
        {
          name: 'Gaston Festus',
          company: 'Example Inc.',
          city: 'Yonkers',
          state: 'NY',
          select: false
        },
      ],
      patients: [],
      patientVitals: [],
      patientDetails: {
        firstName: "",
        lastname: "",
        idNumber: '',
        phoneNumber: '',
        streetAddress: '',
        suburb: '',
        city: '',
        province: '',
        country: '',
        email: '',
        dob: "",
        gender: ""
      },
      patientVitalDetail: {
        weight: 0,
        height: 0,
        bloodGlucoseLevel: "",
        systolic: "",
        diastolic: "",
        patient: ""
      },
      selectedPatient: {},
      newPatientDialog: false,
      addPatientVitalsDialog: false,
      viewPatientVitalsDialog: false,
    }
  },

  methods: {
    async getPatients() {
      try {
        this.$http.get(
            "http://localhost:4000/patients"
        ).then((res) => {
          this.patients = res.data.payload;
        });
        console.log(`###`, this.patients);
      } catch (error) {
        console.log(error);
      }
    },

    selectPatientVitals(id) {
      console.log(id)
      this.patientVitalDetail.patient = id;
      this.viewPatientVitalsDialog = true;
      this.selectedPatient = this.patients.find((patient) => patient.id == id);
      this.$http.get(
          `http://localhost:4000/patient-vital/patient/${id}`
      ).then((res) => {
        this.newPatientDialog = false;
        this.patientVitals = res.data.payload;
      }).catch((err) => {
        console.log(err);
        this.$toast.error('Error loading patient vitals');
      });
    },

    selectPatientToAddVitals(id) {
      console.log(id);
      this.patientVitalDetail.patient = id;
      this.addPatientVitalsDialog = true;
      this.selectedPatient = this.patients.find((patient) => patient.id == id);
      console.log(this.selectedPatient)
    },

    async saveNewPatient() {
      try {
        this.$http.post(
            "http://localhost:4000/patients",
            this.patientDetails
        ).then(() => {
          this.newPatientDialog = false;
          this.patientDetails = {};
          this.getPatients();
          this.$toast.success('Patient added successfully');
        }).catch((err) => {
          console.log(err)
          this.$toast.error('Error saving patient');
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addPatientVitals() {
      try {
        this.$http.post(
            "http://localhost:4000/patient-vital",
            this.patientVitalDetail
        ).then(() => {
          this.addPatientVitalsDialog = false;
          this.patientVitalDetail = {};
          this.$toast.success('Patient vitals recorded added successfully');
        }).catch(() => {
          this.$toast.error('Error saving patient vitals');
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.getPatients();
  }
}

</script>

<style src="./Basic.scss" lang="scss"></style>
