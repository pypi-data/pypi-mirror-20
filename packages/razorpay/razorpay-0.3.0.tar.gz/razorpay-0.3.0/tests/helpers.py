import razorpay
import os
import unittest


def mock_file(filename):
    if not filename:
        return ''
    file_dir = os.path.dirname(__file__)
    file_path = "{}/mocks/{}.json".format(file_dir, filename)
    return open(file_path).read()


class ClientTestCase(unittest.TestCase):
    def setUp(self):
        self.base_url = 'https://api.razorpay.com/v1'
        self.payment_id = 'fake_payment_id'
        self.refund_id = 'fake_refund_id'
        self.client = razorpay.Client(auth=('fake_key_id', 'fake_key_secret'))
