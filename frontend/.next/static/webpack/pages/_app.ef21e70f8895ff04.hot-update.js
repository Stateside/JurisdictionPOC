"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/Layout.tsx":
/*!***********************************!*\
  !*** ./src/components/Layout.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layout\": function() { return /* binding */ Layout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Header */ \"./src/components/Header.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Layout(props) {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)();\n    console.log(\"AQUI\", ethersState);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_2__.Header, {\n                siteTitle: \"bbbbb\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxW: \"container.lg\",\n                py: \"8\",\n                children: props.children\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Layout, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState\n    ];\n});\n_c = Layout;\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9MYXlvdXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBd0M7QUFDSTtBQUNBO0FBQ1E7O0FBTzdDLFNBQVNJLE1BQU0sQ0FBQ0MsS0FBWSxFQUFFOztJQUNuQyxJQUFNQyxXQUFXLEdBQUdILGtFQUFjLEVBQUU7SUFFcENJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sRUFBRUYsV0FBVyxDQUFDO0lBQ2hDLHFCQUNFOzswQkFDRSw4REFBQ0osc0RBQU07Z0JBQUNPLFNBQVMsRUFBQyxPQUFPOzs7OztvQkFBRTswQkFDM0IsOERBQUNSLHVEQUFTO2dCQUFDUyxJQUFJLEVBQUMsY0FBYztnQkFBQ0MsRUFBRSxFQUFDLEdBQUc7MEJBQ2xDTixLQUFLLENBQUNPLFFBQVE7Ozs7O29CQUNMOztvQkFDWCxDQUVKO0NBQ0Y7R0FiZVIsTUFBTTs7UUFDQUQsOERBQWM7OztBQURwQkMsS0FBQUEsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9MYXlvdXQudHN4P2RlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICdAL2NvbXBvbmVudHMvSGVhZGVyJ1xyXG5pbXBvcnQgeyB1c2VFdGhlcnNTdGF0ZSB9IGZyb20gJ0Avc3RvcmUvQWNjb3VudERhdGEnXHJcbmltcG9ydCB7IHNpdGVMYXlvdXREYXRhIH0gZnJvbSAnQC9zdG9yZS9pbml0aWFsJ1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBjaGlsZHJlbjogUmVhY3ROb2RlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBMYXlvdXQocHJvcHM6IFByb3BzKSB7XHJcbiAgY29uc3QgZXRoZXJzU3RhdGUgPSB1c2VFdGhlcnNTdGF0ZSgpXHJcblxyXG4gIGNvbnNvbGUubG9nKCdBUVVJJywgZXRoZXJzU3RhdGUpXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxIZWFkZXIgc2l0ZVRpdGxlPSdiYmJiYicvPlxyXG4gICAgICA8Q29udGFpbmVyIG1heFc9J2NvbnRhaW5lci5sZycgcHk9JzgnPlxyXG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICA8Lz5cclxuXHJcbiAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiSGVhZGVyIiwidXNlRXRoZXJzU3RhdGUiLCJMYXlvdXQiLCJwcm9wcyIsImV0aGVyc1N0YXRlIiwiY29uc29sZSIsImxvZyIsInNpdGVUaXRsZSIsIm1heFciLCJweSIsImNoaWxkcmVuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Layout.tsx\n");

/***/ })

});