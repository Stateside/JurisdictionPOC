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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.HStack, {\n        boxShadow: \"md\",\n        padding: \"2rem 3rem\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 16,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                maxWidth: {\n                    base: \"358px\",\n                    md: \"600px\",\n                    lg: \"885px\",\n                    xl: \"1000px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 17,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Container, {\n                children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                    w: \"100%\",\n                    my: 4,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                        type: \"button\",\n                        w: \"100%\",\n                        onClick: function() {\n                            return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                        },\n                        children: ctaText\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 25\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 29,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 27,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 15,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUF3QztBQUNzQztBQUMxQjs7QUFPN0MsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTCxrRUFBYyxFQUFFO0lBRXBDLHFCQUNJLDhEQUFDRixvREFBTTtRQUFDUSxTQUFTLEVBQUMsSUFBSTtRQUFDQyxPQUFPLEVBQUMsV0FBVzs7MEJBQ3RDLDhEQUFDUixtREFBSztnQkFBQ1MsR0FBRyxFQUFDLGdCQUFnQjtnQkFBQ0MsT0FBTyxFQUFDLFFBQVE7Z0JBQUNDLEdBQUcsRUFBQyxtQkFBbUI7Ozs7O29CQUFFOzBCQUN0RSw4REFBQ2Isa0RBQUk7Z0JBQ0RjLFFBQVEsRUFBRTtvQkFBRUMsSUFBSSxFQUFFLE9BQU87b0JBQUVDLEVBQUUsRUFBRSxPQUFPO29CQUFFQyxFQUFFLEVBQUUsT0FBTztvQkFBRUMsRUFBRSxFQUFFLFFBQVE7aUJBQUU7Z0JBQ25FQyxRQUFRLEVBQUU7b0JBQUVKLElBQUksRUFBRSxNQUFNO2lCQUFFO2dCQUMxQkssVUFBVSxFQUFDLEtBQUs7Z0JBQ2hCQyxVQUFVLEVBQUMsTUFBTTtnQkFDakJDLGFBQWEsRUFBQyxLQUFLO2dCQUNuQkMsU0FBUyxFQUFDLE1BQU07Z0JBQ2hCQyxLQUFLLEVBQUMsYUFBYTswQkFDZGxCLFNBQVM7Ozs7O29CQUNYOzBCQUNQLDhEQUFDVCx1REFBUzswQkFDTFcsQ0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUVpQixPQUFPLE1BQUssRUFBRSxrQkFDeEIsOERBQUMzQixpREFBRztvQkFBQzRCLENBQUMsRUFBQyxNQUFNO29CQUFDQyxFQUFFLEVBQUUsQ0FBQzs4QkFDZiw0RUFBQzVCLG9EQUFNO3dCQUFDNkIsSUFBSSxFQUFDLFFBQVE7d0JBQUNGLENBQUMsRUFBQyxNQUFNO3dCQUFDRyxPQUFPLEVBQUU7NEJBQU1yQixPQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRXNCLE9BQU8sRUFBRTt5QkFBQTtrQ0FDL0R2QixPQUFPOzs7Ozs0QkFDSDs7Ozs7d0JBQ1A7Ozs7O29CQUNGOzs7Ozs7WUFDUCxDQUNaO0NBQ0o7R0EzQmVILE1BQU07O1FBRUVELDhEQUFjOzs7QUFGdEJDLEtBQUFBLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeD9hNjk2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENvbnRhaW5lciwgQm94LCBCdXR0b24sIFRleHQsIEhTdGFjaywgSW1hZ2UgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuXG50eXBlIFByb3BzID0ge1xuICAgIHNpdGVUaXRsZTogc3RyaW5nXG4gICAgY3RhVGV4dDogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXIocHJvcHM6IFByb3BzKSB7XG4gICAgY29uc3QgeyBzaXRlVGl0bGUsIGN0YVRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUoKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEhTdGFjayBib3hTaGFkb3c9J21kJyBwYWRkaW5nPScycmVtIDNyZW0nID5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9Jy9pbWdzL2xvZ28uc3ZnJyBib3hTaXplPScyLjZyZW0nIGFsdD0nSnVyaXNkaWN0aW9uIExvZ28nLz5cbiAgICAgICAgICAgIDxUZXh0IFxuICAgICAgICAgICAgICAgIG1heFdpZHRoPXt7IGJhc2U6IFwiMzU4cHhcIiwgbWQ6IFwiNjAwcHhcIiwgbGc6IFwiODg1cHhcIiwgeGw6IFwiMTAwMHB4XCIgfX1cbiAgICAgICAgICAgICAgICBmb250U2l6ZT17eyBiYXNlOiBcIjE1cHhcIiB9fVxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc9JzBweCdcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ249J2xlZnQnXG4gICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmJsYWNrJz5cbiAgICAgICAgICAgICAgICAgICAge3NpdGVUaXRsZX0gXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgIHtldGhlcnNTdGF0ZT8uYWNjb3VudCA9PT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgICAgICA8Qm94IHc9JzEwMCUnIG15PXs0fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJidXR0b25cIiB3PScxMDAlJyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y3RhVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L0JveD59XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgPC9IU3RhY2s+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbnRhaW5lciIsIkJveCIsIkJ1dHRvbiIsIlRleHQiLCJIU3RhY2siLCJJbWFnZSIsInVzZUV0aGVyc1N0YXRlIiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJib3hTaGFkb3ciLCJwYWRkaW5nIiwic3JjIiwiYm94U2l6ZSIsImFsdCIsIm1heFdpZHRoIiwiYmFzZSIsIm1kIiwibGciLCJ4bCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwidGV4dEFsaWduIiwiY29sb3IiLCJhY2NvdW50IiwidyIsIm15IiwidHlwZSIsIm9uQ2xpY2siLCJjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});