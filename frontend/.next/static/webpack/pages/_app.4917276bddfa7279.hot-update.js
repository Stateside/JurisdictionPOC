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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    var getAccountShortName = function(account) {\n        var mainChars = account.slice(0, 3);\n    };\n    console.log(\"WHAT ABOUT THIS:\", ethersState);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"2rem 0\",\n        margin: \"0 0 40px 0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"11px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 23,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 24,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxWidth: \"100%\",\n                padding: \"0\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                    float: \"right\",\n                    size: \"md\",\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                    fontWeight: \"700\",\n                    fontSize: \"15px\",\n                    lineHeight: \"20px\",\n                    color: \"brand.grey.grey04\",\n                    background: \"brand.java\",\n                    type: \"button\",\n                    w: \"125px\",\n                    onClick: function() {\n                        return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                    },\n                    _hover: {\n                        background: \"brand.javaHover\"\n                    },\n                    children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" ? ctaText : ethersState.account\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 36,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 35,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 22,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBeUI7QUFDZ0Q7QUFDckI7QUFDRTs7QUFPL0MsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTixrRUFBYyxFQUFFO0lBRXBDLElBQU1PLG1CQUFtQixHQUFHLFNBQUNDLE9BQTBCLEVBQUs7UUFFeEQsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUNFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0RDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixFQUFFTixXQUFXLENBQUM7SUFFNUMscUJBQ0ksOERBQUNSLG9EQUFNO1FBQUNlLE9BQU8sRUFBQyxRQUFRO1FBQUNDLE1BQU0sRUFBQyxZQUFZOzswQkFDeEMsOERBQUNmLG1EQUFLO2dCQUFDZ0IsR0FBRyxFQUFDLGdCQUFnQjtnQkFBQ0MsT0FBTyxFQUFDLFFBQVE7Z0JBQUNDLEdBQUcsRUFBQyxtQkFBbUI7Z0JBQUNDLFdBQVcsRUFBRSxNQUFNOzs7OztvQkFBSTswQkFDNUYsOERBQUNyQixrREFBSTtnQkFDRHNCLGlCQUFpQixFQUFDLEdBQUc7Z0JBQ3JCQyxRQUFRLEVBQUU7b0JBQUVDLElBQUksRUFBRSxPQUFPO2lCQUFFO2dCQUMzQkMsUUFBUSxFQUFFO29CQUFFRCxJQUFJLEVBQUUsTUFBTTtpQkFBRTtnQkFDMUJFLFVBQVUsRUFBQyxLQUFLO2dCQUNoQkMsVUFBVSxFQUFDLE1BQU07Z0JBQ2pCQyxhQUFhLEVBQUMsS0FBSztnQkFDbkJDLFNBQVMsRUFBQyxNQUFNO2dCQUNoQkMsS0FBSyxFQUFDLGFBQWE7MEJBQ2xCdkIsU0FBUzs7Ozs7b0JBQ1A7MEJBQ1AsOERBQUNULHVEQUFTO2dCQUFDeUIsUUFBUSxFQUFFLE1BQU07Z0JBQUVQLE9BQU8sRUFBQyxHQUFHOzBCQUNwQyw0RUFBQ2pCLG9EQUFNO29CQUNIZ0MsS0FBSyxFQUFDLE9BQU87b0JBQ2JDLElBQUksRUFBQyxJQUFJO29CQUNUQyxTQUFTLGdCQUFFLDhEQUFDN0Isb0VBQVUsb0NBQUc7b0JBQ3pCc0IsVUFBVSxFQUFDLEtBQUs7b0JBQ2hCRCxRQUFRLEVBQUMsTUFBTTtvQkFDZkUsVUFBVSxFQUFDLE1BQU07b0JBQ2pCRyxLQUFLLEVBQUMsbUJBQW1CO29CQUN6QkksVUFBVSxFQUFDLFlBQVk7b0JBQUNDLElBQUksRUFBQyxRQUFRO29CQUFDQyxDQUFDLEVBQUMsT0FBTztvQkFBQ0MsT0FBTyxFQUFFO3dCQUFNNUIsT0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUU2QixPQUFPLEVBQUU7cUJBQUE7b0JBQ3JGQyxNQUFNLEVBQUU7d0JBQ0pMLFVBQVUsRUFBRSxpQkFBaUI7cUJBQ2hDOzhCQUNBekIsQ0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUVFLE9BQU8sTUFBSyxFQUFFLEdBQUdILE9BQU8sR0FBR0MsV0FBVyxDQUFDRSxPQUFPOzs7Ozt3QkFDdkQ7Ozs7O29CQUNEOzs7Ozs7WUFDUCxDQUNaO0NBQ0o7R0ExQ2VOLE1BQU07O1FBRUVGLDhEQUFjOzs7QUFGdEJFLEtBQUFBLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeD9hNjk2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENvbnRhaW5lciwgQnV0dG9uLCBUZXh0LCBIU3RhY2ssIEltYWdlIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCBXYWxsZXRJY29uIGZyb20gJ0AvY29tcG9uZW50cy9pY29ucy93YWxsZXRJY29uJ1xuXG50eXBlIFByb3BzID0ge1xuICAgIHNpdGVUaXRsZTogc3RyaW5nXG4gICAgY3RhVGV4dDogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXIocHJvcHM6IFByb3BzKSB7XG4gICAgY29uc3QgeyBzaXRlVGl0bGUsIGN0YVRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUoKVxuXG4gICAgY29uc3QgZ2V0QWNjb3VudFNob3J0TmFtZSA9IChhY2NvdW50OiB7YWNjb3VudDogb2JqZWN0fSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1haW5DaGFycyA9IGFjY291bnQuc2xpY2UoMCwgMylcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1dIQVQgQUJPVVQgVEhJUzonLCBldGhlcnNTdGF0ZSlcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxIU3RhY2sgcGFkZGluZz0nMnJlbSAwJyBtYXJnaW49JzAgMCA0MHB4IDAnPlxuICAgICAgICAgICAgPEltYWdlIHNyYz0nL2ltZ3MvbG9nby5zdmcnIGJveFNpemU9JzIuNnJlbScgYWx0PSdKdXJpc2RpY3Rpb24gTG9nbycgbWFyZ2luUmlnaHQ9eycxMXB4J30gLz5cbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgbWFyZ2luSW5saW5lU3RhcnQ9JzAnXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg9e3sgYmFzZTogJzIyMXB4JyB9fVxuICAgICAgICAgICAgICAgIGZvbnRTaXplPXt7IGJhc2U6ICcxNXB4JyB9fVxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc9JzBweCdcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ249J2xlZnQnXG4gICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmJsYWNrJz5cbiAgICAgICAgICAgICAgICB7c2l0ZVRpdGxlfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPENvbnRhaW5lciBtYXhXaWR0aD17JzEwMCUnfSBwYWRkaW5nPScwJz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0PSdyaWdodCdcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT0nbWQnXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFdhbGxldEljb24gLz59XG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9JzE1cHgnXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ9JzIwcHgnXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ncmV5LmdyZXkwNCdcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZD0nYnJhbmQuamF2YScgdHlwZT1cImJ1dHRvblwiIHc9JzEyNXB4JyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfVxuICAgICAgICAgICAgICAgICAgICBfaG92ZXI9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiYnJhbmQuamF2YUhvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICB7ZXRoZXJzU3RhdGU/LmFjY291bnQgPT09IFwiXCIgPyBjdGFUZXh0IDogZXRoZXJzU3RhdGUuYWNjb3VudH1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L0hTdGFjaz5cbiAgICApXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiQnV0dG9uIiwiVGV4dCIsIkhTdGFjayIsIkltYWdlIiwidXNlRXRoZXJzU3RhdGUiLCJXYWxsZXRJY29uIiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJnZXRBY2NvdW50U2hvcnROYW1lIiwiYWNjb3VudCIsIm1haW5DaGFycyIsInNsaWNlIiwiY29uc29sZSIsImxvZyIsInBhZGRpbmciLCJtYXJnaW4iLCJzcmMiLCJib3hTaXplIiwiYWx0IiwibWFyZ2luUmlnaHQiLCJtYXJnaW5JbmxpbmVTdGFydCIsIm1heFdpZHRoIiwiYmFzZSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwidGV4dEFsaWduIiwiY29sb3IiLCJmbG9hdCIsInNpemUiLCJyaWdodEljb24iLCJiYWNrZ3JvdW5kIiwidHlwZSIsInciLCJvbkNsaWNrIiwiY29ubmVjdCIsIl9ob3ZlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});