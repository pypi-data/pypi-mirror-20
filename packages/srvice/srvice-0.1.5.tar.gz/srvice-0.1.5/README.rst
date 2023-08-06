Srvice is a library that aims to integrate a Python server with a Javascript
client via remote calls. With Srvice, the client can transparently call
functions defined in server. The server might also respond with instructions
that execute arbitrary Javascript code in the client.

Let us define a function in the client:

.. code-block:: python

    from import srvice

    @srvice.api
    def get_user_email(request, username):
        if can_read_email(request.user, username):
            return email_from_username(username)
        else:
            raise PermissionError

    # This function must be associated with some url in your application
    urlpatterns [
        ...,
        '^get-user-email/$', get_user_email.as_view(),
    ]


In the client, we call the function defined in the some URL point using the
srvice object:

.. code-block:: javascript

    srvice.call('get-user-email', 'paulmcartney').then(function (email) {
        var contact = currentContact();
        contact.email = email;
    })


Communication is done using JSON strings that pass function arguments and
results from client to server and vice-versa.

This is only the very basic that Srvice can do. Please check the documentation
for more information.
