import http from "@/utils/http-common";
class GenresDataService {
    getGenresList(params) {
        return http.get("/genres/", { params });
    }
    // getArtistById(id, params) {
    //   return http.get(`/artists/${id}`, { params });
    // }

    postGenre(payload) {
        return http.post("/genres/", payload);
    }
    putGenre(id, payload) {
        return http.put(`/genres/${id}`, payload, { headers: { 'If-Match': '*' } });
    }
    deleteGenre(id) {
        return http.delete(`/genres/${id}`, { headers: { 'If-Match': '*' } });
    }
}
export default new GenresDataService();