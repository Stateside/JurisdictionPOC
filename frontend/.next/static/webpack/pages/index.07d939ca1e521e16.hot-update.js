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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernanceToken */ \"./src/components/legacyDaoPoc/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadBox */ \"./src/components/legacyDaoPoc/ReadBox.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernorContract */ \"./src/components/legacyDaoPoc/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/legacyDaoPoc/NetworkInfo */ \"./src/components/legacyDaoPoc/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_9__.useDebouncedEffect)(function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersState,\n        showToast\n    ]);\n    console.log(\"BOOM\", account === \"\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.VStack, {\n        width: \"100%\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Flex, {\n                width: \"100%\",\n                margin: 0,\n                maxWidth: \"1140px\",\n                flexDirection: \"column\",\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                        whiteSpace: \"pre-line\",\n                        fontSize: \"80px\",\n                        fontWeight: \"400\",\n                        lineHeight: \"80px\",\n                        letterSpacing: \"0px\",\n                        textAlign: \"left\",\n                        my: 4,\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.mainTitle\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, _this),\n                    account === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Button, {\n                        float: \"right\",\n                        width: \"321px\",\n                        rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                        fontWeight: \"700\",\n                        fontSize: \"15px\",\n                        lineHeight: \"20px\",\n                        color: \"brand.grey.grey04\",\n                        background: \"brand.java\",\n                        type: \"button\",\n                        w: \"225px\",\n                        onClick: function() {\n                            return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                        },\n                        _hover: {\n                            background: \"brand.javaHover\"\n                        },\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.ctaConnect\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 21\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 94,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 95,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 93,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 100,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 101,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 99,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 108,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 109,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 107,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 115,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 116,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 114,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"FupKFci31eWk5aWuDlcbK2zZiAA=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_9__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsRUFBQyxJQUFJOzswQ0FDN0UsOERBQUNuRSx1REFBTztnQ0FBQ29ELEVBQUUsRUFBRSxDQUFDO2dDQUFFTCxRQUFRLEVBQUMsSUFBSTswQ0FBQyxtQkFBaUI7Ozs7O3FDQUFVOzBDQUN6RCw4REFBQ2xDLHFGQUFvQjtnQ0FDbkJVLE9BQU8sRUFBRUEsT0FBTztnQ0FDaEI2QyxjQUFjLEVBQUU5QyxPQUFPO2dDQUN2QkssS0FBSyxFQUFFQyxTQUFTOzs7OztxQ0FDaEI7Ozs7Ozs2QkFDRSxHQUFHLEVBQUU7Ozs7OztxQkFDUjs7Ozs7O2FBQ0EsQ0FDVjtDQUNGO0dBM0dLVixJQUFJOztRQUNZSCw4REFBYztRQUNsQkEsOERBQWM7UUFDZEEsOERBQWM7UUFDZEEsOERBQWM7UUFFaEJULHVEQUFRO1FBZ0J0QlUsK0RBQWtCOzs7QUF0QmRFLEtBQUFBLElBQUk7QUE2R1YsK0RBQWVBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2luZGV4LnRzeD8xOWEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgVlN0YWNrLCBGbGV4LCBIZWFkaW5nLCBCb3ggfSBmcm9tIFwiQGNoYWtyYS11aS9sYXlvdXRcIlxuaW1wb3J0IHsgQWxlcnQsIEFsZXJ0RGVzY3JpcHRpb24sIEFsZXJ0SWNvbiwgQWxlcnRUaXRsZSwgdXNlVG9hc3QsIEFsZXJ0U3RhdHVzLCBCdXR0b24gfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgV2FsbGV0SWNvbiBmcm9tICdAL2NvbXBvbmVudHMvaWNvbnMvd2FsbGV0SWNvbicgXG5cbmltcG9ydCBSZWFkR292ZXJuYW5jZVRva2VuIGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvUmVhZEdvdmVybmFuY2VUb2tlbidcbmltcG9ydCBSZWFkQm94IGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvUmVhZEJveCdcbmltcG9ydCBSZWFkR292ZXJub3JDb250cmFjdCBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL1JlYWRHb3Zlcm5vckNvbnRyYWN0J1xuaW1wb3J0IE5ldHdvcmtJbmZvIGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvTmV0d29ya0luZm8nXG5cbmltcG9ydCB7IHVzZUV0aGVyc1N0YXRlIH0gZnJvbSAnQC9zdG9yZS9BY2NvdW50RGF0YSdcbmltcG9ydCB7IHVzZURlYm91bmNlZEVmZmVjdCB9IGZyb20gJ0AvdXRpbHMvZGVib3VuY2UnXG5pbXBvcnQgeyBob21lTGFiZWxzIH0gZnJvbSAnQC9zdG9yZS9pbml0aWFsJ1xuXG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBldGhlcnNTdGF0ZSA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5ldGhlcnNQcm92aWRlcilcbiAgY29uc3QgYWNjb3VudCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5hY2NvdW50KVxuICBjb25zdCBjaGFpbklkID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmNoYWluSWQpXG4gIGNvbnN0IHN0YXRlSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuc3RhdGVJZClcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpXG4gIGNvbnN0IHRvYXN0ID0gdXNlVG9hc3QoKVxuXG4gIGNvbnN0IHNob3dUb2FzdCA9IHVzZUNhbGxiYWNrKChkZXNjcmlwdGlvbjogc3RyaW5nLCB0eXBlOiBBbGVydFN0YXR1cyA9IFwic3VjY2Vzc1wiKSA9PiB7XG4gICAgdG9hc3Qoe1xuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgc3RhdHVzOiB0eXBlLFxuICAgICAgZHVyYXRpb246IDQwMDAsXG4gICAgICBpc0Nsb3NhYmxlOiB0cnVlLFxuICAgIH0pXG4gIH0sIFt0b2FzdF0pXG5cbiAgY29uc3Qgb25CbG9ja0V2ZW50ID0gKG51bTogbnVtYmVyKSA9PiB7XG4gICAgc2hvd1RvYXN0KFwiTmV3IEJsb2NrOiBcIiArIG51bSlcbiAgfVxuXG4gIC8vIERlYm91bmNlIGhhbmRsaW5nIGNoYW5nZXMgdG8gYWNjb3VudHMgYW5kIGJsb2NrY2hhaW5zXG4gIHVzZURlYm91bmNlZEVmZmVjdCgoKSA9PiB7XG4gICAgZXRoZXJzU3RhdGU/Lm9uKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCAoKSA9PiB7XG4gICAgZXRoZXJzU3RhdGU/Lm9mZihcImJsb2NrXCIsIG9uQmxvY2tFdmVudClcbiAgfSwgW3N0YXRlSWQsIGV0aGVyc1N0YXRlLCBzaG93VG9hc3RdKVxuXG4gIGNvbnNvbGUubG9nKCdCT09NJywgYWNjb3VudCA9PT0gJycpO1xuICByZXR1cm4gKFxuICAgIDxWU3RhY2sgd2lkdGg9JzEwMCUnID5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+e2hvbWVMYWJlbHMucGFnZVRpdGxlfTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxGbGV4XG4gICAgICAgIHdpZHRoPScxMDAlJ1xuICAgICAgICBtYXJnaW49ezB9XG4gICAgICAgIG1heFdpZHRoPScxMTQwcHgnXG4gICAgICAgIGZsZXhEaXJlY3Rpb249J2NvbHVtbidcbiAgICAgID5cbiAgICAgICAge2Vycm9yICYmXG4gICAgICAgICAgPEFsZXJ0IHN0YXR1cz0nZXJyb3InPlxuICAgICAgICAgICAgPEFsZXJ0SWNvbiAvPlxuICAgICAgICAgICAgPEFsZXJ0VGl0bGU+RXJyb3IhPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgPEFsZXJ0RGVzY3JpcHRpb24+e2Vycm9yfTwvQWxlcnREZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICB9XG4gICAgICAgIDxIZWFkaW5nXG4gICAgICAgICAgd2hpdGVTcGFjZT0ncHJlLWxpbmUnXG4gICAgICAgICAgZm9udFNpemU9JzgwcHgnXG4gICAgICAgICAgZm9udFdlaWdodD0nNDAwJ1xuICAgICAgICAgIGxpbmVIZWlnaHQ9JzgwcHgnXG4gICAgICAgICAgbGV0dGVyU3BhY2luZz0nMHB4J1xuICAgICAgICAgIHRleHRBbGlnbj0nbGVmdCdcbiAgICAgICAgICBteT17NH0+XG4gICAgICAgICAge2hvbWVMYWJlbHMubWFpblRpdGxlfVxuICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgIHthY2NvdW50ID09PSAnJyAmJlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdD0ncmlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD0nMzIxcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxXYWxsZXRJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD0nNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9JzE1cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0PScyMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9J2JyYW5kLmdyZXkuZ3JleTA0J1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZD0nYnJhbmQuamF2YScgdHlwZT1cImJ1dHRvblwiIHc9JzIyNXB4JyBvbkNsaWNrPXsoKSA9PiBldGhlcnNTdGF0ZT8uY29ubmVjdCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2hvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJicmFuZC5qYXZhSG92ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aG9tZUxhYmVscy5jdGFDb25uZWN0fVxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5OZXR3b3JrIEluZm88L0hlYWRpbmc+XG4gICAgICAgICAgICA8TmV0d29ya0luZm8gLz5cbiAgICAgICAgICA8L0JveD4gOiBcIlwifVxuXG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJyB0ZXh0QWxpZ249XCJjZW50ZXJcIj5Hb3Zlcm5hbmNlIFRva2VuPC9IZWFkaW5nPlxuICAgICAgICAgICAgPFJlYWRHb3Zlcm5hbmNlVG9rZW5cbiAgICAgICAgICAgICAgYWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cbiAgICAgICAge2FjY291bnRcbiAgICAgICAgICA/IDxCb3ggbWI9ezB9IHA9ezR9IHc9JzEwMCUnIGJvcmRlcldpZHRoPVwiMXB4XCIgYm9yZGVyUmFkaXVzPVwibGdcIiBib3hTaGFkb3c9J21kJz5cbiAgICAgICAgICAgIDxIZWFkaW5nIG15PXs0fSBmb250U2l6ZT0neGwnPkJveCBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkQm94XG4gICAgICAgICAgICAgIGN1cnJlbnRBY2NvdW50PXthY2NvdW50fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD4gOiBcIlwifVxuICAgICAgICB7YWNjb3VudCAmJiBjaGFpbklkXG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJz5Hb3Zlcm5vciBDb250cmFjdDwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkR292ZXJub3JDb250cmFjdFxuICAgICAgICAgICAgICBjaGFpbklkPXtjaGFpbklkfVxuICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgICAgdG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cbiAgICAgIDwvRmxleD5cbiAgICA8L1ZTdGFjaz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lIl0sIm5hbWVzIjpbIkhlYWQiLCJWU3RhY2siLCJGbGV4IiwiSGVhZGluZyIsIkJveCIsIkFsZXJ0IiwiQWxlcnREZXNjcmlwdGlvbiIsIkFsZXJ0SWNvbiIsIkFsZXJ0VGl0bGUiLCJ1c2VUb2FzdCIsIkJ1dHRvbiIsInVzZVN0YXRlIiwidXNlQ2FsbGJhY2siLCJXYWxsZXRJY29uIiwiUmVhZEdvdmVybmFuY2VUb2tlbiIsIlJlYWRCb3giLCJSZWFkR292ZXJub3JDb250cmFjdCIsIk5ldHdvcmtJbmZvIiwidXNlRXRoZXJzU3RhdGUiLCJ1c2VEZWJvdW5jZWRFZmZlY3QiLCJob21lTGFiZWxzIiwiSG9tZSIsImV0aGVyc1N0YXRlIiwicyIsImV0aGVyc1Byb3ZpZGVyIiwiYWNjb3VudCIsImNoYWluSWQiLCJzdGF0ZUlkIiwiZXJyb3IiLCJzZXRFcnJvciIsInRvYXN0Iiwic2hvd1RvYXN0IiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwic3RhdHVzIiwiZHVyYXRpb24iLCJpc0Nsb3NhYmxlIiwib25CbG9ja0V2ZW50IiwibnVtIiwib24iLCJvZmYiLCJjb25zb2xlIiwibG9nIiwid2lkdGgiLCJ0aXRsZSIsInBhZ2VUaXRsZSIsIm1hcmdpbiIsIm1heFdpZHRoIiwiZmxleERpcmVjdGlvbiIsIndoaXRlU3BhY2UiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibGV0dGVyU3BhY2luZyIsInRleHRBbGlnbiIsIm15IiwibWFpblRpdGxlIiwiZmxvYXQiLCJyaWdodEljb24iLCJjb2xvciIsImJhY2tncm91bmQiLCJ3Iiwib25DbGljayIsImNvbm5lY3QiLCJfaG92ZXIiLCJjdGFDb25uZWN0IiwibWIiLCJwIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJjdXJyZW50QWNjb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});