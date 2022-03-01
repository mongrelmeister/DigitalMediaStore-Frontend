import http from "@/utils/http-common";
class TracksDataService {
    getTrackList() {
        return http.get("/tracks/");
    }
    // getArtistById(id, params) {
    //   return http.get(`/artists/${id}`, { params });
    // }

    postTrack(payload) {
        return http.post("/tracks/", payload);
    }
    putTrack(id, payload) {
        return http.put(`/tracks/${id}`, payload, { headers: { 'If-Match': '*' } });
    }
    deleteTrack(id) {
        return http.delete(`/tracks/${id}`, { headers: { 'If-Match': '*' } });
    }
}
export default new TracksDataService();
