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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_wallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/wallet */ \"./src/components/icons/wallet.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"2rem 0\",\n        margin: \"0 0 40px 0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"11px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 17,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 18,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxWidth: \"100%\",\n                padding: \"0\",\n                children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                    float: \"right\",\n                    size: \"md\",\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_wallet__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                    fontWeight: \"700\",\n                    fontSize: \"15px\",\n                    lineHeight: \"20px\",\n                    background: \"brand.java\",\n                    type: \"button\",\n                    w: \"125px\",\n                    onClick: function() {\n                        return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                    },\n                    _hover: {\n                        background: \"brand.javaHover\",\n                        color: \"teal.500\"\n                    },\n                    children: ctaText\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 29,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 16,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBeUI7QUFDZ0Q7QUFDckI7QUFDTjs7QUFPdkMsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTixrRUFBYyxFQUFFO0lBRXBDLHFCQUNJLDhEQUFDRixvREFBTTtRQUFDUyxPQUFPLEVBQUMsUUFBUTtRQUFDQyxNQUFNLEVBQUMsWUFBWTs7MEJBQ3hDLDhEQUFDVCxtREFBSztnQkFBQ1UsR0FBRyxFQUFDLGdCQUFnQjtnQkFBQ0MsT0FBTyxFQUFDLFFBQVE7Z0JBQUNDLEdBQUcsRUFBQyxtQkFBbUI7Z0JBQUNDLFdBQVcsRUFBRSxNQUFNOzs7OztvQkFBSTswQkFDNUYsOERBQUNmLGtEQUFJO2dCQUNEZ0IsaUJBQWlCLEVBQUMsR0FBRztnQkFDckJDLFFBQVEsRUFBRTtvQkFBRUMsSUFBSSxFQUFFLE9BQU87aUJBQUU7Z0JBQzNCQyxRQUFRLEVBQUU7b0JBQUVELElBQUksRUFBRSxNQUFNO2lCQUFFO2dCQUMxQkUsVUFBVSxFQUFDLEtBQUs7Z0JBQ2hCQyxVQUFVLEVBQUMsTUFBTTtnQkFDakJDLGFBQWEsRUFBQyxLQUFLO2dCQUNuQkMsU0FBUyxFQUFDLE1BQU07Z0JBQ2hCQyxLQUFLLEVBQUMsYUFBYTswQkFDbEJqQixTQUFTOzs7OztvQkFDUDswQkFDUCw4REFBQ1QsdURBQVM7Z0JBQUNtQixRQUFRLEVBQUUsTUFBTTtnQkFBRVAsT0FBTyxFQUFDLEdBQUc7MEJBQ25DRCxDQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRWdCLE9BQU8sTUFBSyxFQUFFLGtCQUN4Qiw4REFBQzFCLG9EQUFNO29CQUNIMkIsS0FBSyxFQUFDLE9BQU87b0JBQ2JDLElBQUksRUFBQyxJQUFJO29CQUNUQyxTQUFTLGdCQUFFLDhEQUFDeEIsZ0VBQU0sb0NBQUc7b0JBQ3JCZ0IsVUFBVSxFQUFDLEtBQUs7b0JBQ2hCRCxRQUFRLEVBQUMsTUFBTTtvQkFDZkUsVUFBVSxFQUFDLE1BQU07b0JBQ2pCUSxVQUFVLEVBQUMsWUFBWTtvQkFBQ0MsSUFBSSxFQUFDLFFBQVE7b0JBQUNDLENBQUMsRUFBQyxPQUFPO29CQUFDQyxPQUFPLEVBQUU7d0JBQU12QixPQUFBQSxXQUFXLGFBQVhBLFdBQVcsV0FBUyxHQUFwQkEsS0FBQUEsQ0FBb0IsR0FBcEJBLFdBQVcsQ0FBRXdCLE9BQU8sRUFBRTtxQkFBQTtvQkFDckZDLE1BQU0sRUFBRTt3QkFDSkwsVUFBVSxFQUFFLGlCQUFpQjt3QkFDN0JMLEtBQUssRUFBRSxVQUFVO3FCQUNsQjs4QkFDRmhCLE9BQU87Ozs7O3dCQUNIOzs7OztvQkFFTDs7Ozs7O1lBQ1AsQ0FDWjtDQUNKO0dBdENlSCxNQUFNOztRQUVFRiw4REFBYzs7O0FBRnRCRSxLQUFBQSxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci50c3g/YTY5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDb250YWluZXIsIEJ1dHRvbiwgVGV4dCwgSFN0YWNrLCBJbWFnZSB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VFdGhlcnNTdGF0ZSB9IGZyb20gJ0Avc3RvcmUvQWNjb3VudERhdGEnXG5pbXBvcnQgV2FsbGV0IGZyb20gJ0AvY29tcG9uZW50cy9pY29ucy93YWxsZXQnXG5cbnR5cGUgUHJvcHMgPSB7XG4gICAgc2l0ZVRpdGxlOiBzdHJpbmdcbiAgICBjdGFUZXh0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcihwcm9wczogUHJvcHMpIHtcbiAgICBjb25zdCB7IHNpdGVUaXRsZSwgY3RhVGV4dCB9ID0gcHJvcHM7XG4gICAgY29uc3QgZXRoZXJzU3RhdGUgPSB1c2VFdGhlcnNTdGF0ZSgpXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8SFN0YWNrIHBhZGRpbmc9JzJyZW0gMCcgbWFyZ2luPScwIDAgNDBweCAwJz5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9Jy9pbWdzL2xvZ28uc3ZnJyBib3hTaXplPScyLjZyZW0nIGFsdD0nSnVyaXNkaWN0aW9uIExvZ28nIG1hcmdpblJpZ2h0PXsnMTFweCd9IC8+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0PScwJ1xuICAgICAgICAgICAgICAgIG1heFdpZHRoPXt7IGJhc2U6ICcyMjFweCcgfX1cbiAgICAgICAgICAgICAgICBmb250U2l6ZT17eyBiYXNlOiAnMTVweCcgfX1cbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0PSc3MDAnXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodD0nMjBweCdcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nPScwcHgnXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduPSdsZWZ0J1xuICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ibGFjayc+XG4gICAgICAgICAgICAgICAge3NpdGVUaXRsZX1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxDb250YWluZXIgbWF4V2lkdGg9eycxMDAlJ30gcGFkZGluZz0nMCc+XG4gICAgICAgICAgICAgICAge2V0aGVyc1N0YXRlPy5hY2NvdW50ID09PSBcIlwiICYmXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0PSdyaWdodCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9J21kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8V2FsbGV0IC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9JzE1cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZD0nYnJhbmQuamF2YScgdHlwZT1cImJ1dHRvblwiIHc9JzEyNXB4JyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2hvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJicmFuZC5qYXZhSG92ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ0ZWFsLjUwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjdGFUZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgPC9IU3RhY2s+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIlRleHQiLCJIU3RhY2siLCJJbWFnZSIsInVzZUV0aGVyc1N0YXRlIiwiV2FsbGV0IiwiSGVhZGVyIiwicHJvcHMiLCJzaXRlVGl0bGUiLCJjdGFUZXh0IiwiZXRoZXJzU3RhdGUiLCJwYWRkaW5nIiwibWFyZ2luIiwic3JjIiwiYm94U2l6ZSIsImFsdCIsIm1hcmdpblJpZ2h0IiwibWFyZ2luSW5saW5lU3RhcnQiLCJtYXhXaWR0aCIsImJhc2UiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibGV0dGVyU3BhY2luZyIsInRleHRBbGlnbiIsImNvbG9yIiwiYWNjb3VudCIsImZsb2F0Iiwic2l6ZSIsInJpZ2h0SWNvbiIsImJhY2tncm91bmQiLCJ0eXBlIiwidyIsIm9uQ2xpY2siLCJjb25uZWN0IiwiX2hvdmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});