class RequestHandler {
    url = "http://localhost:3001";

    #genericGET = async endpoint => {
        const answer = await fetch(this.url + endpoint);
        if (!answer.ok) {
            return new Error(answer.statusText);
        }
        return answer;
    };

    #genericPOST = async (endpoint, data) => {
        const answer = await fetch(this.url + endpoint, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!answer.ok) {
            return new Error(answer.statusText);
        }
        return answer;
    };

    getAnmeldungen = async () => await this.#genericGET("/anmeldung").json();

    postAnmeldung = async body => await this.#genericPOST("/anmeldung", body);

    getNeuigkeiten = async () => await this.#genericGET("/neuigkeiten").json();
}
export default new RequestHandler();
