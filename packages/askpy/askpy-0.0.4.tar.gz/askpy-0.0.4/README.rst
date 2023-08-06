ASKpy - Collect Input from your Users
=====================================

ASKpy is a module which makes collecting Raw Input for your Python
program more robust. It supports creating prompts, conditional
questions, validation, and transforming responses.

Installation
------------

Installing ASKpy is as simple as:

::

    pip install askpy

Usage
-----

ASKpy at its core is a way to build up questions and create a prompt for
users in your terminal applications.

::

    from askpy import Prompt

    prompt = Prompt()

    my_question = prompt.make_question('name', 'What is your name?')

    prompt.add(my_question)

    prompt.collect()

    name = prompt.get_response('name')

While the above may hide raw input, it does not give you much more power
than you could already use in the standard library. ASKpy allows you to
validate and transform your responses easily:

::

    from askpy import Prompt, Validator

    prompt = Prompt()

    question = prompt.make_question('age', 'How old are you?') \
                     .must(Validator.num_gt(20)) \
                     .transform(int)

    prompt.add(question)

    prompt.collect()

    question = prompt.get_response('question')

The above example will ensure the user enters an age greater 20
otherwise it will reprompt them. Once it has a valid age it will cast it
to an integer for you to use later.

There’s more too.

Sometimes questions depend on others and in order to handle these cases
you would usually rely on conditional statements and parsing. With ASKpy
you can do this by chaining questions.

::

    from askpy import Prompt, ValidationError, Validator

    prompt = Prompt()


    def validate_even(num):
        Validator.num(num)
        if int(num) % 2 != 0:
            raise ValidationError('Please choose an even number')


    def validate_odd(num):
        Validator.num(num)
        if int(num) % 2 == 0:
            raise ValidationError('Please choose an odd number')


    even_or_odd = prompt.make_question('even_or_odd', 'Do you prefer even or odd numbers?') \
                        .must(Validator.one_of(['even', 'odd']))

    even_question = prompt.make_question('even', 'What is your favorite even number?') \
                          .must(validate_even) \
                          .transform(int)

    odd_question = prompt.make_question('odd', 'What is your favorite odd number?') \
                         .must(validate_odd) \
                         .transform(int)

    prompt.add(even_or_odd) \
          .then(lambda resp: resp == 'even', even_question, odd_question)

    prompt.collect()

As you can see, you get explicit prompts with the ability to keep your
code sane.
