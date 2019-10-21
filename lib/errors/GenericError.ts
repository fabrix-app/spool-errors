export class GenericError extends Error {
  public code: string
  public statusCode: number | string
  public details: any[]
  public annotate

  constructor(
    code = 'E_UNSPECIFIED',
    message = 'internal error',
    name?,
    details?: any[],
    statusCode?: number | string,
    annotate?
  ) {
    super(message)
    this.code = code
    this.name = name || 'Generic Error'
    this.details = details
    this.statusCode = statusCode
    this.annotate = annotate

    if (!this.statusCode) {
      switch (true) {
        // Handles Joi style errors
        case /'ValidationError/.test(name): {
          this.statusCode = 400
          this.code = this.code === 'E_UNSPECIFIED'
            ? 'E_VALIDATION_ERROR'
            : this.code
          break
        }

        case /NETWORK_AUTHENTICATION_REQUIRED/.test(code): {
          this.statusCode = 511
          // this.message = this.message || 'not found'
          break
        }
        case /NOT_EXTENDED/.test(code): {
          this.statusCode = 510
          // this.message = this.message || 'not found'
          break
        }
        case /LOOP_DETECTED/.test(code): {
          this.statusCode = 508
          // this.message = this.message || 'not found'
          break
        }
        case /INSUFFICENT_STORAGE/.test(code): {
          this.statusCode = 507
          // this.message = this.message || 'not found'
          break
        }
        case /VARIANT_ALSO_NEGOTIATES/.test(code): {
          this.statusCode = 506
          // this.message = this.message || 'not found'
          break
        }
        case /HTTP_VERSION_NOT_SUPPORTED/.test(code): {
          this.statusCode = 505
          // this.message = this.message || 'not found'
          break
        }
        case /GATEWAY_TIMEOUT/.test(code): {
          this.statusCode = 504
          // this.message = this.message || 'not found'
          break
        }
        case /SERVICE_UNAVAILABLE/.test(code): {
          this.statusCode = 503
          // this.message = this.message || 'not found'
          break
        }
        case /BAD_GATEWAY/.test(code): {
          this.statusCode = 502
          // this.message = this.message || 'not found'
          break
        }
        case /NOT_IMPLEMENTED/.test(code): {
          this.statusCode = 501
          // this.message = this.message || 'not found'
          break
        }
        case /UNAVAILABLE_FOR_LEGAL_REASONS/.test(code): {
          this.statusCode = 451
          // this.message = this.message || 'not found'
          break
        }
        case /REQUEST_HEADER_FIELDS_TOO_LARGE/.test(code): {
          this.statusCode = 431
          // this.message = this.message || 'not found'
          break
        }
        case /TOO_MANY_REQUESTS/.test(code): {
          this.statusCode = 429
          // this.message = this.message || 'not found'
          break
        }
        case /PRECONDITION_REQUIRED/.test(code): {
          this.statusCode = 428
          // this.message = this.message || 'not found'
          break
        }
        case /UNASSIGNED/.test(code): {
          this.statusCode = 427
          // this.message = this.message || 'not found'
          break
        }
        case /UPGRADE_REQUIRED/.test(code): {
          this.statusCode = 426
          // this.message = this.message || 'not found'
          break
        }
        case /TOO_EARLY/.test(code): {
          this.statusCode = 425
          // this.message = this.message || 'not found'
          break
        }
        case /FAILED_DEPENDENCY/.test(code): {
          this.statusCode = 424
          // this.message = this.message || 'not found'
          break
        }
        case /LOCKED/.test(code): {
          this.statusCode = 423
          // this.message = this.message || 'not found'
          break
        }
        case /UNPROCESSABLE_ENTITY/.test(code): {
          this.statusCode = 422
          // this.message = this.message || 'not found'
          break
        }
        case /MISDIRECTED_REQUEST/.test(code): {
          this.statusCode = 421
          // this.message = this.message || 'not found'
          break
        }
        case /EXCEPTION_FAILED/.test(code): {
          this.statusCode = 417
          // this.message = this.message || 'not found'
          break
        }
        case /RANGE_NOT_SATISFIED/.test(code): {
          this.statusCode = 416
          // this.message = this.message || 'not found'
          break
        }
        case /UNSUPPORTED_MEDIA_TYPE/.test(code): {
          this.statusCode = 415
          // this.message = this.message || 'not found'
          break
        }
        case /URI_TO_LONG/.test(code): {
          this.statusCode = 414
          // this.message = this.message || 'not found'
          break
        }
        case /PAYLOAD_TO0_LARGE/.test(code): {
          this.statusCode = 413
          // this.message = this.message || 'not found'
          break
        }
        case /PRECONDITION_FAILED/.test(code): {
          this.statusCode = 412
          // this.message = this.message || 'not found'
          break
        }
        case /LENGTH_REQUIRED/.test(code): {
          this.statusCode = 411
          // this.message = this.message || 'not found'
          break
        }
        case /GONE/.test(code): {
          this.statusCode = 410
          // this.message = this.message || 'not found'
          break
        }
        case /CONFLICT/.test(code): {
          this.statusCode = 409
          // this.message = this.message || 'not found'
          break
        }
        case /REQUEST_TIMEOUT/.test(code): {
          this.statusCode = 408
          // this.message = this.message || 'not found'
          break
        }
        case /PROXY_AUTHENTICATION_REQUIRED/.test(code): {
          this.statusCode = 407
          // this.message = this.message || 'not found'
          break
        }
        case /NOT_ACCEPTABLE/.test(code): {
          this.statusCode = 406
          // this.message = this.message || 'not found'
          break
        }
        case /NOT_ALLOWED/.test(code): {
          this.statusCode = 405
          // this.message = this.message || 'not found'
          break
        }
        case /NOT_FOUND/.test(code): {
          this.statusCode = 404
          // this.message = this.message || 'not found'
          break
        }
        case /FORBIDDEN/.test(code): {
          this.statusCode = 403
          // this.message = this.message || 'not allowed'
          break
        }
        case /PAYMENT_REQUIRED/.test(code): {
          this.statusCode = 402
          // this.message = this.message || 'not allowed'
          break
        }
        case /UNAUTHORIZED/.test(code): {
          this.statusCode = 401
          // this.message = this.message || 'not allowed'
          break
        }
        case /BAD_REQUEST/.test(code): {
          this.statusCode = 400
          // this.message = this.message || 'bad request'
          break
        }
        default: {
          this.statusCode = 500
          // this.message = this.message || 'internal error'
        }
      }
    }

    Object.defineProperty(GenericError.prototype, 'message', {
      configurable: true,
      enumerable: true
    })

    // Object.defineProperty(ModelError.prototype, 'details', {
    //   configurable: true,
    //   enumerable: true
    // })
  }

  /**
   * Humanize a list of error details
   *
   * @param details a "joi-style details" list
   * @param details.message
   * @param details.path
   * @param details.type
   * @param details.context
   * @return String
   */
  static humanizeMessage (details?: any[]) {
    const paths = (details || [ ])
      .map(d => d.path.join('.'))

    return paths.join(', ')
  }
}
