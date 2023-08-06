analyze_site is a python application to crawl a site and return a count of the keywords, provided in a file, found in the web pages of the site. The application will also return counts of the most used verb, nouns, adverbs and adjectives.

analyze_site requires Python version 3 and the following libraries:

* nltk - Natural Language Toolkit with maxent_treebank_pos_tagger



usage: analyze_site.py [-h] [-d DEPTH] [-r PATH_REGEX] [--verbose]
                       keywords_file url

positional arguments:
  keywords_file         Path to keywords file
  url                   URL to crawl

optional arguments:
  -h, --help            show this help message and exit
  -d DEPTH, --depth DEPTH
                        Depth to crawl
  -r PATH_REGEX, --path_regex PATH_REGEX
                        Regular expression to match URL
  --verbose             Increase logging level

