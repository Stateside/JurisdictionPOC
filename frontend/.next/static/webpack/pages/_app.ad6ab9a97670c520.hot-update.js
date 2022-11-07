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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    var getAccountShortName = function(account) {\n        console.log(\"CLICKING AND GETTING ACCOUNT ID:\", account);\n        // const mainChars = account.slice(0, 3)\n        var accountShortName = \"\";\n        return accountShortName;\n    };\n    console.log(\"WHAT ABOUT THIS:\", ethersState);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"2rem 0\",\n        margin: \"0 0 40px 0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"11px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 26,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 27,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxWidth: \"100%\",\n                padding: \"0\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                    float: \"right\",\n                    size: \"md\",\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                    fontWeight: \"700\",\n                    fontSize: \"15px\",\n                    lineHeight: \"20px\",\n                    color: \"brand.grey.grey04\",\n                    background: \"brand.java\",\n                    type: \"button\",\n                    w: \"125px\",\n                    onClick: function() {\n                        return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                    },\n                    _hover: {\n                        background: \"brand.javaHover\"\n                    },\n                    children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" ? ctaText : ethersState.account\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 39,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 38,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 25,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBeUI7QUFDZ0Q7QUFDckI7QUFDRTs7QUFPL0MsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTixrRUFBYyxFQUFFO0lBRXBDLElBQU1PLG1CQUFtQixHQUFHLFNBQUNDLE9BQTBCLEVBQWE7UUFFaEVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGtDQUFrQyxFQUFFRixPQUFPLENBQUM7UUFDeEQsd0NBQXdDO1FBQ3hDLElBQU1HLGdCQUFnQixHQUFJO1FBQzFCLE9BQU9BLGdCQUFnQixDQUFDO0tBQzNCO0lBQ0RGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixFQUFFSixXQUFXLENBQUM7SUFFNUMscUJBQ0ksOERBQUNSLG9EQUFNO1FBQUNjLE9BQU8sRUFBQyxRQUFRO1FBQUNDLE1BQU0sRUFBQyxZQUFZOzswQkFDeEMsOERBQUNkLG1EQUFLO2dCQUFDZSxHQUFHLEVBQUMsZ0JBQWdCO2dCQUFDQyxPQUFPLEVBQUMsUUFBUTtnQkFBQ0MsR0FBRyxFQUFDLG1CQUFtQjtnQkFBQ0MsV0FBVyxFQUFFLE1BQU07Ozs7O29CQUFJOzBCQUM1Riw4REFBQ3BCLGtEQUFJO2dCQUNEcUIsaUJBQWlCLEVBQUMsR0FBRztnQkFDckJDLFFBQVEsRUFBRTtvQkFBRUMsSUFBSSxFQUFFLE9BQU87aUJBQUU7Z0JBQzNCQyxRQUFRLEVBQUU7b0JBQUVELElBQUksRUFBRSxNQUFNO2lCQUFFO2dCQUMxQkUsVUFBVSxFQUFDLEtBQUs7Z0JBQ2hCQyxVQUFVLEVBQUMsTUFBTTtnQkFDakJDLGFBQWEsRUFBQyxLQUFLO2dCQUNuQkMsU0FBUyxFQUFDLE1BQU07Z0JBQ2hCQyxLQUFLLEVBQUMsYUFBYTswQkFDbEJ0QixTQUFTOzs7OztvQkFDUDswQkFDUCw4REFBQ1QsdURBQVM7Z0JBQUN3QixRQUFRLEVBQUUsTUFBTTtnQkFBRVAsT0FBTyxFQUFDLEdBQUc7MEJBQ3BDLDRFQUFDaEIsb0RBQU07b0JBQ0grQixLQUFLLEVBQUMsT0FBTztvQkFDYkMsSUFBSSxFQUFDLElBQUk7b0JBQ1RDLFNBQVMsZ0JBQUUsOERBQUM1QixvRUFBVSxvQ0FBRztvQkFDekJxQixVQUFVLEVBQUMsS0FBSztvQkFDaEJELFFBQVEsRUFBQyxNQUFNO29CQUNmRSxVQUFVLEVBQUMsTUFBTTtvQkFDakJHLEtBQUssRUFBQyxtQkFBbUI7b0JBQ3pCSSxVQUFVLEVBQUMsWUFBWTtvQkFBQ0MsSUFBSSxFQUFDLFFBQVE7b0JBQUNDLENBQUMsRUFBQyxPQUFPO29CQUFDQyxPQUFPLEVBQUU7d0JBQU0zQixPQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRTRCLE9BQU8sRUFBRTtxQkFBQTtvQkFDckZDLE1BQU0sRUFBRTt3QkFDSkwsVUFBVSxFQUFFLGlCQUFpQjtxQkFDaEM7OEJBQ0F4QixDQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRUUsT0FBTyxNQUFLLEVBQUUsR0FBR0gsT0FBTyxHQUFHQyxXQUFXLENBQUNFLE9BQU87Ozs7O3dCQUN2RDs7Ozs7b0JBQ0Q7Ozs7OztZQUNQLENBQ1o7Q0FDSjtHQTdDZU4sTUFBTTs7UUFFRUYsOERBQWM7OztBQUZ0QkUsS0FBQUEsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4P2E2OTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQ29udGFpbmVyLCBCdXR0b24sIFRleHQsIEhTdGFjaywgSW1hZ2UgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuaW1wb3J0IFdhbGxldEljb24gZnJvbSAnQC9jb21wb25lbnRzL2ljb25zL3dhbGxldEljb24nXG5cbnR5cGUgUHJvcHMgPSB7XG4gICAgc2l0ZVRpdGxlOiBzdHJpbmdcbiAgICBjdGFUZXh0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcihwcm9wczogUHJvcHMpIHtcbiAgICBjb25zdCB7IHNpdGVUaXRsZSwgY3RhVGV4dCB9ID0gcHJvcHM7XG4gICAgY29uc3QgZXRoZXJzU3RhdGUgPSB1c2VFdGhlcnNTdGF0ZSgpXG5cbiAgICBjb25zdCBnZXRBY2NvdW50U2hvcnROYW1lID0gKGFjY291bnQ6IHthY2NvdW50OiBzdHJpbmd9KTogc3RyaW5nID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdDTElDS0lORyBBTkQgR0VUVElORyBBQ0NPVU5UIElEOicsIGFjY291bnQpXG4gICAgICAgIC8vIGNvbnN0IG1haW5DaGFycyA9IGFjY291bnQuc2xpY2UoMCwgMylcbiAgICAgICAgY29uc3QgYWNjb3VudFNob3J0TmFtZSA9IGBgO1xuICAgICAgICByZXR1cm4gYWNjb3VudFNob3J0TmFtZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1dIQVQgQUJPVVQgVEhJUzonLCBldGhlcnNTdGF0ZSlcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxIU3RhY2sgcGFkZGluZz0nMnJlbSAwJyBtYXJnaW49JzAgMCA0MHB4IDAnPlxuICAgICAgICAgICAgPEltYWdlIHNyYz0nL2ltZ3MvbG9nby5zdmcnIGJveFNpemU9JzIuNnJlbScgYWx0PSdKdXJpc2RpY3Rpb24gTG9nbycgbWFyZ2luUmlnaHQ9eycxMXB4J30gLz5cbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgbWFyZ2luSW5saW5lU3RhcnQ9JzAnXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg9e3sgYmFzZTogJzIyMXB4JyB9fVxuICAgICAgICAgICAgICAgIGZvbnRTaXplPXt7IGJhc2U6ICcxNXB4JyB9fVxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc9JzBweCdcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ249J2xlZnQnXG4gICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmJsYWNrJz5cbiAgICAgICAgICAgICAgICB7c2l0ZVRpdGxlfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPENvbnRhaW5lciBtYXhXaWR0aD17JzEwMCUnfSBwYWRkaW5nPScwJz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0PSdyaWdodCdcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT0nbWQnXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFdhbGxldEljb24gLz59XG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9JzE1cHgnXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ9JzIwcHgnXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ncmV5LmdyZXkwNCdcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZD0nYnJhbmQuamF2YScgdHlwZT1cImJ1dHRvblwiIHc9JzEyNXB4JyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfVxuICAgICAgICAgICAgICAgICAgICBfaG92ZXI9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiYnJhbmQuamF2YUhvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICB7ZXRoZXJzU3RhdGU/LmFjY291bnQgPT09IFwiXCIgPyBjdGFUZXh0IDogZXRoZXJzU3RhdGUuYWNjb3VudH1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L0hTdGFjaz5cbiAgICApXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiQnV0dG9uIiwiVGV4dCIsIkhTdGFjayIsIkltYWdlIiwidXNlRXRoZXJzU3RhdGUiLCJXYWxsZXRJY29uIiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJnZXRBY2NvdW50U2hvcnROYW1lIiwiYWNjb3VudCIsImNvbnNvbGUiLCJsb2ciLCJhY2NvdW50U2hvcnROYW1lIiwicGFkZGluZyIsIm1hcmdpbiIsInNyYyIsImJveFNpemUiLCJhbHQiLCJtYXJnaW5SaWdodCIsIm1hcmdpbklubGluZVN0YXJ0IiwibWF4V2lkdGgiLCJiYXNlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibGluZUhlaWdodCIsImxldHRlclNwYWNpbmciLCJ0ZXh0QWxpZ24iLCJjb2xvciIsImZsb2F0Iiwic2l6ZSIsInJpZ2h0SWNvbiIsImJhY2tncm91bmQiLCJ0eXBlIiwidyIsIm9uQ2xpY2siLCJjb25uZWN0IiwiX2hvdmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});