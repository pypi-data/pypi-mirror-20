Concurrent Flood Scraper
========================

It's probably exactly what you think it is, based off the name
--------------------------------------------------------------

GET a page. scrape for urls, filter those according to some regex. Put all those in a master queue. Scrape page for any data you want. Repeat...

There's a small demo in the wikipedia_demo. There you can see how easy it is to set up to fit your web scraping needs!


Specifics
=========

1. Create a child class of concurrentfloodscraper.Scraper and implement the scrape_page(self, text) method. text is the raw html. In this method you do the specific scraping required. Note that only urls that match the class url_filter_regex will be added to the master queue.

2. Annotate your Scraper subclass with concurrentfloodscraper.Route. The single parameter is a regex; URL's that match the regex will be parsed with that scraper.

3. Repeat steps 1 and 2 for as many different types of pages you expect to be scraping from.

4. Create an instance of concurrentfloodscraper.ConcurrentFloodScraper, pass it the root URL, the number of threads to use, and a page limit. Page limit defaults to None, which means 'go forever'.

5. Start the ConcurrentFloodScraper instance, and enjoy the magic!

