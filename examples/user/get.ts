import { request } from "request";

(async () => {
    try {
        const { data, status } = await request(
            "/users/{id}",
            "get",
            { path: { id: "1" } },
            null
        );

        switch (status) {
            case 200:
                data[status].username;
                break;
            case 404:
                data[status].id;
                break;
        }
    } catch (_) {}
})();


