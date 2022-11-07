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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/icons/walletIcon */ \"./src/components/icons/walletIcon.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernanceToken */ \"./src/components/legacyDaoPoc/ReadGovernanceToken.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadBox */ \"./src/components/legacyDaoPoc/ReadBox.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/legacyDaoPoc/ReadGovernorContract */ \"./src/components/legacyDaoPoc/ReadGovernorContract.tsx\");\n/* harmony import */ var _components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/legacyDaoPoc/NetworkInfo */ \"./src/components/legacyDaoPoc/NetworkInfo.tsx\");\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_9__.useDebouncedEffect)(function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersState,\n        showToast\n    ]);\n    console.log(\"BOOM\", _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.VStack, {\n        width: \"100%\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Flex, {\n                width: \"100%\",\n                margin: 0,\n                maxWidth: \"1140px\",\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                        whiteSpace: \"pre-line\",\n                        fontSize: \"80px\",\n                        fontWeight: \"400\",\n                        lineHeight: \"80px\",\n                        letterSpacing: \"0px\",\n                        textAlign: \"left\",\n                        my: 4,\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.mainTitle\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, _this),\n                    (ethersState === null || ethersState === void 0 ? void 0 : ethersState.account) === \"\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Button, {\n                        float: \"right\",\n                        size: \"md\",\n                        rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_walletIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, void 0, void 0),\n                        fontWeight: \"700\",\n                        fontSize: \"15px\",\n                        lineHeight: \"20px\",\n                        color: \"brand.grey.grey04\",\n                        background: \"brand.java\",\n                        type: \"button\",\n                        w: \"125px\",\n                        onClick: function() {\n                            return ethersState === null || ethersState === void 0 ? void 0 : ethersState.connect();\n                        },\n                        _hover: {\n                            background: \"brand.javaHover\"\n                        },\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_10__.homeLabels.ctaText\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 21\n                    }, _this),\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Network Info\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 93,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_NetworkInfo__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 94,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 92,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                textAlign: \"center\",\n                                children: \"Governance Token\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 99,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernanceToken__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                account: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 100,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 98,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Box Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 107,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadBox__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                currentAccount: account\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 108,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 106,\n                        columnNumber: 13\n                    }, _this) : \"\",\n                    account && chainId ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Box, {\n                        mb: 0,\n                        p: 4,\n                        w: \"100%\",\n                        borderWidth: \"1px\",\n                        borderRadius: \"lg\",\n                        boxShadow: \"md\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_12__.Heading, {\n                                my: 4,\n                                fontSize: \"xl\",\n                                children: \"Governor Contract\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 114,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_legacyDaoPoc_ReadGovernorContract__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                chainId: chainId,\n                                currentAccount: account,\n                                toast: showToast\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 115,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 113,\n                        columnNumber: 13\n                    }, _this) : \"\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"FupKFci31eWk5aWuDlcbK2zZiAA=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_8__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_9__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O3dCQUFDQyxZQUFZLEVBQUMsSUFBSTt3QkFBQ0MsU0FBUyxFQUFDLElBQUk7OzBDQUM3RSw4REFBQ25FLHVEQUFPO2dDQUFDbUQsRUFBRSxFQUFFLENBQUM7Z0NBQUVMLFFBQVEsRUFBQyxJQUFJOzBDQUFDLG1CQUFpQjs7Ozs7cUNBQVU7MENBQ3pELDhEQUFDakMscUZBQW9CO2dDQUNuQlUsT0FBTyxFQUFFQSxPQUFPO2dDQUNoQjZDLGNBQWMsRUFBRTlDLE9BQU87Z0NBQ3ZCSyxLQUFLLEVBQUVDLFNBQVM7Ozs7O3FDQUNoQjs7Ozs7OzZCQUNFLEdBQUcsRUFBRTs7Ozs7O3FCQUNSOzs7Ozs7YUFDQSxDQUNWO0NBQ0Y7R0ExR0tWLElBQUk7O1FBQ1lILDhEQUFjO1FBQ2xCQSw4REFBYztRQUNkQSw4REFBYztRQUNkQSw4REFBYztRQUVoQlQsdURBQVE7UUFnQnRCVSwrREFBa0I7OztBQXRCZEUsS0FBQUEsSUFBSTtBQTRHViwrREFBZUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyBWU3RhY2ssIEZsZXgsIEhlYWRpbmcsIEJveCB9IGZyb20gXCJAY2hha3JhLXVpL2xheW91dFwiXG5pbXBvcnQgeyBBbGVydCwgQWxlcnREZXNjcmlwdGlvbiwgQWxlcnRJY29uLCBBbGVydFRpdGxlLCB1c2VUb2FzdCwgQWxlcnRTdGF0dXMsIEJ1dHRvbiB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBXYWxsZXRJY29uIGZyb20gJ0AvY29tcG9uZW50cy9pY29ucy93YWxsZXRJY29uJyBcblxuaW1wb3J0IFJlYWRHb3Zlcm5hbmNlVG9rZW4gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkR292ZXJuYW5jZVRva2VuJ1xuaW1wb3J0IFJlYWRCb3ggZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkQm94J1xuaW1wb3J0IFJlYWRHb3Zlcm5vckNvbnRyYWN0IGZyb20gJ0AvY29tcG9uZW50cy9sZWdhY3lEYW9Qb2MvUmVhZEdvdmVybm9yQ29udHJhY3QnXG5pbXBvcnQgTmV0d29ya0luZm8gZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9OZXR3b3JrSW5mbydcblxuaW1wb3J0IHsgdXNlRXRoZXJzU3RhdGUgfSBmcm9tICdAL3N0b3JlL0FjY291bnREYXRhJ1xuaW1wb3J0IHsgdXNlRGVib3VuY2VkRWZmZWN0IH0gZnJvbSAnQC91dGlscy9kZWJvdW5jZSdcbmltcG9ydCB7IGhvbWVMYWJlbHMgfSBmcm9tICdAL3N0b3JlL2luaXRpYWwnXG5cblxuY29uc3QgSG9tZTogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmV0aGVyc1Byb3ZpZGVyKVxuICBjb25zdCBhY2NvdW50ID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmFjY291bnQpXG4gIGNvbnN0IGNoYWluSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuY2hhaW5JZClcbiAgY29uc3Qgc3RhdGVJZCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5zdGF0ZUlkKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIilcbiAgY29uc3QgdG9hc3QgPSB1c2VUb2FzdCgpXG5cbiAgY29uc3Qgc2hvd1RvYXN0ID0gdXNlQ2FsbGJhY2soKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHR5cGU6IEFsZXJ0U3RhdHVzID0gXCJzdWNjZXNzXCIpID0+IHtcbiAgICB0b2FzdCh7XG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXM6IHR5cGUsXG4gICAgICBkdXJhdGlvbjogNDAwMCxcbiAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgfSlcbiAgfSwgW3RvYXN0XSlcblxuICBjb25zdCBvbkJsb2NrRXZlbnQgPSAobnVtOiBudW1iZXIpID0+IHtcbiAgICBzaG93VG9hc3QoXCJOZXcgQmxvY2s6IFwiICsgbnVtKVxuICB9XG5cbiAgLy8gRGVib3VuY2UgaGFuZGxpbmcgY2hhbmdlcyB0byBhY2NvdW50cyBhbmQgYmxvY2tjaGFpbnNcbiAgdXNlRGVib3VuY2VkRWZmZWN0KCgpID0+IHtcbiAgICBldGhlcnNTdGF0ZT8ub24oXCJibG9ja1wiLCBvbkJsb2NrRXZlbnQpXG4gIH0sICgpID0+IHtcbiAgICBldGhlcnNTdGF0ZT8ub2ZmKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCBbc3RhdGVJZCwgZXRoZXJzU3RhdGUsIHNob3dUb2FzdF0pXG5cbiAgY29uc29sZS5sb2coJ0JPT00nLCBob21lTGFiZWxzKTtcbiAgcmV0dXJuIChcbiAgICA8VlN0YWNrIHdpZHRoPScxMDAlJyA+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPntob21lTGFiZWxzLnBhZ2VUaXRsZX08L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8RmxleFxuICAgICAgICB3aWR0aD0nMTAwJSdcbiAgICAgICAgbWFyZ2luPXswfVxuICAgICAgICBtYXhXaWR0aD0nMTE0MHB4J1xuICAgICAgPlxuICAgICAgICB7ZXJyb3IgJiZcbiAgICAgICAgICA8QWxlcnQgc3RhdHVzPSdlcnJvcic+XG4gICAgICAgICAgICA8QWxlcnRJY29uIC8+XG4gICAgICAgICAgICA8QWxlcnRUaXRsZT5FcnJvciE8L0FsZXJ0VGl0bGU+XG4gICAgICAgICAgICA8QWxlcnREZXNjcmlwdGlvbj57ZXJyb3J9PC9BbGVydERlc2NyaXB0aW9uPlxuICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIH1cbiAgICAgICAgPEhlYWRpbmdcbiAgICAgICAgICB3aGl0ZVNwYWNlPSdwcmUtbGluZSdcbiAgICAgICAgICBmb250U2l6ZT0nODBweCdcbiAgICAgICAgICBmb250V2VpZ2h0PSc0MDAnXG4gICAgICAgICAgbGluZUhlaWdodD0nODBweCdcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nPScwcHgnXG4gICAgICAgICAgdGV4dEFsaWduPSdsZWZ0J1xuICAgICAgICAgIG15PXs0fT5cbiAgICAgICAgICB7aG9tZUxhYmVscy5tYWluVGl0bGV9XG4gICAgICAgIDwvSGVhZGluZz5cbiAgICAgICAge2V0aGVyc1N0YXRlPy5hY2NvdW50ID09PSBcIlwiICYmXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0PSdyaWdodCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9J21kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8V2FsbGV0SWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPScxNXB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodD0nMjBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ncmV5LmdyZXkwNCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9J2JyYW5kLmphdmEnIHR5cGU9XCJidXR0b25cIiB3PScxMjVweCcgb25DbGljaz17KCkgPT4gZXRoZXJzU3RhdGU/LmNvbm5lY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9ob3Zlcj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiYnJhbmQuamF2YUhvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2hvbWVMYWJlbHMuY3RhVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB7YWNjb3VudFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+TmV0d29yayBJbmZvPC9IZWFkaW5nPlxuICAgICAgICAgICAgPE5ldHdvcmtJbmZvIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cblxuICAgICAgICB7YWNjb3VudFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+R292ZXJuYW5jZSBUb2tlbjwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkR292ZXJuYW5jZVRva2VuXG4gICAgICAgICAgICAgIGFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PiA6IFwiXCJ9XG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJz5Cb3ggQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICA8UmVhZEJveFxuICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cbiAgICAgICAge2FjY291bnQgJiYgY2hhaW5JZFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCc+R292ZXJub3IgQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICA8UmVhZEdvdmVybm9yQ29udHJhY3RcbiAgICAgICAgICAgICAgY2hhaW5JZD17Y2hhaW5JZH1cbiAgICAgICAgICAgICAgY3VycmVudEFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PiA6IFwiXCJ9XG4gICAgICA8L0ZsZXg+XG4gICAgPC9WU3RhY2s+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZSJdLCJuYW1lcyI6WyJIZWFkIiwiVlN0YWNrIiwiRmxleCIsIkhlYWRpbmciLCJCb3giLCJBbGVydCIsIkFsZXJ0RGVzY3JpcHRpb24iLCJBbGVydEljb24iLCJBbGVydFRpdGxlIiwidXNlVG9hc3QiLCJCdXR0b24iLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiV2FsbGV0SWNvbiIsIlJlYWRHb3Zlcm5hbmNlVG9rZW4iLCJSZWFkQm94IiwiUmVhZEdvdmVybm9yQ29udHJhY3QiLCJOZXR3b3JrSW5mbyIsInVzZUV0aGVyc1N0YXRlIiwidXNlRGVib3VuY2VkRWZmZWN0IiwiaG9tZUxhYmVscyIsIkhvbWUiLCJldGhlcnNTdGF0ZSIsInMiLCJldGhlcnNQcm92aWRlciIsImFjY291bnQiLCJjaGFpbklkIiwic3RhdGVJZCIsImVycm9yIiwic2V0RXJyb3IiLCJ0b2FzdCIsInNob3dUb2FzdCIsImRlc2NyaXB0aW9uIiwidHlwZSIsInN0YXR1cyIsImR1cmF0aW9uIiwiaXNDbG9zYWJsZSIsIm9uQmxvY2tFdmVudCIsIm51bSIsIm9uIiwib2ZmIiwiY29uc29sZSIsImxvZyIsIndpZHRoIiwidGl0bGUiLCJwYWdlVGl0bGUiLCJtYXJnaW4iLCJtYXhXaWR0aCIsIndoaXRlU3BhY2UiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibGV0dGVyU3BhY2luZyIsInRleHRBbGlnbiIsIm15IiwibWFpblRpdGxlIiwiZmxvYXQiLCJzaXplIiwicmlnaHRJY29uIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwidyIsIm9uQ2xpY2siLCJjb25uZWN0IiwiX2hvdmVyIiwiY3RhVGV4dCIsIm1iIiwicCIsImJvcmRlcldpZHRoIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiY3VycmVudEFjY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});