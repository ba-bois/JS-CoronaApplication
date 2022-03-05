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

    #genericSimplePOST = async (endpoint, data) => {
        const answer = await fetch(this.url + endpoint, {
            method: "POST",
            cache: "no-cache",
            body: data,
        });
        if (!answer.ok) {
            return new Error(answer.statusText);
        }
        return answer;
    };

    #genericDELETE = async endpoint => {
        const answer = await fetch(this.url + endpoint, {
            method: "DELETE",
        });
        if (!answer.ok) {
            return new Error(answer.statusText);
        }
        return answer;
    };

    #genericPATCH = async (endpoint, data) => {
        const answer = await fetch(this.url + endpoint, {
            method: "PATCH",
            cache: "no-cache",
            body: data,
        });
        if (!answer.ok) {
            return new Error(answer.statusText);
        }
        return answer;
    };

    getAnmeldungen = async _ => await (await this.#genericGET("/anmeldung")).json();

    postAnmeldung = async body => await this.#genericPOST("/anmeldung", body);

    postNeuigkeiten = async body => await this.#genericSimplePOST("/neuigkeiten", body);

    updateNeuigkeiten = async (body, id) => await this.#genericPATCH(`/neuigkeiten/${id}`, body);

    getNeuigkeiten = async _ => await (await this.#genericGET("/neuigkeiten")).json();

    deleteNeuigkeiten = async id => await this.#genericDELETE(`/neuigkeiten/${id}`);
}
export default new RequestHandler();
