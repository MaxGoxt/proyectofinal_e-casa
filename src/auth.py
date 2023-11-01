import os
from functools import wraps
from flask import Flask, make_response, request, current_app
import json

# esta funcion protege la DB
# y se inporta en app.py en la linea 69
def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        print(request.authorization)
        print(request)
        if auth and auth.password == os.getenv('FLASK_ADMIN_PASS') and auth.username == os.getenv('FLASK_ADMIN_USER'):
            return f(*args, **kwargs)
        return make_response("<h1 style='color:red; text-align: center; font-family: sans-serif; margin: 20% 0'>🚫Acceso Denegado🚫</h1>", 401, {'WWW-Authenticate':'Basic realm="Login requerido!"'})
    return decorated