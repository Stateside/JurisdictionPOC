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

/***/ "./src/components/Header.tsx":
/*!***********************************!*\
  !*** ./src/components/Header.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props1) {\n    _s();\n    var siteTitle = props1.siteTitle, ctaText = props1.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    var getAccountShortName = function(props) {\n        var account = props.account, ctaDefault = props.ctaDefault;\n        if (account !== \"\") {\n            var mainChars = account.slice(0, 6);\n            var lastChars = account.slice(0, -2);\n            var accountShortName = \"\".concat(mainChars, \"...\").concat(lastChars);\n            return accountShortName;\n        }\n        return ctaDefault;\n    };\n    // console.log('WHAT ABOUT THIS:', ethersState)\n    var accountID = getAccountShortName(ethersState.account, ctaText);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"2rem 0\",\n        margin: \"0 0 40px 0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"11px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 35,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 36,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxWidth: \"100%\",\n                padding: \"0\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                    float: \"right\",\n                    size: \"md\",\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                    fontWeight: \"700\",\n                    fontSize: \"15px\",\n                    lineHeight: \"20px\",\n                    color: \"brand.grey.grey04\",\n                    background: \"brand.java\",\n                    type: \"button\",\n                    w: \"125px\",\n                    onClick: function() {\n                        (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && (ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect());\n                        getAccountShortName(ethersState.account);\n                    },\n                    _hover: {\n                        background: \"brand.javaHover\"\n                    },\n                    children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" ? ctaText : ethersState.account\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 47,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 34,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O3dCQUNKTCxVQUFVLEVBQUUsaUJBQWlCO3FCQUNoQzs4QkFDQTNCLENBQUFBLFdBQVcsYUFBWEEsV0FBVyxXQUFTLEdBQXBCQSxLQUFBQSxDQUFvQixHQUFwQkEsV0FBVyxDQUFFRSxPQUFPLE1BQUssRUFBRSxHQUFHSCxPQUFPLEdBQUdDLFdBQVcsQ0FBQ0UsT0FBTzs7Ozs7d0JBQ3ZEOzs7OztvQkFDRDs7Ozs7O1lBQ1AsQ0FDWjtDQUNKO0dBdERlTixNQUFNOztRQUVFRiw4REFBYzs7O0FBRnRCRSxLQUFBQSxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci50c3g/YTY5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDb250YWluZXIsIEJ1dHRvbiwgVGV4dCwgSFN0YWNrLCBJbWFnZSB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VFdGhlcnNTdGF0ZSB9IGZyb20gJ0Avc3RvcmUvQWNjb3VudERhdGEnXG5pbXBvcnQgV2FsbGV0SWNvbiBmcm9tICdAL2NvbXBvbmVudHMvaWNvbnMvd2FsbGV0SWNvbidcblxudHlwZSBQcm9wcyA9IHtcbiAgICBzaXRlVGl0bGU6IHN0cmluZ1xuICAgIGN0YVRleHQ6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgR2V0QWNjb3VudFNob3J0TmFtZSB7XG4gICAgYWNjb3VudDogc3RyaW5nLCBcbiAgICBjdGFEZWZhdWx0OiBzdHJpbmcgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXIocHJvcHM6IFByb3BzKSB7XG4gICAgY29uc3QgeyBzaXRlVGl0bGUsIGN0YVRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUoKVxuXG4gICAgY29uc3QgZ2V0QWNjb3VudFNob3J0TmFtZSA9IChwcm9wczpHZXRBY2NvdW50U2hvcnROYW1lKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgeyBhY2NvdW50LCBjdGFEZWZhdWx0IH0gPSBwcm9wcztcbiAgICAgICAgaWYgKGFjY291bnQgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBtYWluQ2hhcnMgPSBhY2NvdW50LnNsaWNlKDAsIDYpXG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hhcnMgPSBhY2NvdW50LnNsaWNlKDAsIC0yKVxuICAgICAgICAgICAgY29uc3QgYWNjb3VudFNob3J0TmFtZSA9IGAke21haW5DaGFyc30uLi4ke2xhc3RDaGFyc31gO1xuICAgICAgICAgICAgcmV0dXJuIGFjY291bnRTaG9ydE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN0YURlZmF1bHQ7XG5cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ1dIQVQgQUJPVVQgVEhJUzonLCBldGhlcnNTdGF0ZSlcbiAgICBjb25zdCBhY2NvdW50SUQgPSBnZXRBY2NvdW50U2hvcnROYW1lKGV0aGVyc1N0YXRlLmFjY291bnQsIGN0YVRleHQpXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEhTdGFjayBwYWRkaW5nPScycmVtIDAnIG1hcmdpbj0nMCAwIDQwcHggMCc+XG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPScvaW1ncy9sb2dvLnN2ZycgYm94U2l6ZT0nMi42cmVtJyBhbHQ9J0p1cmlzZGljdGlvbiBMb2dvJyBtYXJnaW5SaWdodD17JzExcHgnfSAvPlxuICAgICAgICAgICAgPFRleHRcbiAgICAgICAgICAgICAgICBtYXJnaW5JbmxpbmVTdGFydD0nMCdcbiAgICAgICAgICAgICAgICBtYXhXaWR0aD17eyBiYXNlOiAnMjIxcHgnIH19XG4gICAgICAgICAgICAgICAgZm9udFNpemU9e3sgYmFzZTogJzE1cHgnIH19XG4gICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ9JzIwcHgnXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZz0nMHB4J1xuICAgICAgICAgICAgICAgIHRleHRBbGlnbj0nbGVmdCdcbiAgICAgICAgICAgICAgICBjb2xvcj0nYnJhbmQuYmxhY2snPlxuICAgICAgICAgICAgICAgIHtzaXRlVGl0bGV9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8Q29udGFpbmVyIG1heFdpZHRoPXsnMTAwJSd9IHBhZGRpbmc9JzAnPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgZmxvYXQ9J3JpZ2h0J1xuICAgICAgICAgICAgICAgICAgICBzaXplPSdtZCdcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8V2FsbGV0SWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT0nMTVweCdcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodD0nMjBweCdcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmdyZXkuZ3JleTA0J1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kPSdicmFuZC5qYXZhJyB0eXBlPVwiYnV0dG9uXCIgdz0nMTI1cHgnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0aGVyc1N0YXRlPy5hY2NvdW50ID09PSAnJyAmJiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRBY2NvdW50U2hvcnROYW1lKGV0aGVyc1N0YXRlLmFjY291bnQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfaG92ZXI9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiYnJhbmQuamF2YUhvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICB7ZXRoZXJzU3RhdGU/LmFjY291bnQgPT09IFwiXCIgPyBjdGFUZXh0IDogZXRoZXJzU3RhdGUuYWNjb3VudH1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L0hTdGFjaz5cbiAgICApXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiQnV0dG9uIiwiVGV4dCIsIkhTdGFjayIsIkltYWdlIiwidXNlRXRoZXJzU3RhdGUiLCJXYWxsZXRJY29uIiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJnZXRBY2NvdW50U2hvcnROYW1lIiwiYWNjb3VudCIsImN0YURlZmF1bHQiLCJtYWluQ2hhcnMiLCJzbGljZSIsImxhc3RDaGFycyIsImFjY291bnRTaG9ydE5hbWUiLCJhY2NvdW50SUQiLCJwYWRkaW5nIiwibWFyZ2luIiwic3JjIiwiYm94U2l6ZSIsImFsdCIsIm1hcmdpblJpZ2h0IiwibWFyZ2luSW5saW5lU3RhcnQiLCJtYXhXaWR0aCIsImJhc2UiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibGV0dGVyU3BhY2luZyIsInRleHRBbGlnbiIsImNvbG9yIiwiZmxvYXQiLCJzaXplIiwicmlnaHRJY29uIiwiYmFja2dyb3VuZCIsInR5cGUiLCJ3Iiwib25DbGljayIsImNvbm5lY3QiLCJfaG92ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});