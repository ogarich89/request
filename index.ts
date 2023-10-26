import axios from "axios";

import type { Method as Methods } from "axios";

export const create = <paths>() => {
    type Path = keyof paths;
    type Method<P extends Path> = keyof paths[P];
    type Params<P extends Path, M extends Method<P>> = paths[P][M] extends {
            parameters: any;
        }
        ? paths[P][M]["parameters"]
        : undefined;
    type Body<P extends Path, M extends Method<P>> = paths[P][M] extends {
            requestBody: {
                content: {
                    "application/json": any;
                };
            };
        }
        ? paths[P][M]["requestBody"]["content"]["application/json"]
        : undefined;

   return async <P extends Path, M extends Method<P>>(
        path: P,
        method: M,
        params: Params<P, M> extends undefined ? null : Params<P, M>,
        body: Body<P, M> extends undefined ? null : Body<P, M>
    ) => {
        type Response = paths[P][M] extends { responses: any }
            ? paths[P][M]["responses"]
            : any;
        type Status = keyof Response;
        type Data = {
            [S in Status]: Response[S] extends { content: any }
                ? Response[S]["content"] extends { "application/json": any }
                    ? Response[S]["content"]["application/json"]
                    : Response[S]["content"]
                : undefined;
        };

        const url = Object.keys(params?.path as Record<string, string>).reduce(
            (acc, key) => acc.replace(`{${key}}`, params?.path[key]),
            path as string
        );

        const { data, status } = await axios({
            url,
            method: method as Methods,
            validateStatus: (status) => status < 500,
            ...(method === "get" ? { params: params?.query } : { data: body }),
        });

        return { data, status } as {
            status: Status;
            data: Data;
        };
    };
}
