import http from "@/utils/http-common";
class AlbumsDataService {
  getAlbumList() {
    return http.get("/albums/");
  }
  // getArtistById(id, params) {
  //   return http.get(`/albums/${id}`, { params });
  // }
  getAlbumTracks(id) {
    return http.get(`/albums/${id}/tracks/`);
  }
  postAlbum(payload) {
    return http.post("/albums/", payload);
  }
  putAlbum(id, payload) {
    return http.put(`/albums/${id}`, payload, { headers: { 'If-Match': '*' } });
  }
  deleteAlbum(id) {
    return http.put(`/albums/${id}`, { headers: { 'If-Match': '*' } });
  }
}
export default new AlbumsDataService();
