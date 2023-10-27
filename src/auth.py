from functools import wraps
from flask import Flask, make_response, request, current_app
import json

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        print(request.authorization)
        print(request)
        if auth and auth.password == current_app.config["ADMIN_PASS"]:
            return f(*args, **kwargs)
        return make_response("<h1>Acceso denegado</h1>", 401, {'WWW-Authenticate':'Basic realm="Login requerido!"'})
    return decorated