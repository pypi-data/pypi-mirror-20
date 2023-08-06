p4rr0t007
=========


.. code:: bash

   pip install p4rr0t007



.. code:: python


from plant import Node
from p4rr0t007.web import Application


node = Node(__file__)
app = Application(node)


@app.route('/html')
def html():
    return app.template_response('index.html')


@app.route('/text')
def text():
    return app.text_response('text')


@app.route('/json')
def json():
    return app.json_response({
        'name': 'p4rr0t007'
    }, code=200)
