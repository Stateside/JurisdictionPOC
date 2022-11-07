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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernanceToken */ \"./src/components/legacyDaoPoc/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadBox */ \"./src/components/legacyDaoPoc/ReadBox.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernorContract */ \"./src/components/legacyDaoPoc/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/legacyDaoPoc/NetworkInfo */ \"./src/components/legacyDaoPoc/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersProvider = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect)(function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersProvider,\n        showToast\n    ]);\n    console.log(\"BOOM\", _store_initial__WEBPACK_IMPORTED_MODULE_9__.homeLabels);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_9__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.VStack, {\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 53,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 11\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 12\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 67,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 81,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Home, \"PMOZxWPQYe6DeeI42I1veV8ZjDE=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDO3dCQUFFQyxDQUFDLEVBQUMsTUFBTTt3QkFBQ0MsV0FBVyxFQUFDLEtBQUs7d0JBQUNDLFlBQVksRUFBQyxJQUFJO3dCQUFDQyxTQUFTLEVBQUMsSUFBSTs7MENBQzNFLDhEQUFDNUMsdURBQU87Z0NBQUM2QyxFQUFFLEVBQUUsQ0FBQztnQ0FBR0MsUUFBUSxFQUFDLElBQUk7MENBQUMsbUJBQWlCOzs7OztxQ0FBVTswQ0FDMUQsOERBQUNuQyxxRkFBb0I7Z0NBQ25CUyxPQUFPLEVBQUVBLE9BQU87Z0NBQ2hCNEIsY0FBYyxFQUFFN0IsT0FBTztnQ0FDdkJLLEtBQUssRUFBRUMsU0FBUzs7Ozs7cUNBQ2hCOzs7Ozs7NkJBQ0UsR0FBQyxFQUFFOzs7Ozs7cUJBQ047O29CQUNSLENBQ0o7Q0FDRjtHQTdFS1QsSUFBSTs7UUFDZUgsOERBQWM7UUFDckJBLDhEQUFjO1FBQ2RBLDhEQUFjO1FBQ2RBLDhEQUFjO1FBRWhCUCx1REFBUTtRQWdCdEJRLCtEQUFrQjs7O0FBdEJkRSxLQUFBQSxJQUFJO0FBK0VWLCtEQUFlQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCB7IFZTdGFjaywgSGVhZGluZywgQm94fSBmcm9tIFwiQGNoYWtyYS11aS9sYXlvdXRcIlxuaW1wb3J0IHsgQWxlcnQsIEFsZXJ0RGVzY3JpcHRpb24sIEFsZXJ0SWNvbiwgQWxlcnRUaXRsZSwgdXNlVG9hc3QsIEFsZXJ0U3RhdHVzIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFja30gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhZEdvdmVybmFuY2VUb2tlbiBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL1JlYWRHb3Zlcm5hbmNlVG9rZW4nXG5pbXBvcnQgUmVhZEJveCBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL1JlYWRCb3gnXG5pbXBvcnQgUmVhZEdvdmVybm9yQ29udHJhY3QgZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkR292ZXJub3JDb250cmFjdCdcbmltcG9ydCBOZXR3b3JrSW5mbyBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL05ldHdvcmtJbmZvJ1xuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuaW1wb3J0IHsgdXNlRGVib3VuY2VkRWZmZWN0IH0gZnJvbSAnQC91dGlscy9kZWJvdW5jZSdcbmltcG9ydCB7IGhvbWVMYWJlbHMgfSBmcm9tICdAL3N0b3JlL2luaXRpYWwnXG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBldGhlcnNQcm92aWRlciA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5ldGhlcnNQcm92aWRlcilcbiAgY29uc3QgYWNjb3VudCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5hY2NvdW50KVxuICBjb25zdCBjaGFpbklkID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmNoYWluSWQpXG4gIGNvbnN0IHN0YXRlSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuc3RhdGVJZClcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpXG4gIGNvbnN0IHRvYXN0ID0gdXNlVG9hc3QoKVxuXG4gIGNvbnN0IHNob3dUb2FzdCA9IHVzZUNhbGxiYWNrKChkZXNjcmlwdGlvbjpzdHJpbmcsIHR5cGU6QWxlcnRTdGF0dXMgPSBcInN1Y2Nlc3NcIikgPT4ge1xuICAgIHRvYXN0KHtcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgIHN0YXR1czogdHlwZSxcbiAgICAgIGR1cmF0aW9uOiA0MDAwLFxuICAgICAgaXNDbG9zYWJsZTogdHJ1ZSxcbiAgICB9KVxuICB9LCBbdG9hc3RdKVxuXG4gIGNvbnN0IG9uQmxvY2tFdmVudCA9IChudW06bnVtYmVyKSA9PiB7XG4gICAgc2hvd1RvYXN0KFwiTmV3IEJsb2NrOiBcIiArIG51bSlcbiAgfVxuXG4gIC8vIERlYm91bmNlIGhhbmRsaW5nIGNoYW5nZXMgdG8gYWNjb3VudHMgYW5kIGJsb2NrY2hhaW5zXG4gIHVzZURlYm91bmNlZEVmZmVjdCgoKSA9PiB7XG4gICAgZXRoZXJzUHJvdmlkZXI/Lm9uKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCAoKSA9PiB7XG4gICAgZXRoZXJzUHJvdmlkZXI/Lm9mZihcImJsb2NrXCIsIG9uQmxvY2tFdmVudClcbiAgfSwgW3N0YXRlSWQsIGV0aGVyc1Byb3ZpZGVyLCBzaG93VG9hc3RdKVxuXG4gIGNvbnNvbGUubG9nKCdCT09NJywgaG9tZUxhYmVscyk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+e2hvbWVMYWJlbHMucGFnZVRpdGxlfTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxWU3RhY2s+XG4gICAgICAgIHtlcnJvciAmJiBcbiAgICAgICAgICA8QWxlcnQgc3RhdHVzPSdlcnJvcic+XG4gICAgICAgICAgICA8QWxlcnRJY29uIC8+XG4gICAgICAgICAgICA8QWxlcnRUaXRsZT5FcnJvciE8L0FsZXJ0VGl0bGU+XG4gICAgICAgICAgICA8QWxlcnREZXNjcmlwdGlvbj57ZXJyb3J9PC9BbGVydERlc2NyaXB0aW9uPlxuICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIH1cblxuICAgICAgICB7YWNjb3VudCBcbiAgICAgICAgICA/PEJveCAgbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSAgZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5OZXR3b3JrIEluZm88L0hlYWRpbmc+XG4gICAgICAgICAgICA8TmV0d29ya0luZm8gLz5cbiAgICAgICAgICA8L0JveD46XCJcIn1cblxuICAgICAgICB7YWNjb3VudCAgXG4gICAgICAgICAgPyA8Qm94ICBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+R292ZXJuYW5jZSBUb2tlbjwvSGVhZGluZz5cbiAgICAgICAgICAgICAgPFJlYWRHb3Zlcm5hbmNlVG9rZW4gXG4gICAgICAgICAgICAgICAgYWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgICB0b2FzdD17c2hvd1RvYXN0fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+OlwiXCJ9XG4gICAgICAgIHthY2NvdW50ICBcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnPkJveCBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgICAgPFJlYWRCb3hcbiAgICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQm94PjpcIlwifVxuICAgICAgICB7YWNjb3VudCAmJiBjaGFpbklkIFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCc+R292ZXJub3IgQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkR292ZXJub3JDb250cmFjdCBcbiAgICAgICAgICAgICAgICBjaGFpbklkPXtjaGFpbklkfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRBY2NvdW50PXthY2NvdW50fVxuICAgICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0JveD46XCJcIn1cbiAgICAgIDwvVlN0YWNrPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWUiXSwibmFtZXMiOlsiSGVhZCIsIlZTdGFjayIsIkhlYWRpbmciLCJCb3giLCJBbGVydCIsIkFsZXJ0RGVzY3JpcHRpb24iLCJBbGVydEljb24iLCJBbGVydFRpdGxlIiwidXNlVG9hc3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiUmVhZEdvdmVybmFuY2VUb2tlbiIsIlJlYWRCb3giLCJSZWFkR292ZXJub3JDb250cmFjdCIsIk5ldHdvcmtJbmZvIiwidXNlRXRoZXJzU3RhdGUiLCJ1c2VEZWJvdW5jZWRFZmZlY3QiLCJob21lTGFiZWxzIiwiSG9tZSIsImV0aGVyc1Byb3ZpZGVyIiwicyIsImFjY291bnQiLCJjaGFpbklkIiwic3RhdGVJZCIsImVycm9yIiwic2V0RXJyb3IiLCJ0b2FzdCIsInNob3dUb2FzdCIsImRlc2NyaXB0aW9uIiwidHlwZSIsInN0YXR1cyIsImR1cmF0aW9uIiwiaXNDbG9zYWJsZSIsIm9uQmxvY2tFdmVudCIsIm51bSIsIm9uIiwib2ZmIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwicGFnZVRpdGxlIiwibWIiLCJwIiwidyIsImJvcmRlcldpZHRoIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwibXkiLCJmb250U2l6ZSIsInRleHRBbGlnbiIsImN1cnJlbnRBY2NvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});