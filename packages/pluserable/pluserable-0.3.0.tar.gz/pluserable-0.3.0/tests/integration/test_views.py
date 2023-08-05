"""Tests for the views."""

from mock import Mock, patch
from pyramid.httpexceptions import HTTPNotFound
from pyramid import testing
from pyramid_mailer.interfaces import IMailer
from pyramid_mailer.mailer import DummyMailer
from pluserable.events import (
    NewRegistrationEvent, PasswordResetEvent, ProfileUpdatedEvent)
from pluserable.interfaces import (
    ILoginForm, ILoginSchema, IRegisterSchema, IRegisterForm)
from pluserable.strings import UIStringsBase
from pluserable.views import (
    AuthView, ForgotPasswordView, ProfileView, RegisterView)
from tests.models import User
from . import IntegrationTestBase


class TestAuthView(IntegrationTestBase):

    def test_auth_view_extensions(self):
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')

        request = self.get_request()

        getUtility = Mock()
        getUtility.return_value = True

        schema = Mock()
        form = Mock()
        self.config.registry.registerUtility(schema, ILoginSchema)
        self.config.registry.registerUtility(form, ILoginForm)
        AuthView(request)

        assert schema.called
        assert form.called

    def test_login_loads(self):
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = None
        view = AuthView(request)
        response = view.login()

        assert response.get('form', None)

    def test_login_redirects_if_logged_in(self):
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = Mock()
        view = AuthView(request)

        response = view.login()
        assert response.status_int == 302

    def test_login_fails_empty(self):
        """Make sure we can't log in with empty credentials."""
        self.config.add_route('index', '/')
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'

        request = testing.DummyRequest(post={
            'submit': True,
        }, request_method='POST')

        view = AuthView(request)
        response = view.login()
        errors = response['errors']

        assert errors[0].node.name == 'handle'
        assert errors[0].msg == 'Required'
        assert errors[1].node.name == 'password'
        assert errors[1].msg == 'Required'

    def test_login_fails_bad_credentials(self):
        """Make sure we can't log in with bad credentials."""
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')

        request = self.get_request(post={
            'submit': True,
            'handle': 'admin',
            'password': 'test123',
        }, request_method='POST')

        view = AuthView(request)
        with patch('pluserable.views.add_flash') as add_flash:
            view.login()
            add_flash.assert_called_with(
                request, plain="Wrong username or password.", kind="error")

    def test_login_succeeds(self):
        """Make sure we can log in."""
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')
        user = self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(post={
                'submit': True,
                'handle': user.username,
                'password': 'science',
            }, request_method='POST')
        view = AuthView(request)
        response = view.login()

        assert response.status_int == 302

    def test_inactive_login_fails(self):
        """Make sure we can't log in with an inactive user."""
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')
        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request(post={
            'submit': True,
            'handle': user.username,
            'password': 'science',
            }, request_method='POST')

        view = AuthView(request)
        with patch('pluserable.views.add_flash') as add_flash:
            view.login()
            add_flash.assert_called_with(
                request,
                plain='Your account is not active; please check your e-mail.',
                kind='error')

    def test_logout(self):
        """User logs out successfully."""
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.add_route('index', '/')
        request = self.get_request()

        invalidate = Mock()
        request.user = Mock()
        request.session = Mock()
        request.session.invalidate = invalidate

        view = AuthView(request)
        with patch('pluserable.views.forget') as forget:
            with patch('pluserable.views.HTTPFound') as HTTPFound:
                with patch('pluserable.views.add_flash') as add_flash:
                    view.logout()
                    add_flash.assert_called_with(
                        request, plain=UIStringsBase.logout_done,
                        kind="success")

                forget.assert_called_with(request)
                assert invalidate.called
                assert HTTPFound.called


class TestRegisterView(IntegrationTestBase):

    def test_register_loads_not_logged_in(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = None
        view = RegisterView(request)
        response = view.register()

        assert response.get('form', None)

    def test_register_redirects_if_logged_in(self):
        self.config.registry.settings['pluserable.login_redirect'] = 'index'
        self.config.registry.settings['pluserable.logout_redirect'] = 'index'
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = Mock()
        view = RegisterView(request)
        response = view.register()

        assert response.status_int == 302

    def test_register_creates_inactive_user(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        request = self.get_request(post={
            'username': 'admin',
            'password': {
                'password': 'test123',
                'password-confirm': 'test123',
            },
            'email': 'carlsagan@nasa.gov'
        }, request_method='POST')
        request.user = Mock()
        view = RegisterView(request)
        response = view.register()

        assert response.status_int == 302
        user = request.replusitory.q_user_by_username('admin')
        assert isinstance(user, User)
        assert not user.is_activated

    def test_register_validation(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        request = self.get_request(request_method='POST')
        request.user = Mock()
        view = RegisterView(request)
        response = view.register()

        assert len(response['errors']) == 3
        assert 'There was a problem with your submission' in response['form']

    def test_register_existing_user(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')
        user = self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(post={
            'username': user.username,
            'password': {
                'password': 'science',
                'password-confirm': 'science',
            },
            'email': 'carlsagan@nasa.gov'
        }, request_method='POST')

        view = RegisterView(request)
        adict = view.register()
        assert isinstance(adict, dict)
        assert adict['errors']

    @patch('pluserable.views.require_activation_setting_value')
    def test_register_no_activation_suceeds(self, get_setting_mock):
        """Test register() with setting to not require activation."""
        get_setting_mock.return_value = False
        self.config.add_route('index', '/')

        def handle_registration(event):
            event.request.replusitory.flush()
        self.config.add_subscriber(handle_registration, NewRegistrationEvent)

        request = self.get_request(post={
            'username': 'admin',
            'password': {
                'password': 'test123',
                'password-confirm': 'test123',
            },
            'email': 'carlsagan@nasa.gov'
        }, request_method='POST')

        request.user = Mock()

        view = RegisterView(request)
        with patch('pluserable.views.add_flash') as add_flash:
            response = view.register()
            add_flash.assert_called_with(
                request, plain=UIStringsBase.registration_done, kind="success")
        assert response.status_int == 302
        user = request.replusitory.q_user_by_username('admin')
        assert user.is_activated is True

    def test_registration_craps_out(self):
        self.config.add_route('index', '/')

        def send(message):
            raise Exception("I broke!")

        mailer = Mock()
        mailer.send = send
        self.config.registry.registerUtility(mailer, IMailer)

        request = self.get_request(post={
            'username': 'admin',
            'password': {
                'password': 'test123',
                'password-confirm': 'test123',
            },
            'email': 'carlsagan@nasa.gov'
        }, request_method='POST')
        view = RegisterView(request)

        self.assertRaises(Exception, view.register)

    def test_activate(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request()
        request.matchdict = Mock()

        def get(key, default):
            if key == 'code':
                return user.activation.code
            else:
                return user.id

        request.matchdict.get = get

        view = RegisterView(request)
        response = view.activate()
        the_user = request.replusitory.q_user_by_username(user.username)

        assert the_user is user
        assert the_user.activation is None
        assert the_user.is_activated
        assert response.status_int == 302

    def test_activation_works(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        user1, user2 = self.create_users(count=2, activation=True)
        self.sas.flush()

        def get(key, default):
            if key == 'code':
                return user1.activation.code
            else:
                return user1.id

        request = self.get_request()
        request.matchdict = Mock()
        request.matchdict.get = get
        view = RegisterView(request)
        response = view.activate()

        activations = list(request.replusitory.q_activations())

        assert len(activations) == 1
        assert user1.is_activated
        assert response.status_int == 302

    def test_activate_invalid_code_raises(self):
        self.config.add_route('index', '/')

        self.config.registry.registerUtility(DummyMailer(), IMailer)

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request()
        request.matchdict = Mock()
        get = Mock()
        get.return_value = 'invalid'
        request.matchdict.get = get

        view = RegisterView(request)
        with self.assertRaises(HTTPNotFound):
            view.activate()

        the_user = request.replusitory.q_user_by_username(user.username)
        assert the_user is user
        assert not the_user.is_activated

    def test_activate_invalid_user_raises_not_found(self):
        """One user tries to get activated with another's code."""
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        user1, user2 = self.create_users(count=2, activation=True)
        self.sas.flush()

        request = self.get_request()
        request.matchdict = Mock()

        def get(val, ret):
            if val == 'code':
                return user2.activation.code
            elif val == 'user_id':
                return user1.id

        request.matchdict.get = get

        view = RegisterView(request)
        with self.assertRaises(HTTPNotFound):
            view.activate()

        for user in request.replusitory.q_users():
            assert not user.is_activated


class TestForgotPasswordView(IntegrationTestBase):

    def test_forgot_password_loads(self):
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = None
        view = ForgotPasswordView(request)
        response = view.forgot_password()

        assert response.get('form', None)

    def test_forgot_password_logged_in_redirects(self):
        self.config.add_route('index', '/')

        request = self.get_request()
        request.user = Mock()
        view = ForgotPasswordView(request)
        response = view.forgot_password()

        assert response.status_int == 302

    def test_forgot_password_valid_user_succeeds(self):
        self.config.add_route('index', '/')
        self.config.registry.registerUtility(DummyMailer(), IMailer)

        self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(post={
            'email': 'carlsagan1@nasa.gov'
        }, request_method='POST')

        request.user = None

        view = ForgotPasswordView(request)

        with patch('pluserable.views.add_flash') as add_flash:
            response = view.forgot_password()
            add_flash.assert_called_with(
                request, plain=UIStringsBase.reset_password_email_sent,
                kind="success")
        assert response.status_int == 302

    def test_forgot_password_invalid_password(self):
        self.config.add_route('index', '/')
        self.config.registry.registerUtility(DummyMailer(), IMailer)

        self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(post={
            'email': 'sagan'
        }, request_method='POST')

        request.user = None

        view = ForgotPasswordView(request)
        response = view.forgot_password()

        assert len(response['errors']) == 1

    def test_reset_password_loads(self):
        self.config.add_route('index', '/')
        self.config.registry.registerUtility(DummyMailer(), IMailer)

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request()

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.activation.code
        request.matchdict.get = get

        request.user = None

        view = ForgotPasswordView(request)
        response = view.reset_password()

        assert response.get('form', None)
        assert 'sagan' in response['form']

    def test_reset_password_valid_user(self):
        self.config.add_route('index', '/')
        self.config.registry.registerUtility(DummyMailer(), IMailer)

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request(post={
            'password': {
                'password': 'test123',
                'password-confirm': 'test123',
            },
        }, request_method='POST')

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.activation.code
        request.matchdict.get = get

        request.user = None

        def handle_password_reset(event):
            event.request.replusitory.flush()
        self.config.add_subscriber(handle_password_reset, PasswordResetEvent)

        view = ForgotPasswordView(request)
        response = view.reset_password()

        assert user.check_password('test123')
        assert response.status_int == 302

    def test_reset_password_invalid_password(self):
        self.config.add_route('index', '/')
        self.config.registry.registerUtility(DummyMailer(), IMailer)

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request(post={
            'Password': {
                'Password': 't',
                'Password-confirm': 't',
            },
        }, request_method='POST')

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.activation.code
        request.matchdict.get = get

        request.user = None

        view = ForgotPasswordView(request)
        response = view.reset_password()

        assert len(response['errors']) == 1

    def test_reset_password_empty_password(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        user = self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request(request_method='POST')
        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.activation.code
        request.matchdict.get = get
        request.user = None

        view = ForgotPasswordView(request)
        response = view.reset_password()

        assert len(response['errors']) == 1

    def test_invalid_reset_gets_404(self):
        self.config.registry.registerUtility(DummyMailer(), IMailer)
        self.config.add_route('index', '/')

        self.create_users(count=1, activation=True)
        self.sas.flush()

        request = self.get_request()
        request.matchdict = Mock()
        get = Mock()
        get.return_value = 'wrong value'
        request.matchdict.get = get

        request.user = None  # nobody is logged in
        view = ForgotPasswordView(request)
        ret = view.reset_password()

        assert ret.status_int == 404


class TestProfileView(IntegrationTestBase):

    def test_profile_loads(self):
        self.config.add_route('index', '/')

        user = self.create_users(count=1)
        self.sas.flush()

        request = self.get_request()
        request.user = Mock()

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.id
        request.matchdict.get = get

        view = ProfileView(request)

        response = view.profile()

        assert response.get('user', None) == user

    def test_profile_bad_id(self):
        self.config.add_route('index', '/')

        self.create_users(count=1)
        self.sas.flush()

        request = self.get_request()
        request.user = Mock()
        request.matchdict = Mock()

        get = Mock()
        get.return_value = 99  # This user ID does not exist
        request.matchdict.get = get

        view = ProfileView(request)
        response = view.profile()

        assert response.status_int == 404

    def test_profile_update_profile_invalid(self):
        from pluserable.interfaces import IProfileSchema
        from tests.schemas import ProfileSchema
        self.config.registry.registerUtility(ProfileSchema, IProfileSchema)
        self.config.add_route('index', '/')

        user = self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(request_method='POST')
        request.user = user

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.id
        request.matchdict.get = get

        # The code being tested
        response = ProfileView(request).edit_profile()

        assert len(response['errors']) == 3

    def test_profile_update_email(self):
        self.config.add_route('index', '/')

        user = self.create_users(count=1)
        self.sas.flush()

        def handle_profile_updated(event):
            event.request.replusitory.flush()
        self.config.add_subscriber(handle_profile_updated, ProfileUpdatedEvent)

        request = self.get_request(post={
            'email': 'new_email@nasa.gov',
        }, request_method='POST')
        request.user = user
        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.id
        request.matchdict.get = get

        # The code being tested
        ProfileView(request).edit_profile()

        # Assertions
        the_user = request.replusitory.q_user_by_id(user.id)
        assert the_user is user
        assert the_user.email == 'new_email@nasa.gov'
        assert user.check_password('science')

    def test_profile_update_password(self):  # Happy
        self.config.add_route('index', '/')
        user = self.create_users(count=1)
        self.sas.flush()

        request = self.get_request(post={
            'email': user.email,
            'password': {
                'password': 'new password',
                'password-confirm': 'new password',
            },
        }, request_method='POST')
        request.user = user

        request.matchdict = Mock()
        get = Mock()
        get.return_value = user.id
        request.matchdict.get = get

        handle_profile_updated = Mock()
        self.config.add_subscriber(handle_profile_updated, ProfileUpdatedEvent)

        # The code being tested
        ProfileView(request).edit_profile()

        # Assertions
        assert user in request.replusitory.sas.dirty
        assert user.email == 'carlsagan1@nasa.gov'
        assert user.check_password('new password')
        assert handle_profile_updated.called
