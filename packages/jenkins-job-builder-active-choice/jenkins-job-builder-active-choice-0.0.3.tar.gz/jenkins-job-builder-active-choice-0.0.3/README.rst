Jenkins Job Builder plugin for Active Choice Parameter
======================================================

.. image:: https://travis-ci.org/bgaifullin/jenkins-job-builder-active-choice.png?branch=master
    :target: https://travis-ci.org/bgaifullin/jenkins-job-builder-active-choice
.. image:: https://img.shields.io/pypi/v/jenkins-job-builder-active-choice.svg
    :target: https://pypi.python.org/pypi/jenkins-job-builder-active-choice

Enables support for `Active Choice Plugin`_ plugin in `Jenkins Job Builder`_.

Example:

.. code-block:: yaml

    - job:
        name: 'cascade-choice-example'

        parameters:
          - string:
              name: STR_PARAM
              default: test
          - active-choice:
              project: 'cascade-choice-example'
              name: CASCADE_CHOICE
              script: |
                return ['foo:selected', 'bar']
              description: "A parameter named CASCADE_CHOICE which options foo and bar."
              visible-item-count: 1
              fallback-script: |
                return ['Something Wrong']
              reference: STR_PARAM
              choice-type: single


.. _`Active Choice Plugin`: https://wiki.jenkins-ci.org/display/JENKINS/Active+Choices+Plugin
.. _`Jenkins Job Builder`: http://docs.openstack.org/infra/jenkins-job-builder/index.html
.. _`example`: tests/fixtures/case-001.yaml
