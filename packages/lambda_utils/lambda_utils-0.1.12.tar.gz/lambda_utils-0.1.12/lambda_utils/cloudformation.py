import json
import urllib2

from lambda_utils import Event


class Cloudformation(Event):
    event = None
    status = None
    response = None
    reason = None

    def wrapped_function(self, event, context):
        self.event = dict(event)
        if self.if_sns_event:
            self.event = json.loads(event['Records'][0]['Sns']['Message'])
        self.status = 'FAILED'
        self.response = None
        self.reason = context.aws_request_id

        try:
            self.response = self.function(self.event, context)
            self.status = 'SUCCESS'
            return self.response
        except Exception as ex:
            self.reason = ex.message
            raise
        finally:
            send_signal(self.event, self.status, self.reason, self.response)

    @property
    def if_sns_event(self):
        return 'Records' in self.event


def send_signal(event, response_status, reason, response_data=None):
    response_body = json.dumps(
        {
            'Status': response_status,
            'Reason': reason,
            'PhysicalResourceId': event['LogicalResourceId'],
            'StackId': event['StackId'],
            'RequestId': event['RequestId'],
            'LogicalResourceId': event['LogicalResourceId'],
            'Data': response_data or {}
        }
    )

    opener = urllib2.build_opener(urllib2.HTTPHandler)
    request = urllib2.Request(event['ResponseURL'], data=response_body)
    request.add_header('Content-Type', '')
    request.add_header('Content-Length', len(response_body))
    request.get_method = lambda: 'PUT'
    opener.open(request)
