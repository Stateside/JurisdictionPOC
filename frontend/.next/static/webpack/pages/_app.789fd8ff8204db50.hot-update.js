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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layout\": function() { return /* binding */ Layout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Header */ \"./src/components/Header.tsx\");\n/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Footer */ \"./src/components/Footer.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Layout(props) {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_4__.useEthersState)();\n    var title = _store_initial__WEBPACK_IMPORTED_MODULE_5__.siteLayoutData.title, ctaConnect = _store_initial__WEBPACK_IMPORTED_MODULE_5__.siteLayoutData.ctaConnect;\n    console.log(\"AQUI\", ethersState);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Box, {\n        minHeight: \"100vh\",\n        minWidth: \"100vw\",\n        backgroundImage: 'url(\"/imgs/jurisdictionBackgroundShapes.svg\")',\n        backgroundPosition: \"right\",\n        backgroundSize: \"68%\",\n        backgroundRepeat: \"no-repeat\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Container, {\n            position: \"relative\",\n            maxW: \"container.lg\",\n            py: \"8\",\n            minHeight: \"100vh\",\n            paddingTop: \"0\",\n            paddingBottom: 0,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_2__.Header, {\n                    siteTitle: title,\n                    ctaText: ctaConnect\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n                    lineNumber: 35,\n                    columnNumber: 9\n                }, this),\n                props.children,\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Footer__WEBPACK_IMPORTED_MODULE_3__.Footer, {}, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n                    lineNumber: 37,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Layout.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(Layout, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_4__.useEthersState\n    ];\n});\n_c = Layout;\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9MYXlvdXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUF3QztBQUNTO0FBQ0w7QUFDQTtBQUNRO0FBQ0o7O0FBTXpDLFNBQVNPLE1BQU0sQ0FBQ0MsS0FBWSxFQUFFOztJQUNuQyxJQUFNQyxXQUFXLEdBQUdKLGtFQUFjLEVBQUU7SUFDcEMsSUFBUUssS0FBSyxHQUFpQkosZ0VBQWpCLEVBQUVLLFVBQVUsR0FBS0wscUVBQUw7SUFDekJNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sRUFBRUosV0FBVyxDQUFDO0lBQ2hDLHFCQUNFLDhEQUFDUCxpREFBRztRQUNKWSxTQUFTLEVBQUMsT0FBTztRQUNqQkMsUUFBUSxFQUFDLE9BQU87UUFDaEJDLGVBQWUsRUFBQywrQ0FBK0M7UUFDM0RDLGtCQUFrQixFQUFDLE9BQU87UUFDMUJDLGNBQWMsRUFBQyxLQUFLO1FBQ3BCQyxnQkFBZ0IsRUFBQyxXQUFXO2tCQUk5Qiw0RUFBQ2xCLHVEQUFTO1lBQ1JtQixRQUFRLEVBQUMsVUFBVTtZQUNuQkMsSUFBSSxFQUFDLGNBQWM7WUFDbkJDLEVBQUUsRUFBQyxHQUFHO1lBQ05SLFNBQVMsRUFBRSxPQUFPO1lBQ2xCUyxVQUFVLEVBQUMsR0FBRztZQUNkQyxhQUFhLEVBQUUsQ0FBQzs7OEJBRWhCLDhEQUFDckIsc0RBQU07b0JBQUNzQixTQUFTLEVBQUVmLEtBQUs7b0JBQUVnQixPQUFPLEVBQUVmLFVBQVU7Ozs7O3dCQUFHO2dCQUMvQ0gsS0FBSyxDQUFDbUIsUUFBUTs4QkFDZiw4REFBQ3ZCLHNEQUFNOzs7O3dCQUFHOzs7Ozs7Z0JBQ0E7Ozs7O1lBQ1IsQ0FDUDtDQUNGO0dBN0JlRyxNQUFNOztRQUNBRiw4REFBYzs7O0FBRHBCRSxLQUFBQSxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0xheW91dC50c3g/ZGU4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IENvbnRhaW5lciwgQm94IH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcclxuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnQC9jb21wb25lbnRzL0hlYWRlcidcclxuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnQC9jb21wb25lbnRzL0Zvb3RlcidcclxuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xyXG5pbXBvcnQgeyBzaXRlTGF5b3V0RGF0YSB9IGZyb20gJ0Avc3RvcmUvaW5pdGlhbCdcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTGF5b3V0KHByb3BzOiBQcm9wcykge1xyXG4gIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUoKVxyXG4gIGNvbnN0IHsgdGl0bGUsIGN0YUNvbm5lY3QgfSA9IHNpdGVMYXlvdXREYXRhXHJcbiAgY29uc29sZS5sb2coJ0FRVUknLCBldGhlcnNTdGF0ZSlcclxuICByZXR1cm4gKFxyXG4gICAgPEJveFxyXG4gICAgbWluSGVpZ2h0PScxMDB2aCcgXHJcbiAgICBtaW5XaWR0aD0nMTAwdncnXHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U9J3VybChcIi9pbWdzL2p1cmlzZGljdGlvbkJhY2tncm91bmRTaGFwZXMuc3ZnXCIpJ1xyXG4gICAgICAgIGJhY2tncm91bmRQb3NpdGlvbj0ncmlnaHQnXHJcbiAgICAgICAgYmFja2dyb3VuZFNpemU9JzY4JSdcclxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0PSduby1yZXBlYXQnXHJcbiAgICA+XHJcblxyXG4gICAgXHJcbiAgICAgIDxDb250YWluZXIgXHJcbiAgICAgICAgcG9zaXRpb249J3JlbGF0aXZlJyBcclxuICAgICAgICBtYXhXPSdjb250YWluZXIubGcnIFxyXG4gICAgICAgIHB5PSc4JyBcclxuICAgICAgICBtaW5IZWlnaHQ9eycxMDB2aCd9IFxyXG4gICAgICAgIHBhZGRpbmdUb3A9JzAnIFxyXG4gICAgICAgIHBhZGRpbmdCb3R0b209ezB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgIDxIZWFkZXIgc2l0ZVRpdGxlPXt0aXRsZX0gY3RhVGV4dD17Y3RhQ29ubmVjdH0vPlxyXG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8Rm9vdGVyIC8+XHJcbiAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgPC9Cb3g+XHJcbiAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29udGFpbmVyIiwiQm94IiwiSGVhZGVyIiwiRm9vdGVyIiwidXNlRXRoZXJzU3RhdGUiLCJzaXRlTGF5b3V0RGF0YSIsIkxheW91dCIsInByb3BzIiwiZXRoZXJzU3RhdGUiLCJ0aXRsZSIsImN0YUNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwibWluSGVpZ2h0IiwibWluV2lkdGgiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRSZXBlYXQiLCJwb3NpdGlvbiIsIm1heFciLCJweSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwic2l0ZVRpdGxlIiwiY3RhVGV4dCIsImNoaWxkcmVuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Layout.tsx\n");

/***/ })

});