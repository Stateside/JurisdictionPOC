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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_wallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/wallet */ \"./src/components/icons/wallet.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"1rem 3rem\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"21px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 17,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 18,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                    w: \"100%\",\n                    my: 4,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                        rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_wallet__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                        fontWeight: \"700\",\n                        fontSize: \"15px\",\n                        lineHeight: \"20px\",\n                        background: \"brand.java\",\n                        type: \"button\",\n                        w: \"125px\",\n                        onClick: function() {\n                            return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                        },\n                        children: ctaText\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 25\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 29,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 16,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBeUI7QUFDcUQ7QUFDMUI7QUFDTjs7QUFPdkMsU0FBU1MsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTixrRUFBYyxFQUFFO0lBRXBDLHFCQUNJLDhEQUFDRixvREFBTTtRQUFDUyxPQUFPLEVBQUMsV0FBVzs7MEJBQ3ZCLDhEQUFDUixtREFBSztnQkFBQ1MsR0FBRyxFQUFDLGdCQUFnQjtnQkFBQ0MsT0FBTyxFQUFDLFFBQVE7Z0JBQUNDLEdBQUcsRUFBQyxtQkFBbUI7Z0JBQUNDLFdBQVcsRUFBRSxNQUFNOzs7OztvQkFBRzswQkFDM0YsOERBQUNkLGtEQUFJO2dCQUNEZSxpQkFBaUIsRUFBQyxHQUFHO2dCQUNyQkMsUUFBUSxFQUFFO29CQUFFQyxJQUFJLEVBQUUsT0FBTztpQkFBQztnQkFDMUJDLFFBQVEsRUFBRTtvQkFBRUQsSUFBSSxFQUFFLE1BQU07aUJBQUM7Z0JBQ3pCRSxVQUFVLEVBQUMsS0FBSztnQkFDaEJDLFVBQVUsRUFBQyxNQUFNO2dCQUNqQkMsYUFBYSxFQUFDLEtBQUs7Z0JBQ25CQyxTQUFTLEVBQUMsTUFBTTtnQkFDaEJDLEtBQUssRUFBQyxhQUFhOzBCQUNkaEIsU0FBUzs7Ozs7b0JBQ1g7MEJBQ1AsOERBQUNWLHVEQUFTOzBCQUNMWSxDQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRWUsT0FBTyxNQUFLLEVBQUUsa0JBQ3hCLDhEQUFDMUIsaURBQUc7b0JBQUMyQixDQUFDLEVBQUMsTUFBTTtvQkFBQ0MsRUFBRSxFQUFFLENBQUM7OEJBQ2YsNEVBQUMzQixvREFBTTt3QkFDSDRCLFNBQVMsZ0JBQUUsOERBQUN2QixnRUFBTSxvQ0FBRzt3QkFDckJlLFVBQVUsRUFBQyxLQUFLO3dCQUNoQkQsUUFBUSxFQUFDLE1BQU07d0JBQ2ZFLFVBQVUsRUFBQyxNQUFNO3dCQUNqQlEsVUFBVSxFQUFDLFlBQVk7d0JBQUNDLElBQUksRUFBQyxRQUFRO3dCQUFDSixDQUFDLEVBQUMsT0FBTzt3QkFBQ0ssT0FBTyxFQUFFOzRCQUFNckIsT0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUVzQixPQUFPLEVBQUU7eUJBQUE7a0NBQ3BGdkIsT0FBTzs7Ozs7NEJBQ0g7Ozs7O3dCQUNQOzs7OztvQkFDRjs7Ozs7O1lBQ1AsQ0FDWjtDQUNKO0dBakNlSCxNQUFNOztRQUVFRiw4REFBYzs7O0FBRnRCRSxLQUFBQSxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci50c3g/YTY5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDb250YWluZXIsIEJveCwgQnV0dG9uLCBUZXh0LCBIU3RhY2ssIEltYWdlIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCBXYWxsZXQgZnJvbSAnQC9jb21wb25lbnRzL2ljb25zL3dhbGxldCdcblxudHlwZSBQcm9wcyA9IHtcbiAgICBzaXRlVGl0bGU6IHN0cmluZ1xuICAgIGN0YVRleHQ6IHN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyKHByb3BzOiBQcm9wcykge1xuICAgIGNvbnN0IHsgc2l0ZVRpdGxlLCBjdGFUZXh0IH0gPSBwcm9wcztcbiAgICBjb25zdCBldGhlcnNTdGF0ZSA9IHVzZUV0aGVyc1N0YXRlKClcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxIU3RhY2sgcGFkZGluZz0nMXJlbSAzcmVtJyA+XG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPScvaW1ncy9sb2dvLnN2ZycgYm94U2l6ZT0nMi42cmVtJyBhbHQ9J0p1cmlzZGljdGlvbiBMb2dvJyBtYXJnaW5SaWdodD17JzIxcHgnfS8+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0PScwJ1xuICAgICAgICAgICAgICAgIG1heFdpZHRoPXt7IGJhc2U6ICcyMjFweCd9fVxuICAgICAgICAgICAgICAgIGZvbnRTaXplPXt7IGJhc2U6ICcxNXB4J319XG4gICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ9JzIwcHgnXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZz0nMHB4J1xuICAgICAgICAgICAgICAgIHRleHRBbGlnbj0nbGVmdCdcbiAgICAgICAgICAgICAgICBjb2xvcj0nYnJhbmQuYmxhY2snPlxuICAgICAgICAgICAgICAgICAgICB7c2l0ZVRpdGxlfSBcbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICAgICAge2V0aGVyc1N0YXRlPy5hY2NvdW50ID09PSBcIlwiICYmXG4gICAgICAgICAgICAgICAgICAgIDxCb3ggdz0nMTAwJScgbXk9ezR9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8V2FsbGV0IC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT0nMTVweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kPSdicmFuZC5qYXZhJyB0eXBlPVwiYnV0dG9uXCIgdz0nMTI1cHgnIG9uQ2xpY2s9eygpID0+IGV0aGVyc1N0YXRlPy5jb25uZWN0KCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjdGFUZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94Pn1cbiAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L0hTdGFjaz5cbiAgICApXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiQm94IiwiQnV0dG9uIiwiVGV4dCIsIkhTdGFjayIsIkltYWdlIiwidXNlRXRoZXJzU3RhdGUiLCJXYWxsZXQiLCJIZWFkZXIiLCJwcm9wcyIsInNpdGVUaXRsZSIsImN0YVRleHQiLCJldGhlcnNTdGF0ZSIsInBhZGRpbmciLCJzcmMiLCJib3hTaXplIiwiYWx0IiwibWFyZ2luUmlnaHQiLCJtYXJnaW5JbmxpbmVTdGFydCIsIm1heFdpZHRoIiwiYmFzZSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwidGV4dEFsaWduIiwiY29sb3IiLCJhY2NvdW50IiwidyIsIm15IiwicmlnaHRJY29uIiwiYmFja2dyb3VuZCIsInR5cGUiLCJvbkNsaWNrIiwiY29ubmVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});