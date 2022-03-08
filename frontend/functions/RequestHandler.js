class RequestHandler {
  url = "http://localhost:3001";

  #genericFetch = async (
    endpoint,
    method = "GET",
    body = null,
    hasNoContent = false
  ) => {
    const answer = await fetch(this.url + endpoint, {
      method,
      cache: "no-cache",
      ...(hasNoContent || {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      ...(body && { body }),
    });
    if (!answer.ok) {
      throw new Error(answer.statusText);
    }
    return answer;
  };

  getAnmeldungen = async () =>
    await (await this.#genericFetch("/anmeldung")).json();

  postAnmeldung = async (body) =>
    await this.#genericFetch("/anmeldung", "POST", JSON.stringify(body));

  postNeuigkeiten = async (body) =>
    await (await this.#genericFetch("/neuigkeiten", "POST", body, true)).json();

  updateNeuigkeiten = async (body, id) =>
    await this.#genericFetch(`/neuigkeiten/${id}`, "PATCH", body, true);

  getNeuigkeiten = async () =>
    await (await this.#genericFetch("/neuigkeiten")).json();

  deleteNeuigkeiten = async (id) =>
    await this.#genericFetch(`/neuigkeiten/${id}`, "DELETE");
}
export default new RequestHandler();
