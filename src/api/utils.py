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

    links_html = "".join(["<li class='list-group-item my-1 bg-dark'><a class='link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        </head>
        <body class="bg-black container py-3" style="text-align: center;">
            <img class="rounded border border-5 border-dark" style="max-height: 150px" src='https://res.cloudinary.com/dslz0zdlc/image/upload/v1697845632/rnhn8ipdelx9vbkbnvcz.png' alt="Logo e-casa"/>
            <h1 class="text-white">Bienvenido a la API de E-CASA</h1>
            <label class="form-label text-white">API HOST: <br/> <script>document.write('<input disabled class="text-info rounded bg-dark border-bottom border-info border-top-0 border-end-0 border-start-0" style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></label>
            <p  class="text-white">Comience a trabajar en el proyecto siguiendo el <a class="link-info" href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Inicio Rápido</a></p>
            <p  class="text-white">Recuerde especificar una ruta del endpoint real como: </p>
            <ul class="list-group list-group-flush w-50 mx-auto bg-dark rounded mb-3 px-3">"""+links_html+"</ul></body>"
