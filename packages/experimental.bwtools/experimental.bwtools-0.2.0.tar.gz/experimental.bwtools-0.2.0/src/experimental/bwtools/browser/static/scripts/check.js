(function(jQuery) {
  jQuery(window).load(function() {
    var cookie_name = '_bw';

    function get_cookie() {
      var keyValue = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }

    function set_cookie(value) {
      var expires = new Date();
      expires.setTime(expires.getTime() + (5 * 60 * 1000)); // 5min
      document.cookie = cookie_name + '=' + value + ';path=/;expires=' + expires.toUTCString();
    }

    /**
     * If we don't have the cookie call a worker to do some measurements
     * and store the results in the cookie
     */
    if (!get_cookie()) {
      var base_url = PORTAL_URL + '/++plone++experimental.bwtools';
      if (typeof(Worker) === 'undefined') {
        return; // unsupported
      }
      w = new Worker(base_url + "/scripts/worker.js");
      w.postMessage({
        base_url: base_url
      });
      w.onmessage = function(event) {
        if (event.data) {
          set_cookie(event.data);
        }
      };
    }
  });
}(jQuery));
