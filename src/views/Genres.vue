<template>
  <b-container id="content">
    <b-row>
      <b-col class="sm-10">
        <h1>Géneros</h1>
        <hr />
        <alert :message="message" v-if="showMessage"></alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="sm-10">
        <b-button variant="primary" v-b-modal.add-genre-modal>
          Añadir Género
        </b-button>
      </b-col>
      <pagination
        :totalPages="10"
        :perPage="10"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
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
              v-b-modal.edit-genre-modal
              @click="editGenre(row.item)"
              class="mr-1"
            >
              <b-icon icon="pencil-fill" variant="light"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteGenre(row.item)">
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
      ref="addGenreModal"
      id="add-genre-modal"
      title="Añadir un nuevo género"
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
            v-model="addGenreForm.name"
            placeholder="Escriba el nombre del género"
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
      ref="editGenreModal"
      id="edit-genre-modal"
      title="Editar un Género"
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
            v-model="editGenreForm.id"
            readonly
            placeholder="Identificador del Género"
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
            v-model="editGenreForm.name"
            placeholder="Escriba el nombre del Género"
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
import Pagination from "@/components/Pagination.vue";
import GenresDataService from "@/services/genres-data-service.js";

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
      currentPage: 1,
      items: [],
      message: "",
      showMessage: false,
      addGenreForm: {
        name: "",
      },
      editGenreForm: {
        id: "",
        name: "",
      },
    };
  },
  components: {
    alert: Alert,
    Pagination,
  },
  methods: {
    retrieveGenres(currentPage) {
      GenresDataService.getGenresList({ page: currentPage })
        .then((response) => {
          const items = response.data;
          this.items = items;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    createGenre(payload) {
      GenresDataService.postGenre(payload)
        .then(() => {
          this.retrieveGenres(this.currentPage);
          this.message = "Género creado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveGenres(this.currentPage);
        });
    },
    updateGenre(id, payload) {
      GenresDataService.putGenre(id, payload)
        .then(() => {
          this.retrieveGenres(this.currentPage);
          this.message = "Género con id: " + id + " actualizado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveGenres(this.currentPage);
        });
    },
    deleteGenre(genre) {
      GenresDataService.deleteGenre(genre.id)
        .then(() => {
          this.retrieveGenres(this.currentPage);
          this.message = "Género con id: " + genre.id + " eliminado";
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.retrieveGenres(this.currentPage);
        });
    },
    initForm() {
      this.addGenreForm.name = "";
      this.editGenreForm.id = "";
      this.editGenreForm.name = "";
    },
    onAddSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-genre-modal");
      const payload = {
        name: this.addGenreForm.name,
      };
      this.createGenre(payload);
      this.initForm();
    },
    onAddReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("add-genre-modal");
      this.initForm();
    },
    editGenre(genre) {
      this.editGenreForm = genre;
    },
    onEditSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-genre-modal");
      const payload = {
        name: this.editGenreForm.name,
      };
      this.updateGenre(this.editGenreForm.id, payload);
      this.initForm();
    },
    onEditReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide("edit-genre-modal");
      this.initForm();
    },
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
      this.retrieveGenres(this.currentPage);
    },
  },
  created() {
    this.retrieveGenres(this.currentPage);
  },
};
</script>
