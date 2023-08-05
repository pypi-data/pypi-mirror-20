# -*- coding: utf-8 -*-

"""Validators for form fields."""

from __future__ import unicode_literals

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from zxcvbn import zxcvbn


class ZXCVBNValidator(object):
    """ZXCVBN validator."""

    code = 'password_too_weak'
    DEFAULT_USER_ATTRIBUTES = ('username', 'first_name', 'last_name', 'email')

    def __init__(self, min_score=3, user_attributes=DEFAULT_USER_ATTRIBUTES):
        """
        Init method.

        Args:
            min_score (int): minimum score to accept (between 0 and 4).
            user_attributes (tuple): list of user attributes to check.
        """
        self.min_score = min_score
        self.user_attributes = user_attributes

    def __call__(self, value):
        """Call method, run self.validate (can be used in form fields)."""
        return self.validate(value)

    def validate(self, password, user=None):
        """Validate method, run zxcvbn and check score."""
        user_inputs = []
        if user is not None:
            for attribute in self.user_attributes:
                if hasattr(user, attribute):
                    user_inputs.append(getattr(user, attribute))

        results = zxcvbn(password, user_inputs=user_inputs)
        if results.get('score', 0) < self.min_score:
            feedback = ', '.join(
                results.get('feedback', {}).get('suggestions', []))
            raise ValidationError(_(feedback), code=self.code, params={})

    def get_help_text(self):
        """Help text to print when ValidationError."""
        return _("Your password must be stronger.")
