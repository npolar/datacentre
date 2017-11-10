// Thanks Stackoverflow user
function extractBrowser(navigator) {
'use strict';
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name:'Internet Explorer',version:(tem[1]||'')};
      }
  if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR|Edge\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}

function nomoduleHtml(browser, userAgent) {
  'use strict';
  return `<style> main.nomodule > * {  }</style>
<main class="nomodule">
  <div>
    <h2>Modern JavaScript needed</h2>
    <p>This application is built with recent web technologies.
      To run, use a browser with a JavaScript engine that supports ECMAScript 2015 modules.
    </p>
    <p>
      This includes (minimal version):
      <ul>
      <li><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome/chrome_32x32.png"><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chromium/chromium_32x32.png">Chrome / Chromium (61)</li>
      <li><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_32x32.png">Edge (16)</li>
      <li><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox/firefox_32x32.png">Firefox (55) <em>not enabled by default</em></li>
      <li><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari/safari_32x32.png">Safari (11)
      <li><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera/opera_32x32.png">Opera (48)</li>
      </ul>
    </p>
  </div>
  <div><!--You can view published datasets on our partner site <a href="https://search.datacite.org/data-centers/bibsys.npolar">Datacite</a>--></div>
  <div>Current browser engine: ${browser.name} (${browser.version})
    <pre>${userAgent}</pre>
  </div>
</main>`;
}


document.addEventListener('DOMContentLoaded', (/*event*/) => {
  'use strict';

  const nomoduleElement = document.querySelector('datacentre-error');
  const browser = extractBrowser(navigator);
  nomoduleElement.innerHTML = nomoduleHtml(browser, navigator.userAgent);

});
