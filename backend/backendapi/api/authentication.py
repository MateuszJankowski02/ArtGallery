from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework import exceptions

class AdminBypassTokenAuthentication(TokenAuthentication):
    """
    Custom authentication class that allows admin users to authenticate via session
    and bypass token authentication.
    """

    def authenticate(self, request):
        # Attempt Session Authentication for admin users
        session_auth = SessionAuthentication()
        try:
            session_user_auth = session_auth.authenticate(request)
            if session_user_auth is not None:
                user, _ = session_user_auth
                if user and user.is_staff:
                    return (user, None)
        except exceptions.AuthenticationFailed:
            pass  # Proceed to Token Authentication

        # Fallback to Token Authentication for non-admin users
        return super().authenticate(request)