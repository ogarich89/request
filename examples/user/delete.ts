import { request } from "request";

(async () => {
    try {
        const { data, status } = await request(
            "/users/{id}",
            "delete",
            { path: { id: "1" } },
            null
        );

        switch (status) {
            case 200:
                const success = data[status];
                console.log(success);
                break;
            case 403:
                const error = data[status];
                console.log(error);
                break;
        }
    } catch (_) {}
})();
