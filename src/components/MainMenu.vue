<template>
  <b-container>
    <b-row :gutter="20" style="margin-bottom: 3%">
      <b-col :span="12">
        <b-card border-variant="primary" shadow="hover">
          <b-button variant="primary" @click="goToArtists()">
            Ver todos los artistas de la colección
          </b-button>
        </b-card>
      </b-col>

      <b-col :span="12">
        <b-card border-variant="primary" shadow="hover">
          <b-button variant="primary" @click="goToAlbums()">
            Ver todos los álbumes de la colección
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row :gutter="20" style="margin-bottom: 3%">
      <b-col :span="12">
        <b-card border-variant="primary" shadow="hover">
          <b-button variant="primary" @click="goToTracks()">
            Ver todas las Canciones de la Colección
          </b-button>
        </b-card>
      </b-col>

      <b-col :span="12">
        <b-card border-variant="primary" shadow="hover">
          <b-button variant="primary" @click="goToGenres()">
            Ver todos los Géneros
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "MainMenu",
  methods: {
    goToArtists() {
      this.$router.push("/artists");
    },
    goToAlbums() {
      this.$router.push("/albums");
    },
    goToTracks() {
      this.$router.push("/tracks");
    },
    goToGenres() {
      this.$router.push("/genres");
    },
  },
};
</script>
