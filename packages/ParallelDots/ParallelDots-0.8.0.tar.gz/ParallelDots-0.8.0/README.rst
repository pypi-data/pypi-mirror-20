ParallelDots-Python-API
=======================

A wrapper for the `ParallelDots API <http://www.paralleldots.com>`__.

.. image:: https://badge.fury.io/py/paralleldots.png
    :target: http://badge.fury.io/py/paralleldots
.. image:: https://travis-ci.org/ParallelDots/ParallelDots-Python-API.svg?branch=master
    :target: https://travis-ci.org/ParallelDots/ParallelDots-Python-API
    
Installation
------------
From PyPI:

.. code:: bash
	
	pip install paralleldots


From source:

.. code:: bash

	https://github.com/ParallelDots/ParallelDots-Python-API.git
	python setup.py install

API Keys + Setup
----------------
Signup and get your free API key from  `ParallelDots <http://www.paralleldots.com/pricing>`__.
You will receive a mail containing the API key at the registered email id.

Configuration:

.. code:: python

	>>> from paralleldots import set_api_key, get_api_key

	# Setting your API key
	>>> set_api_key("YOUR API KEY")

	# Viewing your API key
	>>> get_api_key()



Supported APIs:
---------------

- `Semantic Similarity <http://blog.paralleldots.com/technology/semantic-publishing-media-industry/>`
- `Sentiment Analysis <http://blog.paralleldots.com/technology/extract-the-context-sentiment-analysis-and-opinion-mining/>`
- Taxonomy
- `Named Entity Extraction ( NER ) <http://blog.paralleldots.com/technology/dig-relevant-text-elements-entity-extraction-api/>`
- `Keywords <http://blog.paralleldots.com/technology/extract-weighty-words-keyword-extraction-api/>`
- `Intent <http://blog.paralleldots.com/text-analytics/common-use-cases-intent-analysis/>`
- Emotion
- Multiple Language Sentiment
	- Portuguese ( pt )
	- French ( fr )

Examples
--------

.. code:: python

	>>> from paralleldots import similarity, ner, taxonomy, sentiment, keywords, intent, emotion, multilang_sentiment

	>>> similarity( "Sachin is the greatest batsman", "Tendulkar is the finest cricketer" )
	{"actual_score": 0.8429316099720955, "normalized_score": 4.931468684177398, "similarity": 4.931468684177398}

	>>> sentiment( "Come on, lets play together" )
	{"sentiment": 0.8513014912605286}

	>>> taxonomy( "Narendra Modi is the prime minister of India" )
	{"tags": [[u"finance", 4.088], [u"government", 3.4284], [u"business", 1.2719]]}

	>>> ner( "Narendra Modi is the prime minister of India" )
	{"entities": [[u"Modi", 1.0, [u"person"], u""], [u"India", 1.0, [u"org"], u""], [u"Narendra", 1.0, [u"org"], u""]]}

	>>> keywords( "Prime Minister Narendra Modi tweeted a link to the speech Human Resource Development Minister Smriti Irani made in the Lok Sabha during the debate on the ongoing JNU row and the suicide of Dalit scholar Rohith Vemula at the Hyderabad Central University." )
	{"keywords": [[u"Human Resource Development Minister Smriti Irani", 6], [u"Prime Minister Narendra Modi", 4], [u"Hyderabad Central University", 3], [u"ongoing JNU row", 3], [u"Dalit scholar", 2], [u"Lok Sabha", 2], [u"Rohith Vemula", 2]]}

	>>> emotion("Did you hear the latest Porcupine Tree song ? It's rocking !")
	{"emotion": "happy"}

	>>> intent("Finance ministry calls banks to discuss new facility to drain cash")
	{"intent": "news"}

	>>> multilang_sentiment("La ville de Paris est très belle", "fr")
	{"sentiment": "positive", "confidence_score": 0.998047}