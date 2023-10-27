import { NextFetchEvent, NextRequest } from "next/server"
import { MiddlewareFactory } from "@/middleware/util"

const dumpHeaders = (headers: Headers) => {
  Object.entries(headers).forEach(([key, value]) => {
    console.log(`    ${key}: ${value}`)
  })
}

export const withTrace = (message: string): MiddlewareFactory => {
  return (next) => {
    return async (req: NextRequest, event: NextFetchEvent) => {
      const prefix = `[TRACE req: ${message}] ${req.method} ${req.nextUrl.pathname}`
      console.log(`${prefix}`)
      dumpHeaders(req.headers)
      const res = await next(req, event)
      if (res) {
        console.log(`[TRACE req: ${message}] ${req.method} ${req.nextUrl.pathname} ${res.status} ${res.statusText}`)
        dumpHeaders(res.headers)
      }
      return res
    }
  }
}