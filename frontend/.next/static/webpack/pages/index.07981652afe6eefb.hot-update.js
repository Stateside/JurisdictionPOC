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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernanceToken */ \"./src/components/legacyDaoPoc/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadBox */ \"./src/components/legacyDaoPoc/ReadBox.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernorContract */ \"./src/components/legacyDaoPoc/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/legacyDaoPoc/NetworkInfo */ \"./src/components/legacyDaoPoc/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersProvider = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect)(function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersProvider === null || ethersProvider === void 0 ? void 0 : ethersProvider.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersProvider,\n        showToast\n    ]);\n    console.log(\"BOOM\", _store_initial__WEBPACK_IMPORTED_MODULE_9__.homeLabels);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_9__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.VStack, {\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 53,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                        fontFamily: \"GT America\",\n                        fontSize: \"80px\",\n                        fontWeight: \"400\",\n                        lineHeight: \"80px\",\n                        letterSpacing: \"0px\",\n                        textAlign: \"left\",\n                        my: 4,\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_9__.homeLabels.mainTitle\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 57,\n                        columnNumber: 9\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 70,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 69,\n                        columnNumber: 12\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 77,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 75,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 85,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 83,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_11__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 91,\n                                columnNumber: 15\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 92,\n                                columnNumber: 15\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 90,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Home, \"PMOZxWPQYe6DeeI42I1veV8ZjDE=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_7__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_8__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7Z0NBQUdMLFFBQVEsRUFBQyxJQUFJOzBDQUFDLGNBQVk7Ozs7O3FDQUFVOzBDQUNyRCw4REFBQzlCLHdFQUFPO2dDQUNOMkMsY0FBYyxFQUFFbEMsT0FBTzs7Ozs7cUNBQ3ZCOzs7Ozs7NkJBQ0UsR0FBQyxFQUFFO29CQUNaQSxPQUFPLElBQUlDLE9BQU8saUJBQ2YsOERBQUNuQixtREFBRzt3QkFBQzhDLEVBQUUsRUFBRSxDQUFDO3dCQUFFQyxDQUFDLEVBQUUsQ0FBQzt3QkFBRUMsQ0FBQyxFQUFDLE1BQU07d0JBQUNDLFdBQVcsRUFBQyxLQUFLO3dCQUFDQyxZQUFZLEVBQUMsSUFBSTt3QkFBQ0MsU0FBUyxFQUFDLElBQUk7OzBDQUMzRSw4REFBQ3BELHVEQUFPO2dDQUFDNkMsRUFBRSxFQUFFLENBQUM7Z0NBQUdMLFFBQVEsRUFBQyxJQUFJOzBDQUFDLG1CQUFpQjs7Ozs7cUNBQVU7MENBQzFELDhEQUFDN0IscUZBQW9CO2dDQUNuQlMsT0FBTyxFQUFFQSxPQUFPO2dDQUNoQmlDLGNBQWMsRUFBRWxDLE9BQU87Z0NBQ3ZCSyxLQUFLLEVBQUVDLFNBQVM7Ozs7O3FDQUNoQjs7Ozs7OzZCQUNFLEdBQUMsRUFBRTs7Ozs7O3FCQUNOOztvQkFDUixDQUNKO0NBQ0Y7R0F2RktULElBQUk7O1FBQ2VILDhEQUFjO1FBQ3JCQSw4REFBYztRQUNkQSw4REFBYztRQUNkQSw4REFBYztRQUVoQlAsdURBQVE7UUFnQnRCUSwrREFBa0I7OztBQXRCZEUsS0FBQUEsSUFBSTtBQXlGViwrREFBZUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyBWU3RhY2ssIEhlYWRpbmcsIEJveH0gZnJvbSBcIkBjaGFrcmEtdWkvbGF5b3V0XCJcbmltcG9ydCB7IEFsZXJ0LCBBbGVydERlc2NyaXB0aW9uLCBBbGVydEljb24sIEFsZXJ0VGl0bGUsIHVzZVRvYXN0LCBBbGVydFN0YXR1cyB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWRHb3Zlcm5hbmNlVG9rZW4gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkR292ZXJuYW5jZVRva2VuJ1xuaW1wb3J0IFJlYWRCb3ggZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkQm94J1xuaW1wb3J0IFJlYWRHb3Zlcm5vckNvbnRyYWN0IGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvUmVhZEdvdmVybm9yQ29udHJhY3QnXG5pbXBvcnQgTmV0d29ya0luZm8gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9OZXR3b3JrSW5mbydcbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCB7IHVzZURlYm91bmNlZEVmZmVjdCB9IGZyb20gJ0AvdXRpbHMvZGVib3VuY2UnXG5pbXBvcnQgeyBob21lTGFiZWxzIH0gZnJvbSAnQC9zdG9yZS9pbml0aWFsJ1xuXG5jb25zdCBIb21lOiBOZXh0UGFnZSA9ICgpID0+IHtcbiAgY29uc3QgZXRoZXJzUHJvdmlkZXIgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuZXRoZXJzUHJvdmlkZXIpXG4gIGNvbnN0IGFjY291bnQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuYWNjb3VudClcbiAgY29uc3QgY2hhaW5JZCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5jaGFpbklkKVxuICBjb25zdCBzdGF0ZUlkID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLnN0YXRlSWQpXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKVxuICBjb25zdCB0b2FzdCA9IHVzZVRvYXN0KClcblxuICBjb25zdCBzaG93VG9hc3QgPSB1c2VDYWxsYmFjaygoZGVzY3JpcHRpb246c3RyaW5nLCB0eXBlOkFsZXJ0U3RhdHVzID0gXCJzdWNjZXNzXCIpID0+IHtcbiAgICB0b2FzdCh7XG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXM6IHR5cGUsXG4gICAgICBkdXJhdGlvbjogNDAwMCxcbiAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgfSlcbiAgfSwgW3RvYXN0XSlcblxuICBjb25zdCBvbkJsb2NrRXZlbnQgPSAobnVtOm51bWJlcikgPT4ge1xuICAgIHNob3dUb2FzdChcIk5ldyBCbG9jazogXCIgKyBudW0pXG4gIH1cblxuICAvLyBEZWJvdW5jZSBoYW5kbGluZyBjaGFuZ2VzIHRvIGFjY291bnRzIGFuZCBibG9ja2NoYWluc1xuICB1c2VEZWJvdW5jZWRFZmZlY3QoKCkgPT4ge1xuICAgIGV0aGVyc1Byb3ZpZGVyPy5vbihcImJsb2NrXCIsIG9uQmxvY2tFdmVudClcbiAgfSwgKCkgPT4ge1xuICAgIGV0aGVyc1Byb3ZpZGVyPy5vZmYoXCJibG9ja1wiLCBvbkJsb2NrRXZlbnQpXG4gIH0sIFtzdGF0ZUlkLCBldGhlcnNQcm92aWRlciwgc2hvd1RvYXN0XSlcblxuICBjb25zb2xlLmxvZygnQk9PTScsIGhvbWVMYWJlbHMpO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPntob21lTGFiZWxzLnBhZ2VUaXRsZX08L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8VlN0YWNrPlxuICAgICAgICB7ZXJyb3IgJiYgXG4gICAgICAgICAgPEFsZXJ0IHN0YXR1cz0nZXJyb3InPlxuICAgICAgICAgICAgPEFsZXJ0SWNvbiAvPlxuICAgICAgICAgICAgPEFsZXJ0VGl0bGU+RXJyb3IhPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgPEFsZXJ0RGVzY3JpcHRpb24+e2Vycm9yfTwvQWxlcnREZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICB9XG4gICAgICAgIDxIZWFkaW5nIFxuICAgICAgICAgIGZvbnRGYW1pbHk9J0dUIEFtZXJpY2EnXG4gICAgICAgICAgZm9udFNpemU9JzgwcHgnXG4gICAgICAgICAgZm9udFdlaWdodD0nNDAwJ1xuICAgICAgICAgIGxpbmVIZWlnaHQ9JzgwcHgnXG4gICAgICAgICAgbGV0dGVyU3BhY2luZz0nMHB4J1xuICAgICAgICAgIHRleHRBbGlnbj0nbGVmdCcgICAgICAgICAgXG4gICAgICAgICAgbXk9ezR9PlxuICAgICAgICAgICAge2hvbWVMYWJlbHMubWFpblRpdGxlfVxuICAgICAgICA8L0hlYWRpbmc+XG5cbiAgICAgICAge2FjY291bnQgXG4gICAgICAgICAgPzxCb3ggIG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gIGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+TmV0d29yayBJbmZvPC9IZWFkaW5nPlxuICAgICAgICAgICAgPE5ldHdvcmtJbmZvIC8+XG4gICAgICAgICAgPC9Cb3g+OlwiXCJ9XG5cbiAgICAgICAge2FjY291bnQgIFxuICAgICAgICAgID8gPEJveCAgbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnIHRleHRBbGlnbj1cImNlbnRlclwiPkdvdmVybmFuY2UgVG9rZW48L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkR292ZXJuYW5jZVRva2VuIFxuICAgICAgICAgICAgICAgIGFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQm94PjpcIlwifVxuICAgICAgICB7YWNjb3VudCAgXG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSAgZm9udFNpemU9J3hsJz5Cb3ggQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICAgIDxSZWFkQm94XG4gICAgICAgICAgICAgICAgY3VycmVudEFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0JveD46XCJcIn1cbiAgICAgICAge2FjY291bnQgJiYgY2hhaW5JZCBcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9ICBmb250U2l6ZT0neGwnPkdvdmVybm9yIENvbnRyYWN0PC9IZWFkaW5nPlxuICAgICAgICAgICAgICA8UmVhZEdvdmVybm9yQ29udHJhY3QgXG4gICAgICAgICAgICAgICAgY2hhaW5JZD17Y2hhaW5JZH1cbiAgICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgICB0b2FzdD17c2hvd1RvYXN0fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+OlwiXCJ9XG4gICAgICA8L1ZTdGFjaz5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lIl0sIm5hbWVzIjpbIkhlYWQiLCJWU3RhY2siLCJIZWFkaW5nIiwiQm94IiwiQWxlcnQiLCJBbGVydERlc2NyaXB0aW9uIiwiQWxlcnRJY29uIiwiQWxlcnRUaXRsZSIsInVzZVRvYXN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIlJlYWRHb3Zlcm5hbmNlVG9rZW4iLCJSZWFkQm94IiwiUmVhZEdvdmVybm9yQ29udHJhY3QiLCJOZXR3b3JrSW5mbyIsInVzZUV0aGVyc1N0YXRlIiwidXNlRGVib3VuY2VkRWZmZWN0IiwiaG9tZUxhYmVscyIsIkhvbWUiLCJldGhlcnNQcm92aWRlciIsInMiLCJhY2NvdW50IiwiY2hhaW5JZCIsInN0YXRlSWQiLCJlcnJvciIsInNldEVycm9yIiwidG9hc3QiLCJzaG93VG9hc3QiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJzdGF0dXMiLCJkdXJhdGlvbiIsImlzQ2xvc2FibGUiLCJvbkJsb2NrRXZlbnQiLCJudW0iLCJvbiIsIm9mZiIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsInBhZ2VUaXRsZSIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibGV0dGVyU3BhY2luZyIsInRleHRBbGlnbiIsIm15IiwibWFpblRpdGxlIiwibWIiLCJwIiwidyIsImJvcmRlcldpZHRoIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiY3VycmVudEFjY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});