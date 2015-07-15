require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"about":"<div class=\"abt-container\">\n  <div>\n    <h2 class=\"section-header\">What is LEED?</h2>\n  </div>\n  \n  <div class=\"abt-content\">\n    <p>\n    LEED (Leadership in Energy and Environmental Design) provides a framework and rating system for sustainable design, construction, operations, and maintenance of new and existing buildings (and, more recently, neighborhoods and communities, but we stuck to analyzing the individual building data). Our focus is the Building and Construction rating system, New Construction versions 2.1, 2.2. and 2009.\n    </p>\n  </div>\n  \n  <div class=\"abt-content\">\n    <table class=\"abt-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\">\n      <thead>\n        <tr>\n          <th class=\"mdl-data-table__cell--non-numeric\">LEED-NC</th>\n          <th>Year Published</th>\n          <th>Maximum Points</th>\n        </tr>\n      </thead>\n      <tbody>\n    \t<tr>\n          <td class=\"mdl-data-table__cell--non-numeric\">Version 2.</td>\n          <td>2000</td>\n          <td>69</td>\n        </tr>\n        <tr>\n          <td class=\"mdl-data-table__cell--non-numeric\">Version 2.1</td>\n          <td>2002</td>\n          <td>69</td>\n        </tr>\n        <tr>\n          <td class=\"mdl-data-table__cell--non-numeric\">Version 2.2</td>\n          <td>2002</td>\n          <td>69</td>\n        </tr>\n        <tr>\n          <td class=\"mdl-data-table__cell--non-numeric\">Version 2009 (also called v3)</td>\n          <td>2009</td>\n          <td>110</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  \n  <div class=\"abt-content\">\n    <h3>Versions of LEED we analyzed:<h3>\n    <p>\n    There is currently a LEED v4, but recently released and very few datasets are available, LEED 2009 can still be used until October 2016. We used the last three versions LEED 2009 (also referred to as v3) and LEED v.2.1 and v2.2 for our analysis. \n    </p>\n  </div>\n  <div class=\"abt-summary-table-and-content\"> \n    <div class=\"abt-summary-table-content-container\">\n      <div>\n        <h4>LEED 2009</h4>\n        <p>\n        LEED 2009 was built using the previous LEED 2.2 version. The fundamental change to LEED 2009 was the revised credit ratings to reflect significant technological advancements in the industry. Also, Regional Priority (RP) extra points were added. Projects can earn up to 10 bonus points for credits based on location (e.g. in dry a climate reducing water consumption is worth an additional point) and Innovation and Design. Different regions of the country recognize different credits as extra points. \n        </p>\n        <p>\n        Under LEED 2009, there are 100 possible base points distributed across six credit categories: Sustainable Sites, Water Efficiency, Energy and Atmosphere, Materials and Resources, Indoor Environmental Quality, Innovation in Design. \n        </p>\n      </div>\n      <div>\n        <h4>LEED versions 2.1 and 2.2</h4>\n        <p>\n        The major difference between LEED 2.1 and 2.2 is the Energy and Atmosphere, Credit 2. Originally, in LEED 2.1, the credit was subdivided into three credits Renewable Energy 5%, 10% and 20%. LEED 2.2 grouped the credits into one and offered three points for each of the levels. \n        </p>\n      </div>\n    </div>\n    \n    <div class=\"abt-summary-table-container\">\n      <div>\n        <h6 class=\"abt-summary-table-header\">\n         LEED by Version and Certification Level\n        </h6>\n      </div>\n      <div>\n        <table class=\"abt-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\">\n          <thead>\n            <tr>\n              <th class=\"mdl-data-table__cell--non-numeric\"></th>\n              <th>v.2009</th>\n              <th>v.2.x</th>\n            </tr>\n          </thead>\n          <tbody>\n        \t<tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Base Point</td>\n              <td>100</td>\n              <td>64</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Innovation in Design </td>\n              <td>6</td>\n              <td>5</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Regional Priority</td>\n              <td>4</td>\n              <td>0</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Total Possible Points</td>\n              <td>110</td>\n              <td>69</td>\n            </tr>\n        \t<tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Certified</td>\n              <td>40-49</td>\n              <td>26-32</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Silver</td>\n              <td>50-59</td>\n              <td>39-51</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Gold</td>\n              <td>60-79</td>\n              <td>36-51</td>\n            </tr>\n            <tr>\n              <td class=\"mdl-data-table__cell--non-numeric\">Platinum</td>\n              <td>80+</td>\n              <td>52+</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n    \n    \n    \n","leedvs":"<h2 class=\"section-header\">LEED vs Non-LEED</h2>","not-found":"<h1>404 Not found!</h1>","overview":"<div class=\"intro-container\">\n    <h1 class=\"intro-header\">Build it <span class=\"style-intro-header\">Green</span></h1>\n        <div class=\"intro-image\"></div>\n    <div class=\"intro-text\">\n        <p>\n          Data Science and Visualizations for Green Building Design\n        </p>\n        <p>\n          Buildings consume a lot of energy (roughly 40% in the US)! More thoughtful design of buildings can help reduce energy consumption, cut CO2 emissions and improve overall air quality. A framework for sustainable design, called LEED (Leadership in Energy and Environmental Design), is helping improve building performance. Over the last 15 years, LEED has become main stream with more than 80,000 buildings and ** sqft designed and certified.  \n        </p>\n        <p>\n          We analyzed the data for all LEED buildings and found LEED is making a big dent in the building industry but there is room for improvement. Checkout the stats below, or dive deeper, of the Scoring System and LEED vs Non-LEED tabs.\n        </p>\n      </div>  \n  </div>\n<div class=\"mdl-grid\">\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">How does each state perform on LEED?</h3>\n    <div name=\"descriptor\" id=\"map-dropdown\">\n      <div value=\"number_of_projects\" checked=\"checked\">Total</div>\n      <div value=\"number_of_projects_population_corrected\">Pop. Adj.</div>\n      <div value=\"number_certified\">Certified</div>\n      <div value=\"number_gold\">Gold</div>\n      <div value=\"number_silver\">Silver</div>\n      <div value=\"number_platinum\">Platinum</div>\n    </div>\n    <div class=\"map\"></div>\n  </div>\n  <!--\n    <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">Total Projects by City (Population Adjusted)</h3>\n    <div name=\"descriptor\" id=\"plotly-dropdown\">\n      <div checked=\"checked\">Total</div>\n      <div>Pop. Adj.</div>\n    </div>\n    <div class=\"plotly-total\">\n       <a href=\"https://plot.ly/~jdhiggins/43/\" target=\"_blank\" title=\"Population Adjusted LEED Certified Projects&lt;br&gt;(Click legend to toggle traces)\" style=\"display: block; text-align: center;\"><img src=\"https://plot.ly/~jdhiggins/43.png\" alt=\"Population Adjusted LEED Certified Projects&lt;br&gt;(Click legend to toggle traces)\" style=\"max-width: 100%;\"  onerror=\"this.onerror=null;this.src='https://plot.ly/404.png';\" /></a>\n       <script data-plotly=\"jdhiggins:43\"  src=\"https://plot.ly/embed.js\" async></script>\n    </div>\n    <div class=\"plotly-adjusted\">\n       <a href=\"https://plot.ly/~jdhiggins/41/\" target=\"_blank\" title=\"Total LEED Certified Projects&lt;br&gt;(Click legend to toggle traces)\" style=\"display: block; text-align: center;\"><img src=\"https://plot.ly/~jdhiggins/41.png\" alt=\"Total LEED Certified Projects&lt;br&gt;(Click legend to toggle traces)\" style=\"max-width: 100%;\"  onerror=\"this.onerror=null;this.src='https://plot.ly/404.png';\" /></a>\n       <script data-plotly=\"jdhiggins:41\"  src=\"https://plot.ly/embed.js\" async></script>\n    </div>\n  </div>\n  -->\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">Has LEED usage grown over time?</h3>\n    <div name=\"descriptor\" id=\"trend1-dropdown\">\n      <div value=\"certLevels\" checked=\"checked\">Cert Level</div>\n      <div value=\"regVsCert\">Reg vs Cert</div>\n      <div value=\"newConst\">NC Versions</div>\n      <div value=\"buildType\">Residential</div>\n    </div>\n    <div class=\"trend-1\"></div>\n  </div>\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">How might you classify LEED projects?</h3>\n    <div name=\"descriptor\" id=\"trend2-dropdown\">\n      <div value=\"0\" checked=\"checked\">LEED 2009</div>\n      <div value=\"1\">LEED 2.2</div>\n      <div value=\"2\">LEED 2.1</div>\n    </div>\n    <div class=\"trend-2\"></div>\n  </div>\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">How are builders and developers using the LEED system?</h3>\n    <div name=\"descriptor\" id=\"trend3-dropdown\">\n      <div value=\"0\" checked=\"checked\">LEED 2009</div>\n      <div value=\"1\">LEED 2.2</div>\n      <div value=\"2\">LEED 2.1</div>\n    </div>\n    <div class=\"trend-3\"></div>\n  </div>\n</div>","scoring":"<div class=\"intro-container\">\n    <h1 class=\"intro-header\">LEED Credit Breakdown<span class=\"style-intro-header\"></span></h1>\n    <div class=\"intro-image\"></div>\n    <div class=\"intro-text\">\n        <p>\n          \n        </p>\n        <p>\n\n        </p>\n        <p>\n\n        </p>\n      </div>  \n  </div>\n<div class=\"mdl-grid\">\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">Average Normalized Credit Completion</h3>\n    <div name=\"descriptor\" id=\"scoring1-dropdown\">\n      <div value=\"0\" checked=\"checked\">LEED 2009</div>\n      <div value=\"1\">LEED 2.2</div>\n      <div value=\"2\">LEED 2.1</div>\n    </div>\n    <div class=\"overallbar\"></div>\n  </div>\n  <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">Average Credit Completion by Year</h3>\n    <div name=\"descriptor\" id=\"scoring-version1-dropdown\">\n      <div value=\"0\" checked=\"checked\">LEED 2009</div>\n      <div value=\"1\">LEED 2.2</div>\n      <div value=\"2\">LEED 2.1</div>\n    </div>\n    <div name=\"descriptor\" id=\"scoring-category1-dropdown\">\n      <div value=\"ea\" checked=\"checked\">Energy & Atmosphere</div>\n      <div value=\"eq\">Indoor Environmental Quality</div>\n      <div value=\"extr\">Regional Priority</div>\n      <div value=\"id\">Innovation & Design</div>\n      <div value=\"mr\">Materials & Resources</div>\n      <div value=\"ss\">Sustainable Sites</div>\n      <div value=\"we\">Water Efficiency</div>\n    </div>\n    <div class=\"cc-by-year\"></div>\n  </div>\n    <div class=\"mdl-cell mdl-cell--10-col mdl-cell--10-col-tablet chart-container\">\n    <h3 class=\"section-header\">Average Credit Completion by Category</h3>\n    <div name=\"descriptor\" id=\"scoring-version2-dropdown\">\n      <div value=\"0\" checked=\"checked\">LEED 2009</div>\n      <div value=\"1\">LEED 2.2</div>\n      <div value=\"2\">LEED 2.1</div>\n    </div>\n    <div name=\"descriptor\" id=\"scoring-category2-dropdown\">\n      <div value=\"ea\" checked=\"checked\">Energy & Atmosphere</div>\n      <div value=\"eq\">Indoor Environmental Quality</div>\n      <div value=\"extr\">Regional Priority</div>\n      <div value=\"id\">Innovation & Design</div>\n      <div value=\"mr\">Materials & Resources</div>\n      <div value=\"ss\">Sustainable Sites</div>\n      <div value=\"we\">Water Efficiency</div>\n    </div>\n    <div class=\"cc-by-category\"></div>\n  </div>\n</div>"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
