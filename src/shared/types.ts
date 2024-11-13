import { type Request } from "express"

type RequestType<Params extends string = string> = {
    body?: any
    queryParams?: Record<string, any>
    pathParams?: Params
}

type RequestParams<Param extends string> = Record<Param, string>

/* Alternate type for Request
 * @example
 *  async (req: ReqType<{ body:{
 *      login: string,
 *      password: string
 *  }}>, res: Response) => {
 */
export type ReqType<T extends RequestType = Omit<Request, "params">> =
    T extends RequestType
        ? Request<
              RequestParams<T["pathParams"]>,
              {},
              T["body"],
              T["queryParams"]
          >
        : Request
