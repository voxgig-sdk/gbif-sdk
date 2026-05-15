
import { Context } from './Context'


class GbifError extends Error {

  isGbifError = true

  sdk = 'Gbif'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GbifError
}

