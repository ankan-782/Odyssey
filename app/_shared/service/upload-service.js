import axios from "axios";

export default class UploadService {
	static upload(path, data) {
		return axios.post(path, data, UploadService.getAuthHeader());
	}

	static getAuthHeader() {
		return {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
	}
}
