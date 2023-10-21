from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li class='list-group-item'><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        </head>
        <body style="text-align: center;">
        <img style="max-height: 150px" src='https://res.cloudinary.com/dslz0zdlc/image/upload/v1697845632/rnhn8ipdelx9vbkbnvcz.png' />
        <h1 style="color: #10316b;">Bienvenido a la API de E-CASA!!</h1>
        <p style="color: #10316b;">API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p style="color: #10316b;">Comience a trabajar en el proyecto siguiendo el <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Inicio Rápido</a></p>
        <p style="color: #10316b;">Recuerde especificar una ruta del endpoint real como: </p>
        <ul class="list-group list-group-flush">"""+links_html+"</ul></body>"
