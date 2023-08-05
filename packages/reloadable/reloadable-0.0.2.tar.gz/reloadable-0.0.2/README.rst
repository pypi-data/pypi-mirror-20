Reloadable
==========

Considere que ``foo`` é uma função que pode falhar e levantar uma
exceção que interrompe seu fluxo normal. ``reloadable`` captura essa
exceção, chama um *callback* se fornecido e chama novamente ``foo`` até
que o mesmo retorne sem erro.

Exemplo de código
-----------------

.. code:: python

    from random import randint
    from datetime import datetime
    from reloadable import reloadable


    def log_exception(e):
        print("{e} deu merda em {now}".format(e=e.__class__,
                                              now=datetime.now()))


    @reloadable(exception_callback=log_exception, sleep_time=3)
    def foo():
        bingo = randint(0, 10)
        for i in range(5):
            if i == bingo:
                raise Exception
            print(i)

    >>> foo()
    0
    1
    2
    <class 'Exception'> deu merda em 2017-02-20 15:25:24.458140
    0
    <class 'Exception'> deu merda em 2017-02-20 15:25:24.458194
    <class 'Exception'> deu merda em 2017-02-20 15:25:24.458211
    0
    1
    2
    3
    4

    Process finished with exit code 0

Testes
------

``python -m unittest -v tests``

Instalação
----------

``pip install reloadable``

Interface
---------

``def reloadable(exception_callback=lambda e: None, sleep_time: float=0):``

-  ``exception_callback``: Um ``Callable[[Exception], Any]`` que é
   chamado sempre que uma ``exception`` não tratada é capturada pelo
   decorator.
-  ``sleep_time``: Tempo de espera em segundos, antes de chamar
   novamente
   a função decorada.