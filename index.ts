import axios from "axios";

import type { paths } from "api-schema";
import type { Method as Methods } from "axios";

type Path = keyof paths;
type Method<M extends Path> = keyof paths[M];
type Params<P extends Path, M extends Method<P>> = paths[P][M] extends {
        parameters: any;
    }
    ? paths[P][M]["parameters"]
    : undefined;
type Body<P extends Path, M extends Method<P>> = paths[P][M] extends {
        requestBody: {
            content: {
                "application/json": any
            }
        };
    }
    ? paths[P][M]["requestBody"]["content"]["application/json"]
    : undefined;

export const request = async <P extends Path, M extends Method<P>>(
    path: P,
    method: M,
    params: Params<P, M> extends undefined ? null : Params<P, M>,
    body: Body<P, M> extends undefined ? null : Params<P, M>,
) => {
    // @ts-ignore
    type Status = keyof paths[P][M]["responses"];
    type Data = {
        // @ts-ignore
        [S in Status]: paths[P][M]["responses"][S]["content"]["application/json"];
    };

    const { data, status } = await axios({
        url: path,
        method: method as Methods,
        validateStatus: (status) => status < 500,
        ...(method === "get" ? { params: params?.query } : { data: body }),
    });

    return { data, status } as { status: Status; data: Data };
};

(async () => {
    try {
        const { data, status } = await request(
            "/wapi/mini_apps/accounting",
            "get",
            {
                query: {
                    mini_app_ids: ["1", "2"],
                    order_by: "",
                    order_direction: "",
                    page: "1",
                    per_page: "2",
                }
            }, null
        );

        switch (status) {
            case 200:
                const ss = data[status].available;
                data[status].transactions;
                break;
            case 403:
                data[status].error;
        }
    } catch (_) {
        //
    }

    try {
        const { data, status } = await request("/accounts/balances", "get", {
            query: { ids: [1, 2, 3] },
        }, null);

        data[status].forEach((item, index) => {});
    } catch (_) {
        //
    }


})();
