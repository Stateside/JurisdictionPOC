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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ReadGovernanceToken */ \"./src/components/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_ReadBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ReadBox */ \"./src/components/ReadBox.tsx\");\n/* harmony import */ var _components_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ReadGovernorContract */ \"./src/components/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/NetworkInfo */ \"./src/components/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_store_initial__WEBPACK_IMPORTED_MODULE_9__);\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersProvider = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect)(function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersProvider,\n        showToast\n    ]);\n    console.log(\"BOOM\", (_store_initial__WEBPACK_IMPORTED_MODULE_9___default()));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: (_store_initial__WEBPACK_IMPORTED_MODULE_9___default().general.title)\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.VStack, {\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 53,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 11\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 12\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 67,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadBox__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 81,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Home, \"PMOZxWPQYe6DeeI42I1veV8ZjDE=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQzt3QkFBRUMsQ0FBQyxFQUFDLE1BQU07d0JBQUNDLFdBQVcsRUFBQyxLQUFLO3dCQUFDQyxZQUFZLEVBQUMsSUFBSTt3QkFBQ0MsU0FBUyxFQUFDLElBQUk7OzBDQUMzRSw4REFBQzVDLHVEQUFPO2dDQUFDNkMsRUFBRSxFQUFFLENBQUM7Z0NBQUdDLFFBQVEsRUFBQyxJQUFJOzBDQUFDLG1CQUFpQjs7Ozs7cUNBQVU7MENBQzFELDhEQUFDbkMsd0VBQW9CO2dDQUNuQlMsT0FBTyxFQUFFQSxPQUFPO2dDQUNoQjRCLGNBQWMsRUFBRTdCLE9BQU87Z0NBQ3ZCSyxLQUFLLEVBQUVDLFNBQVM7Ozs7O3FDQUNoQjs7Ozs7OzZCQUNFLEdBQUMsRUFBRTs7Ozs7O3FCQUNOOztvQkFDUixDQUNKO0NBQ0Y7R0E3RUtULElBQUk7O1FBQ2VILDhEQUFjO1FBQ3JCQSw4REFBYztRQUNkQSw4REFBYztRQUNkQSw4REFBYztRQUVoQlAsdURBQVE7UUFnQnRCUSwrREFBa0I7OztBQXRCZEUsS0FBQUEsSUFBSTtBQStFViwrREFBZUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyBWU3RhY2ssIEhlYWRpbmcsIEJveH0gZnJvbSBcIkBjaGFrcmEtdWkvbGF5b3V0XCJcbmltcG9ydCB7IEFsZXJ0LCBBbGVydERlc2NyaXB0aW9uLCBBbGVydEljb24sIEFsZXJ0VGl0bGUsIHVzZVRvYXN0LCBBbGVydFN0YXR1cyB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWRHb3Zlcm5hbmNlVG9rZW4gZnJvbSAnQC9jb21wb25lbnRzL1JlYWRHb3Zlcm5hbmNlVG9rZW4nXG5pbXBvcnQgUmVhZEJveCBmcm9tICdAL2NvbXBvbmVudHMvUmVhZEJveCdcbmltcG9ydCBSZWFkR292ZXJub3JDb250cmFjdCBmcm9tICdAL2NvbXBvbmVudHMvUmVhZEdvdmVybm9yQ29udHJhY3QnXG5pbXBvcnQgTmV0d29ya0luZm8gZnJvbSAnQC9jb21wb25lbnRzL05ldHdvcmtJbmZvJ1xuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuaW1wb3J0IHsgdXNlRGVib3VuY2VkRWZmZWN0IH0gZnJvbSAnQC91dGlscy9kZWJvdW5jZSdcbmltcG9ydCBzaXRlSW5pdGlhbCBmcm9tICdAL3N0b3JlL2luaXRpYWwnXG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBldGhlcnNQcm92aWRlciA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5ldGhlcnNQcm92aWRlcilcbiAgY29uc3QgYWNjb3VudCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5hY2NvdW50KVxuICBjb25zdCBjaGFpbklkID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmNoYWluSWQpXG4gIGNvbnN0IHN0YXRlSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuc3RhdGVJZClcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpXG4gIGNvbnN0IHRvYXN0ID0gdXNlVG9hc3QoKVxuXG4gIGNvbnN0IHNob3dUb2FzdCA9IHVzZUNhbGxiYWNrKChkZXNjcmlwdGlvbjpzdHJpbmcsIHR5cGU6QWxlcnRTdGF0dXMgPSBcInN1Y2Nlc3NcIikgPT4ge1xuICAgIHRvYXN0KHtcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgIHN0YXR1czogdHlwZSxcbiAgICAgIGR1cmF0aW9uOiA0MDAwLFxuICAgICAgaXNDbG9zYWJsZTogdHJ1ZSxcbiAgICB9KVxuICB9LCBbdG9hc3RdKVxuXG4gIGNvbnN0IG9uQmxvY2tFdmVudCA9IChudW06bnVtYmVyKSA9PiB7XG4gICAgc2hvd1RvYXN0KFwiTmV3IEJsb2NrOiBcIiArIG51bSlcbiAgfVxuXG4gIC8vIERlYm91bmNlIGhhbmRsaW5nIGNoYW5nZXMgdG8gYWNjb3VudHMgYW5kIGJsb2NrY2hhaW5zXG4gIHVzZURlYm91bmNlZEVmZmVjdCgoKSA9PiB7XG4gICAgZXRoZXJzUHJvdmlkZXI/Lm9uKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCAoKSA9PiB7XG4gICAgZXRoZXJzUHJvdmlkZXI/Lm9mZihcImJsb2NrXCIsIG9uQmxvY2tFdmVudClcbiAgfSwgW3N0YXRlSWQsIGV0aGVyc1Byb3ZpZGVyLCBzaG93VG9hc3RdKVxuXG4gIGNvbnNvbGUubG9nKCdCT09NJywgc2l0ZUluaXRpYWwpO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPntzaXRlSW5pdGlhbC5nZW5lcmFsLnRpdGxlfTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxWU3RhY2s+XG4gICAgICAgIHtlcnJvciAmJiBcbiAgICAgICAgICA8QWxlcnQgc3RhdHVzPSdlcnJvcic+XG4gICAgICAgICAgICA8QWxlcnRJY29uIC8+XG4gICAgICAgICAgICA8QWxlcnRUaXRsZT5FcnJvciE8L0FsZXJ0VGl0bGU+XG4gICAgICAgICAgICA8QWxlcnREZXNjcmlwdGlvbj57ZXJyb3J9PC9BbGVydERlc2NyaXB0aW9uPlxuICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIH1cblxuICAgICAgICB7YWNjb3VudCBcbiAgICAgICAgICA/PEJveCAgbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSAgZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5OZXR3b3JrIEluZm88L0hlYWRpbmc+XG4gICAgICAgICAgICA8TmV0d29ya0luZm8gLz5cbiAgICAgICAgICA8L0JveD46XCJcIn1cblxuICAgICAgICB7YWNjb3VudCAgXG4gICAgICAgICAgPyA8Qm94ICBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+R292ZXJuYW5jZSBUb2tlbjwvSGVhZGluZz5cbiAgICAgICAgICAgICAgPFJlYWRHb3Zlcm5hbmNlVG9rZW4gXG4gICAgICAgICAgICAgICAgYWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgICB0b2FzdD17c2hvd1RvYXN0fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+OlwiXCJ9XG4gICAgICAgIHthY2NvdW50ICBcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnPkJveCBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgPFJlYWRCb3hcbiAgICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQm94PjpcIlwifVxuICAgICAgICB7YWNjb3VudCAmJiBjaGFpbklkIFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCc+R292ZXJub3IgQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkR292ZXJub3JDb250cmFjdCBcbiAgICAgICAgICAgICAgICBjaGFpbklkPXtjaGFpbklkfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRBY2NvdW50PXthY2NvdW50fVxuICAgICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0JveD46XCJcIn1cbiAgICAgIDwvVlN0YWNrPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWUiXSwibmFtZXMiOlsiSGVhZCIsIlZTdGFjayIsIkhlYWRpbmciLCJCb3giLCJBbGVydCIsIkFsZXJ0RGVzY3JpcHRpb24iLCJBbGVydEljb24iLCJBbGVydFRpdGxlIiwidXNlVG9hc3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiUmVhZEdvdmVybmFuY2VUb2tlbiIsIlJlYWRCb3giLCJSZWFkR292ZXJub3JDb250cmFjdCIsIk5ldHdvcmtJbmZvIiwidXNlRXRoZXJzU3RhdGUiLCJ1c2VEZWJvdW5jZWRFZmZlY3QiLCJzaXRlSW5pdGlhbCIsIkhvbWUiLCJldGhlcnNQcm92aWRlciIsInMiLCJhY2NvdW50IiwiY2hhaW5JZCIsInN0YXRlSWQiLCJlcnJvciIsInNldEVycm9yIiwidG9hc3QiLCJzaG93VG9hc3QiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJzdGF0dXMiLCJkdXJhdGlvbiIsImlzQ2xvc2FibGUiLCJvbkJsb2NrRXZlbnQiLCJudW0iLCJvbiIsIm9mZiIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsImdlbmVyYWwiLCJtYiIsInAiLCJ3IiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJteSIsImZvbnRTaXplIiwidGV4dEFsaWduIiwiY3VycmVudEFjY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});