"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/getProposals";
exports.ids = ["pages/api/getProposals"];
exports.modules = {

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./src/pages/api/getProposals.ts":
/*!***************************************!*\
  !*** ./src/pages/api/getProposals.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nconst FILE = \"proposals.json\";\nconst getProposals = async (req, res)=>{\n    const { cid  } = req.query;\n    const proposals = fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(FILE) ? JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(FILE, \"utf8\")) : {};\n    if (proposals[cid]) res.send(proposals[cid]);\n    else res.send([]);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getProposals);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2dldFByb3Bvc2Fscy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDb0I7QUFFcEIsTUFBTUMsSUFBSSxHQUFHLGdCQUFnQjtBQUU3QixNQUFNQyxZQUFZLEdBQUcsT0FBT0MsR0FBbUIsRUFBRUMsR0FBb0IsR0FBSztJQUN4RSxNQUFNLEVBQUVDLEdBQUcsR0FBRSxHQUFHRixHQUFHLENBQUNHLEtBQUs7SUFFekIsTUFBTUMsU0FBUyxHQUFHUCxvREFBYSxDQUFDQyxJQUFJLENBQUMsR0FBR1EsSUFBSSxDQUFDQyxLQUFLLENBQUNWLHNEQUFlLENBQUNDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFFdEYsSUFBSU0sU0FBUyxDQUFDRixHQUFHLENBQUMsRUFDaEJELEdBQUcsQ0FBQ1EsSUFBSSxDQUFDTCxTQUFTLENBQUNGLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FFekJELEdBQUcsQ0FBQ1EsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUNmO0FBRUQsaUVBQWVWLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYW9mZS8uL3NyYy9wYWdlcy9hcGkvZ2V0UHJvcG9zYWxzLnRzP2M3MDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbmNvbnN0IEZJTEUgPSBcInByb3Bvc2Fscy5qc29uXCJcclxuXHJcbmNvbnN0IGdldFByb3Bvc2FscyA9IGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xyXG4gIGNvbnN0IHsgY2lkIH0gPSByZXEucXVlcnkgYXMgeyBjaWQ6IHN0cmluZyB9O1xyXG5cclxuICBjb25zdCBwcm9wb3NhbHMgPSBmcy5leGlzdHNTeW5jKEZJTEUpID8gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoRklMRSwgXCJ1dGY4XCIpKSA6IHt9XHJcblxyXG4gIGlmIChwcm9wb3NhbHNbY2lkXSlcclxuICAgIHJlcy5zZW5kKHByb3Bvc2Fsc1tjaWRdKTtcclxuICBlbHNlIFxyXG4gICAgcmVzLnNlbmQoW10pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFByb3Bvc2FscyJdLCJuYW1lcyI6WyJmcyIsIkZJTEUiLCJnZXRQcm9wb3NhbHMiLCJyZXEiLCJyZXMiLCJjaWQiLCJxdWVyeSIsInByb3Bvc2FscyIsImV4aXN0c1N5bmMiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJzZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/getProposals.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/getProposals.ts"));
module.exports = __webpack_exports__;

})();