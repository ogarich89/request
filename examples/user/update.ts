import { request } from "request";

(async () => {
    try {
        const { data, status } = await request(
            "/users/{id}",
            "put",
            { path: { id: "1" } },
            { first_name: "Roman", last_name: "Ogarkov", username: "ogarich89" }
        );

        data[status].id;
    } catch (_) {}
})();
