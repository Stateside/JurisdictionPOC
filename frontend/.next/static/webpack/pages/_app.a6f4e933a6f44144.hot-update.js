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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Header(props) {\n    _s();\n    var siteTitle = props.siteTitle, ctaText = props.ctaText;\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState)();\n    var getAccountShortName = function(account) {};\n    console.log(\"WHAT ABOUT THIS:\", ethersState);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {\n        padding: \"2rem 0\",\n        margin: \"0 0 40px 0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Image, {\n                src: \"/imgs/logo.svg\",\n                boxSize: \"2.6rem\",\n                alt: \"Jurisdiction Logo\",\n                marginRight: \"11px\"\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 22,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                marginInlineStart: \"0\",\n                maxWidth: {\n                    base: \"221px\"\n                },\n                fontSize: {\n                    base: \"15px\"\n                },\n                fontWeight: \"700\",\n                lineHeight: \"20px\",\n                letterSpacing: \"0px\",\n                textAlign: \"left\",\n                color: \"brand.black\",\n                children: siteTitle\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 23,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                maxWidth: \"100%\",\n                padding: \"0\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                    float: \"right\",\n                    size: \"md\",\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                    fontWeight: \"700\",\n                    fontSize: \"15px\",\n                    lineHeight: \"20px\",\n                    color: \"brand.grey.grey04\",\n                    background: \"brand.java\",\n                    type: \"button\",\n                    w: \"125px\",\n                    onClick: function() {\n                        return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                    },\n                    _hover: {\n                        background: \"brand.javaHover\"\n                    },\n                    children: (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" ? ctaText : ethersState.account\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                    lineNumber: 35,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n                lineNumber: 34,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/components/Header.tsx\",\n        lineNumber: 21,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"CId6E1Bt9VXSvziwR8bYfl/EBbI=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_2__.useEthersState\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBeUI7QUFDZ0Q7QUFDckI7QUFDRTs7QUFPL0MsU0FBU1EsTUFBTSxDQUFDQyxLQUFZLEVBQUU7O0lBQ2pDLElBQVFDLFNBQVMsR0FBY0QsS0FBSyxDQUE1QkMsU0FBUyxFQUFFQyxPQUFPLEdBQUtGLEtBQUssQ0FBakJFLE9BQU87SUFDMUIsSUFBTUMsV0FBVyxHQUFHTixrRUFBYyxFQUFFO0lBRXBDLElBQU1PLG1CQUFtQixHQUFHLFNBQUNDLE9BQTBCLEVBQUssRUFFM0Q7SUFDREMsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLEVBQUVKLFdBQVcsQ0FBQztJQUU1QyxxQkFDSSw4REFBQ1Isb0RBQU07UUFBQ2EsT0FBTyxFQUFDLFFBQVE7UUFBQ0MsTUFBTSxFQUFDLFlBQVk7OzBCQUN4Qyw4REFBQ2IsbURBQUs7Z0JBQUNjLEdBQUcsRUFBQyxnQkFBZ0I7Z0JBQUNDLE9BQU8sRUFBQyxRQUFRO2dCQUFDQyxHQUFHLEVBQUMsbUJBQW1CO2dCQUFDQyxXQUFXLEVBQUUsTUFBTTs7Ozs7b0JBQUk7MEJBQzVGLDhEQUFDbkIsa0RBQUk7Z0JBQ0RvQixpQkFBaUIsRUFBQyxHQUFHO2dCQUNyQkMsUUFBUSxFQUFFO29CQUFFQyxJQUFJLEVBQUUsT0FBTztpQkFBRTtnQkFDM0JDLFFBQVEsRUFBRTtvQkFBRUQsSUFBSSxFQUFFLE1BQU07aUJBQUU7Z0JBQzFCRSxVQUFVLEVBQUMsS0FBSztnQkFDaEJDLFVBQVUsRUFBQyxNQUFNO2dCQUNqQkMsYUFBYSxFQUFDLEtBQUs7Z0JBQ25CQyxTQUFTLEVBQUMsTUFBTTtnQkFDaEJDLEtBQUssRUFBQyxhQUFhOzBCQUNsQnJCLFNBQVM7Ozs7O29CQUNQOzBCQUNQLDhEQUFDVCx1REFBUztnQkFBQ3VCLFFBQVEsRUFBRSxNQUFNO2dCQUFFUCxPQUFPLEVBQUMsR0FBRzswQkFDcEMsNEVBQUNmLG9EQUFNO29CQUNIOEIsS0FBSyxFQUFDLE9BQU87b0JBQ2JDLElBQUksRUFBQyxJQUFJO29CQUNUQyxTQUFTLGdCQUFFLDhEQUFDM0Isb0VBQVUsb0NBQUc7b0JBQ3pCb0IsVUFBVSxFQUFDLEtBQUs7b0JBQ2hCRCxRQUFRLEVBQUMsTUFBTTtvQkFDZkUsVUFBVSxFQUFDLE1BQU07b0JBQ2pCRyxLQUFLLEVBQUMsbUJBQW1CO29CQUN6QkksVUFBVSxFQUFDLFlBQVk7b0JBQUNDLElBQUksRUFBQyxRQUFRO29CQUFDQyxDQUFDLEVBQUMsT0FBTztvQkFBQ0MsT0FBTyxFQUFFO3dCQUFNMUIsT0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUUyQixPQUFPLEVBQUU7cUJBQUE7b0JBQ3JGQyxNQUFNLEVBQUU7d0JBQ0pMLFVBQVUsRUFBRSxpQkFBaUI7cUJBQ2hDOzhCQUNBdkIsQ0FBQUEsV0FBVyxhQUFYQSxXQUFXLFdBQVMsR0FBcEJBLEtBQUFBLENBQW9CLEdBQXBCQSxXQUFXLENBQUVFLE9BQU8sTUFBSyxFQUFFLEdBQUdILE9BQU8sR0FBR0MsV0FBVyxDQUFDRSxPQUFPOzs7Ozt3QkFDdkQ7Ozs7O29CQUNEOzs7Ozs7WUFDUCxDQUNaO0NBQ0o7R0F6Q2VOLE1BQU07O1FBRUVGLDhEQUFjOzs7QUFGdEJFLEtBQUFBLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeD9hNjk2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENvbnRhaW5lciwgQnV0dG9uLCBUZXh0LCBIU3RhY2ssIEltYWdlIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCBXYWxsZXRJY29uIGZyb20gJ0AvY29tcG9uZW50cy9pY29ucy93YWxsZXRJY29uJ1xuXG50eXBlIFByb3BzID0ge1xuICAgIHNpdGVUaXRsZTogc3RyaW5nXG4gICAgY3RhVGV4dDogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXIocHJvcHM6IFByb3BzKSB7XG4gICAgY29uc3QgeyBzaXRlVGl0bGUsIGN0YVRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUoKVxuXG4gICAgY29uc3QgZ2V0QWNjb3VudFNob3J0TmFtZSA9IChhY2NvdW50OiB7YWNjb3VudDogc3RyaW5nfSkgPT4ge1xuXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdXSEFUIEFCT1VUIFRISVM6JywgZXRoZXJzU3RhdGUpXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8SFN0YWNrIHBhZGRpbmc9JzJyZW0gMCcgbWFyZ2luPScwIDAgNDBweCAwJz5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9Jy9pbWdzL2xvZ28uc3ZnJyBib3hTaXplPScyLjZyZW0nIGFsdD0nSnVyaXNkaWN0aW9uIExvZ28nIG1hcmdpblJpZ2h0PXsnMTFweCd9IC8+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0PScwJ1xuICAgICAgICAgICAgICAgIG1heFdpZHRoPXt7IGJhc2U6ICcyMjFweCcgfX1cbiAgICAgICAgICAgICAgICBmb250U2l6ZT17eyBiYXNlOiAnMTVweCcgfX1cbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0PSc3MDAnXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodD0nMjBweCdcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nPScwcHgnXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduPSdsZWZ0J1xuICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ibGFjayc+XG4gICAgICAgICAgICAgICAge3NpdGVUaXRsZX1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxDb250YWluZXIgbWF4V2lkdGg9eycxMDAlJ30gcGFkZGluZz0nMCc+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBmbG9hdD0ncmlnaHQnXG4gICAgICAgICAgICAgICAgICAgIHNpemU9J21kJ1xuICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxXYWxsZXRJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0PSc3MDAnXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPScxNXB4J1xuICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgICAgICBjb2xvcj0nYnJhbmQuZ3JleS5ncmV5MDQnXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9J2JyYW5kLmphdmEnIHR5cGU9XCJidXR0b25cIiB3PScxMjVweCcgb25DbGljaz17KCkgPT4gZXRoZXJzU3RhdGU/LmNvbm5lY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgX2hvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcImJyYW5kLmphdmFIb3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAge2V0aGVyc1N0YXRlPy5hY2NvdW50ID09PSBcIlwiID8gY3RhVGV4dCA6IGV0aGVyc1N0YXRlLmFjY291bnR9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgPC9IU3RhY2s+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIlRleHQiLCJIU3RhY2siLCJJbWFnZSIsInVzZUV0aGVyc1N0YXRlIiwiV2FsbGV0SWNvbiIsIkhlYWRlciIsInByb3BzIiwic2l0ZVRpdGxlIiwiY3RhVGV4dCIsImV0aGVyc1N0YXRlIiwiZ2V0QWNjb3VudFNob3J0TmFtZSIsImFjY291bnQiLCJjb25zb2xlIiwibG9nIiwicGFkZGluZyIsIm1hcmdpbiIsInNyYyIsImJveFNpemUiLCJhbHQiLCJtYXJnaW5SaWdodCIsIm1hcmdpbklubGluZVN0YXJ0IiwibWF4V2lkdGgiLCJiYXNlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibGluZUhlaWdodCIsImxldHRlclNwYWNpbmciLCJ0ZXh0QWxpZ24iLCJjb2xvciIsImZsb2F0Iiwic2l6ZSIsInJpZ2h0SWNvbiIsImJhY2tncm91bmQiLCJ0eXBlIiwidyIsIm9uQ2xpY2siLCJjb25uZWN0IiwiX2hvdmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Header.tsx\n");

/***/ })

});