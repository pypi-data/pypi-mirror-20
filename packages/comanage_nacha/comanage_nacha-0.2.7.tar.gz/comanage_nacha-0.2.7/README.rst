==============
comanage_nacha
==============
A simple Wells Fargo flavor NACHA file builder, parser, and validation toolkit
------------------------------------------------------------------------------

.. image:: https://travis-ci.org/DisruptiveLabs/comanage_nacha.svg?branch=master
    :target: https://travis-ci.org/DisruptiveLabs/comanage_nacha
.. image:: https://coveralls.io/repos/github/DisruptiveLabs/comanage_nacha/badge.svg?branch=master
    :target: https://coveralls.io/github/DisruptiveLabs/comanage_nacha?branch=master
.. image:: https://badge.fury.io/py/comanage_nacha.svg
    :target: https://badge.fury.io/py/comanage_nacha

.. code-block:: bash

    pip install comanage_nacha

.. code-block:: python

    from comanage_nacha import NachaFile

    with NachaFile(company_name='COMANAGE LLC',
                   file_id_modifier='A',
                   file_creation_date=datetime.date.today(),
                   file_creation_time=datetime.datetime.utcnow()) as nacha:
        with nacha.add_batch(service_class_code=200,
                             company_name='COMANAGE LLC',
                             company_id='0123456789',
                             effective_entry_date=datetime.date.today()) as batch:
            batch.add_entry(transaction_code=22,
                            receiving_dfi_routing_number='09100001',
                            routing_number_check_digit=0,
                            receiving_dfi_account_number='0123456789',
                            amount=10000,
                            individual_id='123',
                            individual_name='FRANK')
    print(nacha.render_to_string())

    nacha_string = nacha.render_to_string()

:Authors:
    Franklyn Tackitt @kageurufu
