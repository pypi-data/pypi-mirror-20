"""
Models for notifications app.
"""

import json
import six

from django.db import models
from django.utils.module_loading import import_string


@six.python_2_unicode_compatible
class SentNotification(models.Model):
    """
    Stores info on the notification that was sent.
    """

    STATUS_PENDING = 0
    STATUS_SUCCESS = 1
    STATUS_FAILED = 2

    STATUSES = (
        (0, 'Pending'),
        (1, 'Success'),
        (2, 'Failed'),
    )

    text_content = models.TextField(null=True, blank=True)
    html_content = models.TextField(null=True, blank=True)
    sent_from = models.CharField(max_length=100, null=True, blank=True)
    recipients = models.CharField(max_length=2000)  # Comma separated list of emails or numbers
    subject = models.CharField(max_length=255, null=True, blank=True)
    extra_data = models.TextField(null=True, blank=True)  # json dictionary
    date_sent = models.DateTimeField()
    status = models.PositiveSmallIntegerField(choices=STATUSES, default=STATUS_PENDING)
    notification_class = models.CharField(max_length=255)
    error_message = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.notification_class

    def get_recipients(self):
        """
        Return the list of recipients for the notification. Recipient is defined by the notification class.
        """

        return self.recipients.split(',')

    def resend(self):
        """
        Re-sends the notification by calling the notification class' resend method
        """

        notification_class = import_string(self.notification_class)
        notification_class.resend(self)

    def get_extra_data(self):
        """
        Return extra data that was saved
        """

        if not self.extra_data:
            return {}
        else:
            return json.loads(self.extra_data)

