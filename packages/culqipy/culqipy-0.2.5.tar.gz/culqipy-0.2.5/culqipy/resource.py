import culqipy
import requests
import json


class Util:
    @staticmethod
    def json_result(key, url, data, method):
        timeout = 60
        if method.upper() == "GET":
            timeout = 360

        headers = {
            "Authorization": "Bearer " + key,
            "content-type": "application/json"
        }
        r = ""
        try:
            if method.upper() == "GET":
                if not data:
                    r = requests.get(
                        culqipy.API_URL + url,
                        headers=headers,
                        timeout=timeout
                    )
                else:
                    r = requests.get(
                        culqipy.API_URL + url,
                        headers=headers,
                        params=json.dumps(data),
                        timeout=timeout
                    )
            if method.upper() == "POST":
                r = requests.post(
                        culqipy.API_URL + url,
                        headers=headers,
                        data=json.dumps(data),
                        timeout=timeout
                    )
            if method.upper() == "DELETE":
                r = requests.delete(
                        culqipy.API_URL + url,
                        headers=headers,
                        timeout=timeout
                    )
            if method.upper() == "PATCH":
                r = requests.patch(
                        culqipy.API_URL + url,
                        headers=headers,
                        data=json.dumps(data),
                        timeout=timeout
                    )
            return r
        except requests.exceptions.RequestException:
            error = {"object": "error", "type": "server",
                     "code": "404",
                     "message": "connection...",
                     "user_message": "Connection Error!"}
            return json.dumps(error)


class CulqiError(Exception):
    def __init__(self, response_error):
        self.response_error = response_error


class Operation():
    @staticmethod
    def list(url, api_key, params):
        try:
            response = Util().json_result(
                    api_key,
                    url,
                    params, "GET")
            return response.json()
        except CulqiError as ce:
            return ce.response_error

    @staticmethod
    def create(url, api_key, body):
        try:
            response = Util().json_result(
                api_key,
                url,
                body, "POST")
            if response.json()["object"] == "error":
                raise CulqiError(response.json())
            return response.json()
        except CulqiError as ce:
            return ce.response_error

    @staticmethod
    def get_delete(url, api_key, id, method):
        try:
            response = Util().json_result(
                    api_key,
                    url + id + "/",
                    "", method)
            if response.json()["object"] == "error":
                raise CulqiError(response.json())
            return response.json()
        except CulqiError as ce:
            return ce.response_error

    @staticmethod
    def update(url, api_key, id, body):
        try:
            response = Util().json_result(
                api_key,
                url + id + "/",
                body, "PATCH")
            if response.json()["object"] == "error":
                raise CulqiError(response.json())
            return response.json()
        except CulqiError as ce:
            return ce.response_error


class Card:
    URL = "/cards/"

    @staticmethod
    def create(body):
        return Operation.create(Card.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def delete(id):
        return Operation.get_delete(Card.URL,
                                    culqipy.secret_key, id, "DELETE")

    @staticmethod
    def get(id):
        return Operation.get_delete(Card.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def update(id, body):
        return Operation.update(Card.URL,
                                    culqipy.secret_key, id, body)


Card = Card()


class Event:
    URL = "/events/"

    @staticmethod
    def list(params):
        return Operation.list(Event.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def get(id):
        return Operation.get_delete(Event.URL,
                                    culqipy.secret_key, id, "GET")


Event = Event()


class Customer:
    URL = "/customers/"

    @staticmethod
    def list(params):
        return Operation.list(Customer.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Customer.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def delete(id):
        return Operation.get_delete(Customer.URL,
                                    culqipy.secret_key, id, "DELETE")

    @staticmethod
    def get(id):
        return Operation.get_delete(Customer.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def update(id, body):
        return Operation.update(Customer.URL,
                                culqipy.secret_key, id, body)


Customer = Customer()


class Transfer:
    URL = "/transfers/"

    @staticmethod
    def list(params):
        return Operation.list(Transfer.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def get(id):
        return Operation.get_delete(Transfer.URL,
                                    culqipy.secret_key, id, "GET")


Transfer = Transfer()


class Iins:
    URL = "/iins/"

    @staticmethod
    def list(params):
        return Operation.list(Iins.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def get(id):
        return Operation.get_delete(Iins.URL,
                                    culqipy.secret_key, id, "GET")


Iins = Iins()


class Token:
    URL = "/tokens/"

    @staticmethod
    def list(params):
        return Operation.list(Token.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Token.URL,
                                culqipy.public_key, body)

    @staticmethod
    def get(id):
        return Operation.get_delete(Token.URL,
                                    culqipy.secret_key, id, "GET")


Token = Token()


class Charge:
    URL = "/charges/"

    @staticmethod
    def list(params):
        return Operation.list(Charge.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Charge.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def get(id):
        return Operation.get_delete(Charge.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def capture(id):
        try:
            response = Util().json_result(
                culqipy.secret_key,
                Charge.URL + id + "/capture/",
                "", "POST")
            if response.json()["object"] == "error":
                raise CulqiError(response.json())
            return response.json()
        except CulqiError as ce:
            return ce.response_error

    @staticmethod
    def update(id, body):
        return Operation.update(Charge.URL,
                                culqipy.secret_key, id, body)


Charge = Charge()


class Plan:
    URL = "/plans/"

    @staticmethod
    def list(params):
        return Operation.list(Plan.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Plan.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def delete(id):
        return Operation.get_delete(Plan.URL,
                                    culqipy.secret_key, id, "DELETE")

    @staticmethod
    def get(id):
        return Operation.get_delete(Plan.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def update(id, body):
        return Operation.update(Plan.URL,
                                culqipy.secret_key, id, body)


Plan = Plan()


class Subscription:
    URL = "/subscriptions/"

    @staticmethod
    def list(params):
        return Operation.list(Subscription.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Subscription.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def delete(id):
        return Operation.get_delete(Subscription.URL,
                                    culqipy.secret_key, id, "DELETE")

    @staticmethod
    def get(id):
        return Operation.get_delete(Subscription.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def update(id, body):
        return Operation.update(Subscription.URL,
                                culqipy.secret_key, id, body)


Subscription = Subscription()


class Refund:
    URL = "/refunds/"

    @staticmethod
    def list(params):
        return Operation.list(Refund.URL,
                              culqipy.secret_key, params)

    @staticmethod
    def create(body):
        return Operation.create(Refund.URL,
                                culqipy.secret_key, body)

    @staticmethod
    def get(id):
        return Operation.get_delete(Refund.URL,
                                    culqipy.secret_key, id, "GET")

    @staticmethod
    def update(id, body):
        return Operation.update(Refund.URL,
                                culqipy.secret_key, id, body)


Refund = Refund()
