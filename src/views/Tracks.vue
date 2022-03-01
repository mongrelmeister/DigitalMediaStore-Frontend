<template>
  <b-container id="content">
    <b-row>
      <b-col class="sm-10">
        <h1>Canciones</h1>
        <hr />
        <alert :message="message" v-if="showMessage"></alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="sm-10">
        <b-button variant="primary" v-b-modal.add-track-modal>
          Añadir Canción
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="sm-10">
        <b-table striped hover :items="items" :fields="fields" primary-key="id">
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="secondary"
              @click="row.toggleDetails"
              class="mr-1"
            >
              <b-icon icon="info-circle-fill" variant="light"></b-icon>
            </b-button>
            <b-button
              size="sm"
              variant="warning"
              v-b-modal.edit-track-modal
              @click="editTrack(row.item)"
              class="mr-1"
            >
              <b-icon icon="pencil-fill" variant="light"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteTrack(row.item)">
              <b-icon icon="trash-fill" variant="light"></b-icon>
            </b-button>
          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal
      ref="addTrackModal"
      id="add-track-modal"
      title="Añadir una nueva Canción"
      hide-footer
    >
      <b-form
        id="form-add"
        @submit="onAddSubmit"
        @reset="onAddReset"
        class="w-100"
      >
        <b-form-group
          id="form-add-title-group"
          label="Nombre:"
          label-for="form-add-title-input"
        >
          <b-form-input
            id="form-add-title-input"
            type="text"
            v-model="addTrackForm.title"
            placeholder="Escriba el título de la Canción"
          >
          </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="success">Enviar</b-button>
          <b-button type="reset" variant="danger">Restablecer</b-button>
        </b-button-group>
      </b-form>
    </b-modal>

    <b-modal
      ref="editTrackModal"
      id="edit-track-modal"
      title="Editar una Canción"
      hide-footer
    >
      <b-form
        id="form-edit"
        @submit="onEditSubmit"
        @reset="onEditReset"
        class="w-100"
      >
        <b-form-group
          id="form-edit-id-group"
          label="ID:"
          label-for="form-edit-id-input"
        >
          <b-form-input
            id="form-edit-id-input"
            type="text"
            v-model="editTrackForm.id"
            readonly
            placeholder="Identificador de la Canción"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-edit-title-group"
          label="Título:"
          label-for="form-edit-title-input"
        >
          <b-form-input
            id="form-edit-title-input"
            type="text"
            v-model="editTrackForm.title"
            placeholder="Escriba el título de la Canción"
          >
          </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="success">Enviar</b-button>
          <b-button type="reset" variant="danger">Restablecer</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import Alert from "@/components/Alert.vue";
import TracksDataService from "@/services/tracks-data-service.js";

export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Título",
        },
        {
          key: "actions",
          label: "Acciones",
        },
      ],
      items: [],
      message: "",
      showMessage: false,
      addTrackForm: {
        title: "",
      },
      editTrackForm: {
        id: "",
        title: "",
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    retrieveTracks() {
      TracksDataService.getTrackList()
        .then((response) => {
          const items = response.data;
          this.items = items;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    createTrack(payload) {
      TracksDataService.postTrack(payload)
        .then(() => {
          this.retrieveTracks();
          this.message = "Canción creada";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveTracks();
        });
    },
    updateTrack(id, payload) {
      TracksDataService.putTrack(id, payload)
        .then(() => {
          this.retrieveTracks();
          this.message = "Canción con id: " + id + " actualizada";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveTracks();
        });
    },
    deleteTrack(track) {
      TracksDataService.deleteTrack(track.id)
        .then(() => {
          this.retrieveTracks();
          this.message = "Canción con id: " + track.id + " eliminada";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveTracks();
        });
    },
    initForm() {
      this.addTrackForm.title = "";
      this.editTrackForm.id = "";
      this.editTrackForm.title = "";
    },
    onAddSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-track-modal");
      const payload = {
        title: this.addTrackForm.title,
      };
      this.createTrack(payload);
      this.initForm();
    },
    onAddReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-track-modal");
      this.initForm();
    },
    editTrack(track) {
      this.editTrackForm = track;
    },
    onEditSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-track-modal");
      const payload = {
        title: this.editTrackForm.title,
      };
      this.updateTrack(this.editTrackForm.id, payload);
      this.initForm();
    },
    onEditReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-track-modal");
      this.initForm();
    },
  },
  created() {
    this.retrieveTracks();
  },
};
</script>
