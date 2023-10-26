import { request } from "request";

(async () => {
    try {
        const { data, status } = await request("/users", "post", null, {
            first_name: "Roman",
            last_name: "Ogarkov",
            username: "ogarich89",
        });

        console.log(data[status]);
    } catch (_) {}
})();
