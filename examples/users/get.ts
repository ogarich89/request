import { request } from "request";

(async () => {
    try {
        const { data, status } = await request(
            "/users",
            "get",
            { query: { page: 1, per_page: 10 } },
            null
        );

        data[status].forEach((item) => {});
    } catch (_) {}
})();