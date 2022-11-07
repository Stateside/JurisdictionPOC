"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_4__.useDebouncedEffect)(function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersState,\n        showToast\n    ]);\n    console.log(\"BOOM\", account === \"\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.VStack, {\n        width: \"100%\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_5__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.Flex, {\n                width: \"100%\",\n                margin: 0,\n                maxWidth: \"1140px\",\n                flexDirection: \"column\",\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.Heading, {\n                        whiteSpace: \"pre-line\",\n                        fontSize: \"80px\",\n                        fontWeight: \"400\",\n                        lineHeight: \"80px\",\n                        letterSpacing: \"0px\",\n                        textAlign: \"left\",\n                        my: 4,\n                        marginBottom: \"48px\",\n                        children: (0,_store_initial__WEBPACK_IMPORTED_MODULE_5__.getLabel)(account, _store_initial__WEBPACK_IMPORTED_MODULE_5__.homeLabels.mainTitle)\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"FupKFci31eWk5aWuDlcbK2zZiAA=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_4__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFDakJDLGFBQWEsRUFBQyxLQUFLO3dCQUNuQkMsU0FBUyxFQUFDLE1BQU07d0JBQ2hCQyxFQUFFLEVBQUUsQ0FBQzt3QkFDTEMsWUFBWSxFQUFDLE1BQU07a0NBQ2xCcEMsd0RBQVEsQ0FBQ0ssT0FBTyxFQUFFTixnRUFBb0IsQ0FBQzs7Ozs7NkJBQ2hDOzs7Ozs7cUJBK0NMOzs7Ozs7YUFDQSxDQUNWO0NBQ0Y7R0E1R0tFLElBQUk7O1FBQ1lKLDhEQUFjO1FBQ2xCQSw4REFBYztRQUNkQSw4REFBYztRQUNkQSw4REFBYztRQUVoQkgsc0RBQVE7UUFnQnRCSSwrREFBa0I7OztBQXRCZEcsS0FBQUEsSUFBSTtBQThHViwrREFBZUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyBWU3RhY2ssIEZsZXgsIEhlYWRpbmcsIEJveCB9IGZyb20gXCJAY2hha3JhLXVpL2xheW91dFwiXG5pbXBvcnQgeyBBbGVydCwgQWxlcnREZXNjcmlwdGlvbiwgQWxlcnRJY29uLCBBbGVydFRpdGxlLCB1c2VUb2FzdCwgQWxlcnRTdGF0dXMsIEJ1dHRvbiB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBXYWxsZXRJY29uIGZyb20gJ0AvY29tcG9uZW50cy9pY29ucy93YWxsZXRJY29uJyBcblxuaW1wb3J0IFJlYWRHb3Zlcm5hbmNlVG9rZW4gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkR292ZXJuYW5jZVRva2VuJ1xuaW1wb3J0IFJlYWRCb3ggZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkQm94J1xuaW1wb3J0IFJlYWRHb3Zlcm5vckNvbnRyYWN0IGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvUmVhZEdvdmVybm9yQ29udHJhY3QnXG5pbXBvcnQgTmV0d29ya0luZm8gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9OZXR3b3JrSW5mbydcblxuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuaW1wb3J0IHsgdXNlRGVib3VuY2VkRWZmZWN0IH0gZnJvbSAnQC91dGlscy9kZWJvdW5jZSdcbmltcG9ydCB7IGhvbWVMYWJlbHMsIGdldExhYmVsIH0gZnJvbSAnQC9zdG9yZS9pbml0aWFsJ1xuXG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBldGhlcnNTdGF0ZSA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5ldGhlcnNQcm92aWRlcilcbiAgY29uc3QgYWNjb3VudCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5hY2NvdW50KVxuICBjb25zdCBjaGFpbklkID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmNoYWluSWQpXG4gIGNvbnN0IHN0YXRlSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuc3RhdGVJZClcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpXG4gIGNvbnN0IHRvYXN0ID0gdXNlVG9hc3QoKVxuXG4gIGNvbnN0IHNob3dUb2FzdCA9IHVzZUNhbGxiYWNrKChkZXNjcmlwdGlvbjogc3RyaW5nLCB0eXBlOiBBbGVydFN0YXR1cyA9IFwic3VjY2Vzc1wiKSA9PiB7XG4gICAgdG9hc3Qoe1xuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgc3RhdHVzOiB0eXBlLFxuICAgICAgZHVyYXRpb246IDQwMDAsXG4gICAgICBpc0Nsb3NhYmxlOiB0cnVlLFxuICAgIH0pXG4gIH0sIFt0b2FzdF0pXG5cbiAgY29uc3Qgb25CbG9ja0V2ZW50ID0gKG51bTogbnVtYmVyKSA9PiB7XG4gICAgc2hvd1RvYXN0KFwiTmV3IEJsb2NrOiBcIiArIG51bSlcbiAgfVxuXG4gIC8vIERlYm91bmNlIGhhbmRsaW5nIGNoYW5nZXMgdG8gYWNjb3VudHMgYW5kIGJsb2NrY2hhaW5zXG4gIHVzZURlYm91bmNlZEVmZmVjdCgoKSA9PiB7XG4gICAgZXRoZXJzU3RhdGU/Lm9uKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCAoKSA9PiB7XG4gICAgZXRoZXJzU3RhdGU/Lm9mZihcImJsb2NrXCIsIG9uQmxvY2tFdmVudClcbiAgfSwgW3N0YXRlSWQsIGV0aGVyc1N0YXRlLCBzaG93VG9hc3RdKVxuXG4gIGNvbnNvbGUubG9nKCdCT09NJywgYWNjb3VudCA9PT0gJycpO1xuICByZXR1cm4gKFxuICAgIDxWU3RhY2sgd2lkdGg9JzEwMCUnID5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+e2hvbWVMYWJlbHMucGFnZVRpdGxlfTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxGbGV4XG4gICAgICAgIHdpZHRoPScxMDAlJ1xuICAgICAgICBtYXJnaW49ezB9XG4gICAgICAgIG1heFdpZHRoPScxMTQwcHgnXG4gICAgICAgIGZsZXhEaXJlY3Rpb249J2NvbHVtbidcbiAgICAgID5cbiAgICAgICAge2Vycm9yICYmXG4gICAgICAgICAgPEFsZXJ0IHN0YXR1cz0nZXJyb3InPlxuICAgICAgICAgICAgPEFsZXJ0SWNvbiAvPlxuICAgICAgICAgICAgPEFsZXJ0VGl0bGU+RXJyb3IhPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgPEFsZXJ0RGVzY3JpcHRpb24+e2Vycm9yfTwvQWxlcnREZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICB9XG4gICAgICAgIDxIZWFkaW5nXG4gICAgICAgICAgd2hpdGVTcGFjZT0ncHJlLWxpbmUnXG4gICAgICAgICAgZm9udFNpemU9JzgwcHgnXG4gICAgICAgICAgZm9udFdlaWdodD0nNDAwJ1xuICAgICAgICAgIGxpbmVIZWlnaHQ9JzgwcHgnXG4gICAgICAgICAgbGV0dGVyU3BhY2luZz0nMHB4J1xuICAgICAgICAgIHRleHRBbGlnbj0nbGVmdCdcbiAgICAgICAgICBteT17NH1cbiAgICAgICAgICBtYXJnaW5Cb3R0b209JzQ4cHgnPlxuICAgICAgICAgIHtnZXRMYWJlbChhY2NvdW50LCBob21lTGFiZWxzLm1haW5UaXRsZSl9XG4gICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAgey8qIHthY2NvdW50ID09PSAnJyAmJlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdD0ncmlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD0nMzIxcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxXYWxsZXRJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9JzE1cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmJsYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZD0nYnJhbmQuamF2YScgdHlwZT1cImJ1dHRvblwiIHc9JzIyNXB4JyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2hvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJicmFuZC5qYXZhSG92ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aG9tZUxhYmVscy5jdGFDb25uZWN0fVxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5OZXR3b3JrIEluZm88L0hlYWRpbmc+XG4gICAgICAgICAgICA8TmV0d29ya0luZm8gLz5cbiAgICAgICAgICA8L0JveD4gOiBcIlwifVxuXG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5Hb3Zlcm5hbmNlIFRva2VuPC9IZWFkaW5nPlxuICAgICAgICAgICAgPFJlYWRHb3Zlcm5hbmNlVG9rZW5cbiAgICAgICAgICAgICAgYWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cbiAgICAgICAge2FjY291bnRcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSBmb250U2l6ZT0neGwnPkJveCBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkQm94XG4gICAgICAgICAgICAgIGN1cnJlbnRBY2NvdW50PXthY2NvdW50fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD4gOiBcIlwifVxuICAgICAgICB7YWNjb3VudCAmJiBjaGFpbklkXG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJz5Hb3Zlcm5vciBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkR292ZXJub3JDb250cmFjdFxuICAgICAgICAgICAgICBjaGFpbklkPXtjaGFpbklkfVxuICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn0gKi99XG4gICAgICA8L0ZsZXg+XG4gICAgPC9WU3RhY2s+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZSJdLCJuYW1lcyI6WyJIZWFkIiwiVlN0YWNrIiwiRmxleCIsIkhlYWRpbmciLCJBbGVydCIsIkFsZXJ0RGVzY3JpcHRpb24iLCJBbGVydEljb24iLCJBbGVydFRpdGxlIiwidXNlVG9hc3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwidXNlRXRoZXJzU3RhdGUiLCJ1c2VEZWJvdW5jZWRFZmZlY3QiLCJob21lTGFiZWxzIiwiZ2V0TGFiZWwiLCJIb21lIiwiZXRoZXJzU3RhdGUiLCJzIiwiZXRoZXJzUHJvdmlkZXIiLCJhY2NvdW50IiwiY2hhaW5JZCIsInN0YXRlSWQiLCJlcnJvciIsInNldEVycm9yIiwidG9hc3QiLCJzaG93VG9hc3QiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJzdGF0dXMiLCJkdXJhdGlvbiIsImlzQ2xvc2FibGUiLCJvbkJsb2NrRXZlbnQiLCJudW0iLCJvbiIsIm9mZiIsImNvbnNvbGUiLCJsb2ciLCJ3aWR0aCIsInRpdGxlIiwicGFnZVRpdGxlIiwibWFyZ2luIiwibWF4V2lkdGgiLCJmbGV4RGlyZWN0aW9uIiwid2hpdGVTcGFjZSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwidGV4dEFsaWduIiwibXkiLCJtYXJnaW5Cb3R0b20iLCJtYWluVGl0bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});