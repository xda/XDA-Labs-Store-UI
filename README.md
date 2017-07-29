# labs-store-ui
XDA Labs Store interface

This repo contains a light Django install that renders HTML templates of the XDA Labs store with hard-coded data dumps to simulate how the store UI would work on the full production stack.

## Getting started

### Install requirements
> pip install -r requirements.txt

### Launch the server
> ./manage.py runserver

## Loading templates
- `http://localhost:8000/` to view and render xda.html.
- `http://localhost:8000/TEMPLATE_NAME.html` to render any other template

## Templates and static
Templates live in `store/templates/`
Static files live in `store/static/`

## Contributors
- Randy Westergren (@rwestergren)
- Jackson Hayes (@jacksonhvisuals)
- Jeff Corcoran (@corcoran)