class HTTP_STATUS_CODE(object):
    OK = 200
    REDIRECT = 300
    ORDER_URL = "/orders"
    INVOICE_URL = "/invoices"
    PAYMENTS_URL = "/payments"
    REFUNDS_URL = "/refunds"
    CARD_URL = "/cards"
    CUSTOMER_URL = "/customers"


class ERROR_CODE(object):
    BAD_REQUEST_ERROR = "BAD_REQUEST_ERROR"
    GATEWAY_ERROR = "GATEWAY_ERROR"
    SERVER_ERROR = "SERVER_ERROR"
