import http from "@/utils/http-common";
class ArtistsDataService {
  getArtistList() {
    return http.get("/artists/");
  }
  // getArtistById(id, params) {
  //   return http.get(`/artists/${id}`, { params });
  // }
  getArtistAlbums(id) {
    return http.get(`/artists/${id}/albums/`);
  }
  postArtist(payload) {
    return http.post("/artists/", payload);
  }
  putArtist(id, payload) {
    return http.put(`/artists/${id}`, payload, { headers: { 'If-Match': '*' } });
  }
  deleteArtist(id) {
    return http.put(`/artists/${id}`, { headers: { 'If-Match': '*' } });
  }
}
export default new ArtistsDataService();
