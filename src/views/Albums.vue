<template>
  <b-container id="content">
    <b-row>
      <b-col class="sm-10">
        <h1>Álbumes</h1>
        <hr />
        <alert :message="message" v-if="showMessage"></alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="sm-10">
        <b-button variant="primary" v-b-modal.add-album-modal>
          Añadir Álbum
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
              v-b-modal.edit-album-modal
              @click="editAlbum(row.item)"
              class="mr-1"
            >
              <b-icon icon="pencil-fill" variant="light"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteAlbum(row.item)">
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
      title="Añadir un Álbum nuevo"
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
          label="Título:"
          label-for="form-add-title-input"
        >
          <b-form-input
            id="form-add-title-input"
            type="text"
            v-model="addAlbumForm.title"
            placeholder="Escriba el título del álbum"
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
      ref="editAlbumModal"
      id="edit-album-modal"
      title="Editar un Álbum"
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
            v-model="editAlbumForm.id"
            readonly
            placeholder="Identificador del Álbum"
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
            v-model="editAlbumForm.title"
            placeholder="Escriba el título del álbum"
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
import AlbumsDataService from "@/services/albums-data-service.js";

export default {
  data() {
    return {
      fields: [
        {
          key: "artist.name",
          label: "Artista",
        },
        {
          key: "title",
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
      addAlbumForm: {
        title: "",
      },
      editAlbumForm: {
        id: "",
        title: "",
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    retrieveAlbums() {
      AlbumsDataService.getAlbumList()
        .then((response) => {
          const items = response.data;
          this.items = items;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    retrieveAlbumTracks(id) {
      return id;
    },
    createAlbum(payload) {
      AlbumsDataService.postAlbum(payload)
        .then(() => {
          this.retrieveAlbums();
          this.message = "Álbum creado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveAlbums();
        });
    },
    updateAlbum(id, payload) {
      AlbumsDataService.putArtist(id, payload)
        .then(() => {
          this.retrieveArtists();
          this.message = "Álbum " + id + " actualizado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveAlbums();
        });
    },
    deleteAlbum(album) {
      // AlbumsDataService.deleteAlbum(album.id)
      //   .then(() => {
      //     this.retrieveAlbums();
      this.message = "Álbum " + album.id + " eliminado";
      this.showMessage = true;
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line
      //     console.log(error);
      //     this.retrieveAlbums();
      //   });
    },
    initForm() {
      this.addAlbumForm.title = "";
      this.editAlbumForm.id = "";
      this.editAlbumForm.title = "";
    },
    onAddSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-album-modal");
      const payload = {
        title: this.addAlbumForm.title,
      };
      this.createAlbum(payload);
      this.initForm();
    },
    onAddReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-album-modal");
      this.initForm();
    },
    editAlbum(album) {
      this.editAlbumForm = album;
    },
    onEditSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-album-modal");
      const payload = {
        title: this.editAlbumForm.title,
      };
      this.updateAlbum(this.editAlbumForm.id, payload);
      this.initForm();
    },
    onEditReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-album-modal");
      this.initForm();
    },
  },
  created() {
    this.retrieveAlbums();
  },
};
</script>
