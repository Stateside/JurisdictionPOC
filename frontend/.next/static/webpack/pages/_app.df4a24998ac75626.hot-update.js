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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.HStack, {\n        boxShadow: \"md\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Container, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {\n                        src: \"/imgs/logo.svg\",\n                        boxSize: \"2.6rem\",\n                        alt: \"Jurisdiction Logo\"\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                        lineNumber: 17,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                        fontSize: \"50px\",\n                        color: \"tomato\",\n                        children: [\n                            siteTitle,\n                            \" \"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                        lineNumber: 18,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 16,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Container, {\n                children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                    w: \"100%\",\n                    my: 4,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                        type: \"button\",\n                        w: \"100%\",\n                        onClick: function() {\n                            return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                        },\n                        children: ctaText\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                        lineNumber: 23,\n                        columnNumber: 25\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 20,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 15,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUF3QztBQUNzQztBQUMxQjs7QUFPN0MsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTCxrRUFBYyxFQUFFO0lBRXBDLHFCQUNJLDhEQUFDRixvREFBTTtRQUFDUSxTQUFTLEVBQUMsSUFBSTs7MEJBQ2xCLDhEQUFDWix1REFBUzs7a0NBQ04sOERBQUNLLG1EQUFLO3dCQUFDUSxHQUFHLEVBQUMsZ0JBQWdCO3dCQUFDQyxPQUFPLEVBQUMsUUFBUTt3QkFBQ0MsR0FBRyxFQUFDLG1CQUFtQjs7Ozs7NEJBQUU7a0NBQ3RFLDhEQUFDWixrREFBSTt3QkFBQ2EsUUFBUSxFQUFDLE1BQU07d0JBQUNDLEtBQUssRUFBQyxRQUFROzs0QkFBRVIsU0FBUzs0QkFBQyxHQUFDOzs7Ozs7NEJBQU87Ozs7OztvQkFDaEQ7MEJBQ1osOERBQUNULHVEQUFTOzBCQUNMVyxDQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRU8sT0FBTyxNQUFLLEVBQUUsa0JBQ3hCLDhEQUFDakIsaURBQUc7b0JBQUNrQixDQUFDLEVBQUMsTUFBTTtvQkFBQ0MsRUFBRSxFQUFFLENBQUM7OEJBQ2YsNEVBQUNsQixvREFBTTt3QkFBQ21CLElBQUksRUFBQyxRQUFRO3dCQUFDRixDQUFDLEVBQUMsTUFBTTt3QkFBQ0csT0FBTyxFQUFFOzRCQUFNWCxPQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRVksT0FBTyxFQUFFO3lCQUFBO2tDQUMvRGIsT0FBTzs7Ozs7NEJBQ0g7Ozs7O3dCQUNQOzs7OztvQkFDRjs7Ozs7O1lBQ1AsQ0FDWjtDQUNKO0dBcEJlSCxNQUFNOztRQUVFRCw4REFBYzs7O0FBRnRCQyxLQUFBQSxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci50c3g/YTY5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDb250YWluZXIsIEJveCwgQnV0dG9uLCBUZXh0LCBIU3RhY2ssIEltYWdlIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcblxudHlwZSBQcm9wcyA9IHtcbiAgICBzaXRlVGl0bGU6IHN0cmluZ1xuICAgIGN0YVRleHQ6IHN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyKHByb3BzOiBQcm9wcykge1xuICAgIGNvbnN0IHsgc2l0ZVRpdGxlLCBjdGFUZXh0IH0gPSBwcm9wcztcbiAgICBjb25zdCBldGhlcnNTdGF0ZSA9IHVzZUV0aGVyc1N0YXRlKClcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxIU3RhY2sgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9Jy9pbWdzL2xvZ28uc3ZnJyBib3hTaXplPScyLjZyZW0nIGFsdD0nSnVyaXNkaWN0aW9uIExvZ28nLz5cbiAgICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT0nNTBweCcgY29sb3I9J3RvbWF0byc+e3NpdGVUaXRsZX0gPC9UZXh0PlxuICAgICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgIHtldGhlcnNTdGF0ZT8uYWNjb3VudCA9PT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgICAgICA8Qm94IHc9JzEwMCUnIG15PXs0fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJidXR0b25cIiB3PScxMDAlJyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y3RhVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD59XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgPC9IU3RhY2s+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbnRhaW5lciIsIkJveCIsIkJ1dHRvbiIsIlRleHQiLCJIU3RhY2siLCJJbWFnZSIsInVzZUV0aGVyc1N0YXRlIiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJib3hTaGFkb3ciLCJzcmMiLCJib3hTaXplIiwiYWx0IiwiZm9udFNpemUiLCJjb2xvciIsImFjY291bnQiLCJ3IiwibXkiLCJ0eXBlIiwib25DbGljayIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});