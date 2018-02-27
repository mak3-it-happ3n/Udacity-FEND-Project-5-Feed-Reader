/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* @description: a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs', function() {
           for (let i in allFeeds) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url).not.toBe("");
           }
         });

        /* @description: a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
           for (let i in allFeeds) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name).not.toBe("");
           }
         });
    });


    /*  @description: a new test suite named "The menu" */
    describe('The menu', function() {

        /*  @description: a test that ensures the menu element is
         * hidden by default. (analyzing the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.)
         */
         it('is hidden', function() {
           expect(document.querySelector('body').classList.contains('menu-hidden'))
           .toBe(true);
         });

         /* @description: a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility', function() {
            let body = document.querySelector('body');
            let icon = document.querySelector('.menu-icon-link');
            //1st click:
            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            //2nd click:
            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    /*  @description: a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* @description: a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * (loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.)
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
              done();
           });
         });

         it('are more than 0', function(done) {
           expect(document.querySelectorAll('.feed .entry').length > 0).toBe(true);
           done();
         });
    });

    /*  @description: a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* @description: a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * (loadFeed() is asynchronous.)
         */
         let feed1HTML;
         let feed2HTML;

         beforeEach(function(done) {
           loadFeed(0, function() {
             feed1HTML = document.querySelectorAll('.feed .entry')[0].innerHTML;
              done();
           });
         });

         beforeEach(function(done) {
           loadFeed(1, function() {
             feed2HTML = document.querySelectorAll('.feed .entry')[0].innerHTML;
              done();
           });
         });

         it('is different to previous', function(done) {
           expect(feed1HTML == feed2HTML).toBe(false);
           done();
         });
       });
});
