/*
 * popToggle: A simple method for toggling an element's visibility via Popcorn
 * Arguments:
 *  - name: A string CSS selector to find the element on the page
 *  - start: A string start time of when the element should be shown
 *  - end: A string end time of when the element should be hidden
 *  - slide: A string representing the type of slidein animation.
 *           Defaults to "slidein-right".
 */
var popToggle = function(name, start, end, slide) {
  // By default the animation style is "slidein-right"
  slide = slide || "slidein-right";

  // Get the element that we want to toggle via Popcorn
  var $elem = $(name);

  // Make sure we remember where it was placed in the page, for later
  var $parent = $elem.parent();

  // Remove the element from the page before we begin running Popcorn
  // (this makes it so that it's invisible until we need it)
  $elem.detach();

  // Set up the Popcorn code
  pop.code({
    // Initialize the start and end times
    start: start,
    end: end,

    // Handle when the item should be shown
    onStart: function() {
      // We insert the element back into the page where it came from
      // We also clone the element to make sure that any media attributes
      // (like the autoplay attribute on the audio tag) are respected.
      $elem = $elem.clone(true).appendTo($parent);

      // We wait a tiny amount of time (1ms) in order for the CSS
      // transition to take effect when we add in the slidein class
      setTimeout(function() {
        $elem.addClass(slide);
      }, 1);
    },

    // Handle when the item should be hidden
    onEnd: function() {
      // Remove the slidein class to start the animation
      $elem.removeClass(slide);

      // The animation is 500ms by default so we wait that long
      setTimeout(function() {
        // Before finally removing the element from the page again
        $elem.detach();
      }, 500);
    }
  }); 
};