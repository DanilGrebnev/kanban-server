import { type Request } from "express"

type RequestType<
    Params extends string = string,
    Cookies extends string = string,
> = {
    body?: any
    queryParams?: Record<string, any>
    pathParams?: Params
    cookies?: Cookies
}

type RequestParams<Param extends string> = Record<Param, string>
type RequestCookie<Cookie extends string> = Record<Cookie, string>

/* Alternate type for Request
 * @example
 *  async (req: ReqType<{ body:{
 *      login: string,
 *      password: string
 *  }}>, res: Response) => {
 */
export type ReqType<
    T extends RequestType = Omit<Request, "params" | "cookies">,
> = T extends RequestType
    ? Omit<
          Request<
              RequestParams<T["pathParams"]>,
              {},
              T["body"],
              T["queryParams"]
          >,
          "cookies"
      > & { cookies: RequestCookie<T["cookies"]> }
    : Request
