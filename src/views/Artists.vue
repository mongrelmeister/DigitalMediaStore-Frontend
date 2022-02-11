<template>
  <b-container id="content">
    <b-row>
      <b-col class="sm-10">
        <h1>Artistas</h1>
        <hr />
        <alert :message="message" v-if="showMessage"></alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="sm-10">
        <b-button variant="primary" v-b-modal.add-artist-modal>
          Añadir Artista
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
              v-b-modal.edit-artist-modal
              @click="editArtist(row.item)"
              class="mr-1"
            >
              <b-icon icon="pencil-fill" variant="light"></b-icon>
            </b-button>
            <b-button
              size="sm"
              variant="danger"
              @click="deleteArtist(row.item)"
            >
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
      ref="addArtistModal"
      id="add-artist-modal"
      title="Añadir un Artista nuevo"
      hide-footer
    >
      <b-form
        id="form-add"
        @submit="onAddSubmit"
        @reset="onAddReset"
        class="w-100"
      >
        <b-form-group
          id="form-add-name-group"
          label="Nombre:"
          label-for="form-add-name-input"
        >
          <b-form-input
            id="form-add-name-input"
            type="text"
            v-model="addArtistForm.name"
            placeholder="Escriba el nombre del artista"
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
      ref="editArtistModal"
      id="edit-artist-modal"
      title="Editar un Artista"
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
            v-model="editArtistForm.id"
            readonly
            placeholder="Identificador del Artista"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-edit-name-group"
          label="Nombre:"
          label-for="form-edit-name-input"
        >
          <b-form-input
            id="form-edit-name-input"
            type="text"
            v-model="editArtistForm.name"
            placeholder="Escriba el nombre del artista"
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
import ArtistsDataService from "@/services/artists-data-service.js";

export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nombre",
        },
        {
          key: "actions",
          label: "Acciones",
        },
      ],
      items: [],
      message: "",
      showMessage: false,
      addArtistForm: {
        name: "",
      },
      editArtistForm: {
        id: "",
        name: "",
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    retrieveArtists() {
      ArtistsDataService.getArtistList()
        .then((response) => {
          const items = response.data;
          this.items = items;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    retrieveArtistAlbums(id) {
      return id;
    },
    createArtist(payload) {
      ArtistsDataService.postArtist(payload)
        .then(() => {
          this.retrieveArtists();
          this.message = "Artista creado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveArtists();
        });
    },
    updateArtist(id, payload) {
      ArtistsDataService.putArtist(id, payload)
        .then(() => {
          this.retrieveArtists();
          this.message = "Artista " + id + " actualizado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveArtists();
        });
    },
    deleteArtist(artista) {
      // ArtistsDataService.deleteArtist(artista.id)
      //   .then(() => {
      //     this.retrieveArtists();
      this.message = "Artista " + artista.id + " eliminado";
      this.showMessage = true;
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line
      //     console.log(error);
      //     this.retrieveArtists();
      //   });
    },
    initForm() {
      this.addArtistForm.name = "";
      this.editArtistForm.id = "";
      this.editArtistForm.name = "";
    },
    onAddSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-artist-modal");
      const payload = {
        name: this.addArtistForm.name,
      };
      this.createArtist(payload);
      this.initForm();
    },
    onAddReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-artist-modal");
      this.initForm();
    },
    editArtist(artist) {
      this.editArtistForm = artist;
    },
    onEditSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-artist-modal");
      const payload = {
        name: this.editArtistForm.name,
      };
      this.updateArtist(this.editArtistForm.id, payload);
      this.initForm();
    },
    onEditReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-artist-modal");
      this.initForm();
    },
  },
  created() {
    this.retrieveArtists();
  },
};
</script>
