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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ReadGovernanceToken */ \"./src/components/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_ReadBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ReadBox */ \"./src/components/ReadBox.tsx\");\n/* harmony import */ var _components_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ReadGovernorContract */ \"./src/components/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/NetworkInfo */ \"./src/components/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_store_initial__WEBPACK_IMPORTED_MODULE_9__);\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersProvider = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect)(function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersProvider,\n        showToast\n    ]);\n    console.log(\"BOOM\", _store_initial__WEBPACK_IMPORTED_MODULE_9__.siteInitial);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Stateside Governance DAPP Home Page\"\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.VStack, {\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 53,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 11\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 12\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 67,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadBox__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 81,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Home, \"PMOZxWPQYe6DeeI42I1veV8ZjDE=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUM7d0JBQUVDLENBQUMsRUFBQyxNQUFNO3dCQUFDQyxXQUFXLEVBQUMsS0FBSzt3QkFBQ0MsWUFBWSxFQUFDLElBQUk7d0JBQUNDLFNBQVMsRUFBQyxJQUFJOzswQ0FDM0UsOERBQUMzQyx1REFBTztnQ0FBQzRDLEVBQUUsRUFBRSxDQUFDO2dDQUFHQyxRQUFRLEVBQUMsSUFBSTswQ0FBQyxtQkFBaUI7Ozs7O3FDQUFVOzBDQUMxRCw4REFBQ2xDLHdFQUFvQjtnQ0FDbkJTLE9BQU8sRUFBRUEsT0FBTztnQ0FDaEIyQixjQUFjLEVBQUU1QixPQUFPO2dDQUN2QkssS0FBSyxFQUFFQyxTQUFTOzs7OztxQ0FDaEI7Ozs7Ozs2QkFDRSxHQUFDLEVBQUU7Ozs7OztxQkFDTjs7b0JBQ1IsQ0FDSjtDQUNGO0dBN0VLVCxJQUFJOztRQUNlSCw4REFBYztRQUNyQkEsOERBQWM7UUFDZEEsOERBQWM7UUFDZEEsOERBQWM7UUFFaEJQLHVEQUFRO1FBZ0J0QlEsK0RBQWtCOzs7QUF0QmRFLEtBQUFBLElBQUk7QUErRVYsK0RBQWVBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2luZGV4LnRzeD8xOWEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgVlN0YWNrLCBIZWFkaW5nLCBCb3h9IGZyb20gXCJAY2hha3JhLXVpL2xheW91dFwiXG5pbXBvcnQgeyBBbGVydCwgQWxlcnREZXNjcmlwdGlvbiwgQWxlcnRJY29uLCBBbGVydFRpdGxlLCB1c2VUb2FzdCwgQWxlcnRTdGF0dXMgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFkR292ZXJuYW5jZVRva2VuIGZyb20gJ0AvY29tcG9uZW50cy9SZWFkR292ZXJuYW5jZVRva2VuJ1xuaW1wb3J0IFJlYWRCb3ggZnJvbSAnQC9jb21wb25lbnRzL1JlYWRCb3gnXG5pbXBvcnQgUmVhZEdvdmVybm9yQ29udHJhY3QgZnJvbSAnQC9jb21wb25lbnRzL1JlYWRHb3Zlcm5vckNvbnRyYWN0J1xuaW1wb3J0IE5ldHdvcmtJbmZvIGZyb20gJ0AvY29tcG9uZW50cy9OZXR3b3JrSW5mbydcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCB7IHVzZURlYm91bmNlZEVmZmVjdCB9IGZyb20gJ0AvdXRpbHMvZGVib3VuY2UnXG5pbXBvcnQgeyBzaXRlSW5pdGlhbCB9IGZyb20gJ0Avc3RvcmUvaW5pdGlhbCdcblxuY29uc3QgSG9tZTogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IGV0aGVyc1Byb3ZpZGVyID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmV0aGVyc1Byb3ZpZGVyKVxuICBjb25zdCBhY2NvdW50ID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmFjY291bnQpXG4gIGNvbnN0IGNoYWluSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuY2hhaW5JZClcbiAgY29uc3Qgc3RhdGVJZCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5zdGF0ZUlkKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIilcbiAgY29uc3QgdG9hc3QgPSB1c2VUb2FzdCgpXG5cbiAgY29uc3Qgc2hvd1RvYXN0ID0gdXNlQ2FsbGJhY2soKGRlc2NyaXB0aW9uOnN0cmluZywgdHlwZTpBbGVydFN0YXR1cyA9IFwic3VjY2Vzc1wiKSA9PiB7XG4gICAgdG9hc3Qoe1xuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgc3RhdHVzOiB0eXBlLFxuICAgICAgZHVyYXRpb246IDQwMDAsXG4gICAgICBpc0Nsb3NhYmxlOiB0cnVlLFxuICAgIH0pXG4gIH0sIFt0b2FzdF0pXG5cbiAgY29uc3Qgb25CbG9ja0V2ZW50ID0gKG51bTpudW1iZXIpID0+IHtcbiAgICBzaG93VG9hc3QoXCJOZXcgQmxvY2s6IFwiICsgbnVtKVxuICB9XG5cbiAgLy8gRGVib3VuY2UgaGFuZGxpbmcgY2hhbmdlcyB0byBhY2NvdW50cyBhbmQgYmxvY2tjaGFpbnNcbiAgdXNlRGVib3VuY2VkRWZmZWN0KCgpID0+IHtcbiAgICBldGhlcnNQcm92aWRlcj8ub24oXCJibG9ja1wiLCBvbkJsb2NrRXZlbnQpXG4gIH0sICgpID0+IHtcbiAgICBldGhlcnNQcm92aWRlcj8ub2ZmKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCBbc3RhdGVJZCwgZXRoZXJzUHJvdmlkZXIsIHNob3dUb2FzdF0pXG5cbiAgY29uc29sZS5sb2coJ0JPT00nLCBzaXRlSW5pdGlhbCk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+U3RhdGVzaWRlIEdvdmVybmFuY2UgREFQUCBIb21lIFBhZ2U8L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8VlN0YWNrPlxuICAgICAgICB7ZXJyb3IgJiYgXG4gICAgICAgICAgPEFsZXJ0IHN0YXR1cz0nZXJyb3InPlxuICAgICAgICAgICAgPEFsZXJ0SWNvbiAvPlxuICAgICAgICAgICAgPEFsZXJ0VGl0bGU+RXJyb3IhPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgPEFsZXJ0RGVzY3JpcHRpb24+e2Vycm9yfTwvQWxlcnREZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICB9XG5cbiAgICAgICAge2FjY291bnQgXG4gICAgICAgICAgPzxCb3ggIG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+TmV0d29yayBJbmZvPC9IZWFkaW5nPlxuICAgICAgICAgICAgPE5ldHdvcmtJbmZvIC8+XG4gICAgICAgICAgPC9Cb3g+OlwiXCJ9XG5cbiAgICAgICAge2FjY291bnQgIFxuICAgICAgICAgID8gPEJveCAgbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnIHRleHRBbGlnbj1cImNlbnRlclwiPkdvdmVybmFuY2UgVG9rZW48L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkR292ZXJuYW5jZVRva2VuIFxuICAgICAgICAgICAgICAgIGFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQm94PjpcIlwifVxuICAgICAgICB7YWNjb3VudCAgXG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSAgZm9udFNpemU9J3hsJz5Cb3ggQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkQm94XG4gICAgICAgICAgICAgICAgY3VycmVudEFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0JveD46XCJcIn1cbiAgICAgICAge2FjY291bnQgJiYgY2hhaW5JZCBcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnPkdvdmVybm9yIENvbnRyYWN0PC9IZWFkaW5nPlxuICAgICAgICAgICAgICA8UmVhZEdvdmVybm9yQ29udHJhY3QgXG4gICAgICAgICAgICAgICAgY2hhaW5JZD17Y2hhaW5JZH1cbiAgICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgICB0b2FzdD17c2hvd1RvYXN0fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+OlwiXCJ9XG4gICAgICA8L1ZTdGFjaz5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lIl0sIm5hbWVzIjpbIkhlYWQiLCJWU3RhY2siLCJIZWFkaW5nIiwiQm94IiwiQWxlcnQiLCJBbGVydERlc2NyaXB0aW9uIiwiQWxlcnRJY29uIiwiQWxlcnRUaXRsZSIsInVzZVRvYXN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIlJlYWRHb3Zlcm5hbmNlVG9rZW4iLCJSZWFkQm94IiwiUmVhZEdvdmVybm9yQ29udHJhY3QiLCJOZXR3b3JrSW5mbyIsInVzZUV0aGVyc1N0YXRlIiwidXNlRGVib3VuY2VkRWZmZWN0Iiwic2l0ZUluaXRpYWwiLCJIb21lIiwiZXRoZXJzUHJvdmlkZXIiLCJzIiwiYWNjb3VudCIsImNoYWluSWQiLCJzdGF0ZUlkIiwiZXJyb3IiLCJzZXRFcnJvciIsInRvYXN0Iiwic2hvd1RvYXN0IiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwic3RhdHVzIiwiZHVyYXRpb24iLCJpc0Nsb3NhYmxlIiwib25CbG9ja0V2ZW50IiwibnVtIiwib24iLCJvZmYiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJtYiIsInAiLCJ3IiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJteSIsImZvbnRTaXplIiwidGV4dEFsaWduIiwiY3VycmVudEFjY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ }),

/***/ "./src/store/initial.ts":
/*!******************************!*\
  !*** ./src/store/initial.ts ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar _layoutData = __webpack_require__(/*! ./layoutData */ \"./src/store/layoutData.ts\");\nmodule.exports = {\n    layoutData: _layoutData.layoutData\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUvaW5pdGlhbC50cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUEyQixlQUFjLHVCQUFkLCtDQUFjO0FBRXpDQSxNQUFNLENBQUNDLE9BQU8sR0FBRztJQUNiQyxVQUFVLEVBQUVBLFdBQVU7Q0FDekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3N0b3JlL2luaXRpYWwudHM/MjE0NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsYXlvdXREYXRhIH0gZnJvbSAnLi9sYXlvdXREYXRhJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbGF5b3V0RGF0YTogbGF5b3V0RGF0YVxufSJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibGF5b3V0RGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/store/initial.ts\n");

/***/ }),

/***/ "./src/store/layoutData.ts":
/*!*********************************!*\
  !*** ./src/store/layoutData.ts ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"layoutData\": function() { return /* binding */ layoutData; }\n/* harmony export */ });\nvar layoutData = {\n    siteTitle: \"Jurisdiction Proof of concept\"\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUvbGF5b3V0RGF0YS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTUEsVUFBVSxHQUFHO0lBQ3RCQyxTQUFTLEVBQUUsK0JBQStCO0NBRTdDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3N0b3JlL2xheW91dERhdGEudHM/NTliMiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbGF5b3V0RGF0YSA9IHtcbiAgICBzaXRlVGl0bGU6ICdKdXJpc2RpY3Rpb24gUHJvb2Ygb2YgY29uY2VwdCcsXG4gICAgXG59O1xuIl0sIm5hbWVzIjpbImxheW91dERhdGEiLCJzaXRlVGl0bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/store/layoutData.ts\n");

/***/ })

});