from gemstone import MicroService, public_method, private_api_method


class ServiceJsonRpcSpecs(MicroService):
    name = "test.service"

    host = "127.0.0.1"
    port = 9999

    skip_configuration = True

    @public_method
    def subtract(self, a, b):
        if not isinstance(a, int) or not isinstance(b, int):
            raise TypeError("Arguments must be integers")
        return a - b

    @public_method
    def sum(self, *args):
        return sum(args)

    @public_method
    def update(self, a):
        return str(a)

    @public_method
    def get_data(self):
        return ["hello", 5]

    @public_method
    def notify_hello(self, a):
        return a

    def api_token_is_valid(self, api_token):
        return api_token == "test-token"


if __name__ == '__main__':
    service = ServiceJsonRpcSpecs()
    service.start()