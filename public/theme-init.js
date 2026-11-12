/* Runs before first paint. On the home route ("/"), switch to the light theme so
   there is no dark flash behind the light page. App.tsx keeps the class in step
   with client-side navigation afterwards. */
(function () {
  try {
    if (location.pathname.replace(/\/+$/, '') !== '') return;
    document.documentElement.classList.add('lp-light');
    var cs = document.querySelector('meta[name="color-scheme"]');
    if (cs) cs.setAttribute('content', 'light');
    var tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', '#F4F7FD');
  } catch (e) { /* the page still works in the dark theme */ }
})();
