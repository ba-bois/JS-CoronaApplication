export default class RequestHandler {
    #url = "http://localhost:3001";

    #genericGET = async (endpoint) => {
        return await fetch(this.#url + endpoint);
    };

    #genericPOST = async (endpoint, data) => {
        return await fetch(this.#url + endpoint, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    };

    getAnmeldungen = async () => await this.#genericGET("/anmeldung");

    postAnmeldung = async (body) => await this.#genericPOST("/anmeldung", body);

    getNeuigkeiten = async () => await this.#genericGET("/neuigkeiten");
}
