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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/layout */ \"./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store_AccountData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/AccountData */ \"./src/store/AccountData.ts\");\n/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/debounce */ \"./src/utils/debounce.ts\");\n/* harmony import */ var _store_initial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/initial */ \"./src/store/initial.ts\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Home = function() {\n    _s();\n    var ethersState = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.ethersProvider;\n    });\n    var account = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.account;\n    });\n    var chainId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.chainId;\n    });\n    var stateId = (0,_store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState)(function(s) {\n        return s.stateId;\n    });\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\"), error = ref[0], setError = ref[1];\n    var toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.useToast)();\n    var showToast = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function(description) {\n        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : \"success\";\n        toast({\n            description: description,\n            status: type,\n            duration: 4000,\n            isClosable: true\n        });\n    }, [\n        toast\n    ]);\n    var onBlockEvent = function(num) {\n        showToast(\"New Block: \" + num);\n    };\n    // Debounce handling changes to accounts and blockchains\n    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_4__.useDebouncedEffect)(function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.on(\"block\", onBlockEvent);\n    }, function() {\n        ethersState === null || ethersState === void 0 ? void 0 : ethersState.off(\"block\", onBlockEvent);\n    }, [\n        stateId,\n        ethersState,\n        showToast\n    ]);\n    console.log(\"BOOM\", account === \"\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.VStack, {\n        width: \"100%\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: _store_initial__WEBPACK_IMPORTED_MODULE_5__.homeLabels.pageTitle\n                }, void 0, false, {\n                    fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.Flex, {\n                width: \"100%\",\n                margin: 0,\n                maxWidth: \"1140px\",\n                flexDirection: \"column\",\n                children: [\n                    error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Alert, {\n                        status: \"error\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertIcon, {}, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertTitle, {\n                                children: \"Error!\"\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.AlertDescription, {\n                                children: error\n                            }, void 0, false, {\n                                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_layout__WEBPACK_IMPORTED_MODULE_7__.Heading, {\n                        whiteSpace: \"pre-line\",\n                        fontSize: \"80px\",\n                        fontWeight: \"400\",\n                        lineHeight: \"80px\",\n                        letterSpacing: \"0px\",\n                        textAlign: \"left\",\n                        my: 4,\n                        marginBottom: \"48px\",\n                        children: _store_initial__WEBPACK_IMPORTED_MODULE_5__.homeLabels.mainTitle\n                    }, void 0, false, {\n                        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Bryan/sites/JurisdictionPOC/frontend/src/pages/index.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"FupKFci31eWk5aWuDlcbK2zZiAA=\", false, function() {\n    return [\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _store_AccountData__WEBPACK_IMPORTED_MODULE_3__.useEthersState,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.useToast,\n        _utils_debounce__WEBPACK_IMPORTED_MODULE_4__.useDebouncedEffect\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUM0QjtBQUNrQztBQUNrRDtBQUNuRTtBQVFPO0FBQ0M7QUFDQzs7QUFHdEQsSUFBTWMsSUFBSSxHQUFhLFdBQU07O0lBQzNCLElBQU1DLFdBQVcsR0FBR0osa0VBQWMsQ0FBQ0ssU0FBQUEsQ0FBQztlQUFJQSxDQUFDLENBQUNDLGNBQWM7S0FBQSxDQUFDO0lBQ3pELElBQU1DLE9BQU8sR0FBR1Asa0VBQWMsQ0FBQ0ssU0FBQUEsQ0FBQztlQUFJQSxDQUFDLENBQUNFLE9BQU87S0FBQSxDQUFDO0lBQzlDLElBQU1DLE9BQU8sR0FBR1Isa0VBQWMsQ0FBQ0ssU0FBQUEsQ0FBQztlQUFJQSxDQUFDLENBQUNHLE9BQU87S0FBQSxDQUFDO0lBQzlDLElBQU1DLE9BQU8sR0FBR1Qsa0VBQWMsQ0FBQ0ssU0FBQUEsQ0FBQztlQUFJQSxDQUFDLENBQUNJLE9BQU87S0FBQSxDQUFDO0lBQzlDLElBQTBCWCxHQUFvQixHQUFwQkEsK0NBQVEsQ0FBUyxFQUFFLENBQUMsRUF0QmhELEtBc0JjLEdBQWNBLEdBQW9CLEdBQWxDLEVBdEJkLFFBc0J3QixHQUFJQSxHQUFvQixHQUF4QjtJQUN0QixJQUFNYyxLQUFLLEdBQUdmLDBEQUFRLEVBQUU7SUFFeEIsSUFBTWdCLFNBQVMsR0FBR2Qsa0RBQVcsQ0FBQyxTQUFDZSxXQUFtQixFQUFvQztZQUFsQ0MsSUFBaUIsb0VBQUcsU0FBUztRQUMvRUgsS0FBSyxDQUFDO1lBQ0pFLFdBQVcsRUFBRUEsV0FBVztZQUN4QkUsTUFBTSxFQUFFRCxJQUFJO1lBQ1pFLFFBQVEsRUFBRSxJQUFJO1lBQ2RDLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7S0FDSCxFQUFFO1FBQUNOLEtBQUs7S0FBQyxDQUFDO0lBRVgsSUFBTU8sWUFBWSxHQUFHLFNBQUNDLEdBQVcsRUFBSztRQUNwQ1AsU0FBUyxDQUFDLGFBQWEsR0FBR08sR0FBRyxDQUFDO0tBQy9CO0lBRUQsd0RBQXdEO0lBQ3hEbkIsbUVBQWtCLENBQUMsV0FBTTtRQUN2QkcsV0FBVyxhQUFYQSxXQUFXLFdBQUksR0FBZkEsS0FBQUEsQ0FBZSxHQUFmQSxXQUFXLENBQUVpQixFQUFFLENBQUMsT0FBTyxFQUFFRixZQUFZLENBQUM7S0FDdkMsRUFBRSxXQUFNO1FBQ1BmLFdBQVcsYUFBWEEsV0FBVyxXQUFLLEdBQWhCQSxLQUFBQSxDQUFnQixHQUFoQkEsV0FBVyxDQUFFa0IsR0FBRyxDQUFDLE9BQU8sRUFBRUgsWUFBWSxDQUFDO0tBQ3hDLEVBQUU7UUFBQ1YsT0FBTztRQUFFTCxXQUFXO1FBQUVTLFNBQVM7S0FBQyxDQUFDO0lBRXJDVSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxNQUFNLEVBQUVqQixPQUFPLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEMscUJBQ0UsOERBQUNqQixxREFBTTtRQUFDbUMsS0FBSyxFQUFDLE1BQU07OzBCQUNsQiw4REFBQ3BDLGtEQUFJOzBCQUNILDRFQUFDcUMsT0FBSzs4QkFBRXhCLGdFQUFvQjs7Ozs7eUJBQVM7Ozs7O3FCQUNoQzswQkFFUCw4REFBQ1gsbURBQUk7Z0JBQ0hrQyxLQUFLLEVBQUMsTUFBTTtnQkFDWkcsTUFBTSxFQUFFLENBQUM7Z0JBQ1RDLFFBQVEsRUFBQyxRQUFRO2dCQUNqQkMsYUFBYSxFQUFDLFFBQVE7O29CQUVyQnBCLEtBQUssa0JBQ0osOERBQUNqQixtREFBSzt3QkFBQ3VCLE1BQU0sRUFBQyxPQUFPOzswQ0FDbkIsOERBQUNyQix1REFBUzs7OztxQ0FBRzswQ0FDYiw4REFBQ0Msd0RBQVU7MENBQUMsUUFBTTs7Ozs7cUNBQWE7MENBQy9CLDhEQUFDRiw4REFBZ0I7MENBQUVnQixLQUFLOzs7OztxQ0FBb0I7Ozs7Ozs2QkFDdEM7a0NBRVYsOERBQUNsQixzREFBTzt3QkFDTnVDLFVBQVUsRUFBQyxVQUFVO3dCQUNyQkMsUUFBUSxFQUFDLE1BQU07d0JBQ2ZDLFVBQVUsRUFBQyxLQUFLO3dCQUNoQkMsVUFBVSxFQUFDLE1BQU07d0JBQ2pCQyxhQUFhLEVBQUMsS0FBSzt3QkFDbkJDLFNBQVMsRUFBQyxNQUFNO3dCQUNoQkMsRUFBRSxFQUFFLENBQUM7d0JBQ0xDLFlBQVksRUFBQyxNQUFNO2tDQUNsQnBDLGdFQUFvQjs7Ozs7NkJBQ2I7Ozs7OztxQkErQ0w7Ozs7OzthQUNBLENBQ1Y7Q0FDRjtHQTVHS0MsSUFBSTs7UUFDWUgsOERBQWM7UUFDbEJBLDhEQUFjO1FBQ2RBLDhEQUFjO1FBQ2RBLDhEQUFjO1FBRWhCSCxzREFBUTtRQWdCdEJJLCtEQUFrQjs7O0FBdEJkRSxLQUFBQSxJQUFJO0FBOEdWLCtEQUFlQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCB7IFZTdGFjaywgRmxleCwgSGVhZGluZywgQm94IH0gZnJvbSBcIkBjaGFrcmEtdWkvbGF5b3V0XCJcbmltcG9ydCB7IEFsZXJ0LCBBbGVydERlc2NyaXB0aW9uLCBBbGVydEljb24sIEFsZXJ0VGl0bGUsIHVzZVRvYXN0LCBBbGVydFN0YXR1cywgQnV0dG9uIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFdhbGxldEljb24gZnJvbSAnQC9jb21wb25lbnRzL2ljb25zL3dhbGxldEljb24nIFxuXG5pbXBvcnQgUmVhZEdvdmVybmFuY2VUb2tlbiBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL1JlYWRHb3Zlcm5hbmNlVG9rZW4nXG5pbXBvcnQgUmVhZEJveCBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL1JlYWRCb3gnXG5pbXBvcnQgUmVhZEdvdmVybm9yQ29udHJhY3QgZnJvbSAnQC9jb21wb25lbnRzL2xlZ2FjeURhb1BvYy9SZWFkR292ZXJub3JDb250cmFjdCdcbmltcG9ydCBOZXR3b3JrSW5mbyBmcm9tICdAL2NvbXBvbmVudHMvbGVnYWN5RGFvUG9jL05ldHdvcmtJbmZvJ1xuXG5pbXBvcnQgeyB1c2VFdGhlcnNTdGF0ZSB9IGZyb20gJ0Avc3RvcmUvQWNjb3VudERhdGEnXG5pbXBvcnQgeyB1c2VEZWJvdW5jZWRFZmZlY3QgfSBmcm9tICdAL3V0aWxzL2RlYm91bmNlJ1xuaW1wb3J0IHsgaG9tZUxhYmVscywgZ2V0TGFiZWwgfSBmcm9tICdAL3N0b3JlL2luaXRpYWwnXG5cblxuY29uc3QgSG9tZTogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IGV0aGVyc1N0YXRlID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmV0aGVyc1Byb3ZpZGVyKVxuICBjb25zdCBhY2NvdW50ID0gdXNlRXRoZXJzU3RhdGUocyA9PiBzLmFjY291bnQpXG4gIGNvbnN0IGNoYWluSWQgPSB1c2VFdGhlcnNTdGF0ZShzID0+IHMuY2hhaW5JZClcbiAgY29uc3Qgc3RhdGVJZCA9IHVzZUV0aGVyc1N0YXRlKHMgPT4gcy5zdGF0ZUlkKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIilcbiAgY29uc3QgdG9hc3QgPSB1c2VUb2FzdCgpXG5cbiAgY29uc3Qgc2hvd1RvYXN0ID0gdXNlQ2FsbGJhY2soKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHR5cGU6IEFsZXJ0U3RhdHVzID0gXCJzdWNjZXNzXCIpID0+IHtcbiAgICB0b2FzdCh7XG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXM6IHR5cGUsXG4gICAgICBkdXJhdGlvbjogNDAwMCxcbiAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgfSlcbiAgfSwgW3RvYXN0XSlcblxuICBjb25zdCBvbkJsb2NrRXZlbnQgPSAobnVtOiBudW1iZXIpID0+IHtcbiAgICBzaG93VG9hc3QoXCJOZXcgQmxvY2s6IFwiICsgbnVtKVxuICB9XG5cbiAgLy8gRGVib3VuY2UgaGFuZGxpbmcgY2hhbmdlcyB0byBhY2NvdW50cyBhbmQgYmxvY2tjaGFpbnNcbiAgdXNlRGVib3VuY2VkRWZmZWN0KCgpID0+IHtcbiAgICBldGhlcnNTdGF0ZT8ub24oXCJibG9ja1wiLCBvbkJsb2NrRXZlbnQpXG4gIH0sICgpID0+IHtcbiAgICBldGhlcnNTdGF0ZT8ub2ZmKFwiYmxvY2tcIiwgb25CbG9ja0V2ZW50KVxuICB9LCBbc3RhdGVJZCwgZXRoZXJzU3RhdGUsIHNob3dUb2FzdF0pXG5cbiAgY29uc29sZS5sb2coJ0JPT00nLCBhY2NvdW50ID09PSAnJyk7XG4gIHJldHVybiAoXG4gICAgPFZTdGFjayB3aWR0aD0nMTAwJScgPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT57aG9tZUxhYmVscy5wYWdlVGl0bGV9PC90aXRsZT5cbiAgICAgIDwvSGVhZD5cblxuICAgICAgPEZsZXhcbiAgICAgICAgd2lkdGg9JzEwMCUnXG4gICAgICAgIG1hcmdpbj17MH1cbiAgICAgICAgbWF4V2lkdGg9JzExNDBweCdcbiAgICAgICAgZmxleERpcmVjdGlvbj0nY29sdW1uJ1xuICAgICAgPlxuICAgICAgICB7ZXJyb3IgJiZcbiAgICAgICAgICA8QWxlcnQgc3RhdHVzPSdlcnJvcic+XG4gICAgICAgICAgICA8QWxlcnRJY29uIC8+XG4gICAgICAgICAgICA8QWxlcnRUaXRsZT5FcnJvciE8L0FsZXJ0VGl0bGU+XG4gICAgICAgICAgICA8QWxlcnREZXNjcmlwdGlvbj57ZXJyb3J9PC9BbGVydERlc2NyaXB0aW9uPlxuICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIH1cbiAgICAgICAgPEhlYWRpbmdcbiAgICAgICAgICB3aGl0ZVNwYWNlPSdwcmUtbGluZSdcbiAgICAgICAgICBmb250U2l6ZT0nODBweCdcbiAgICAgICAgICBmb250V2VpZ2h0PSc0MDAnXG4gICAgICAgICAgbGluZUhlaWdodD0nODBweCdcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nPScwcHgnXG4gICAgICAgICAgdGV4dEFsaWduPSdsZWZ0J1xuICAgICAgICAgIG15PXs0fVxuICAgICAgICAgIG1hcmdpbkJvdHRvbT0nNDhweCc+XG4gICAgICAgICAge2hvbWVMYWJlbHMubWFpblRpdGxlfVxuICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgIHsvKiB7YWNjb3VudCA9PT0gJycgJiZcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQ9J3JpZ2h0J1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9JzMyMXB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8V2FsbGV0SWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9JzcwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPScxNXB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodD0nMjBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPSdicmFuZC5ibGFjaydcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9J2JyYW5kLmphdmEnIHR5cGU9XCJidXR0b25cIiB3PScyMjVweCcgb25DbGljaz17KCkgPT4gZXRoZXJzU3RhdGU/LmNvbm5lY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9ob3Zlcj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiYnJhbmQuamF2YUhvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2hvbWVMYWJlbHMuY3RhQ29ubmVjdH1cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB7YWNjb3VudFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+TmV0d29yayBJbmZvPC9IZWFkaW5nPlxuICAgICAgICAgICAgPE5ldHdvcmtJbmZvIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cblxuICAgICAgICB7YWNjb3VudFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCcgdGV4dEFsaWduPVwiY2VudGVyXCI+R292ZXJuYW5jZSBUb2tlbjwvSGVhZGluZz5cbiAgICAgICAgICAgIDxSZWFkR292ZXJuYW5jZVRva2VuXG4gICAgICAgICAgICAgIGFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PiA6IFwiXCJ9XG4gICAgICAgIHthY2NvdW50XG4gICAgICAgICAgPyA8Qm94IG1iPXswfSBwPXs0fSB3PScxMDAlJyBib3JkZXJXaWR0aD1cIjFweFwiIGJvcmRlclJhZGl1cz1cImxnXCIgYm94U2hhZG93PSdtZCc+XG4gICAgICAgICAgICA8SGVhZGluZyBteT17NH0gZm9udFNpemU9J3hsJz5Cb3ggQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICA8UmVhZEJveFxuICAgICAgICAgICAgICBjdXJyZW50QWNjb3VudD17YWNjb3VudH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+IDogXCJcIn1cbiAgICAgICAge2FjY291bnQgJiYgY2hhaW5JZFxuICAgICAgICAgID8gPEJveCBtYj17MH0gcD17NH0gdz0nMTAwJScgYm9yZGVyV2lkdGg9XCIxcHhcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIGJveFNoYWRvdz0nbWQnPlxuICAgICAgICAgICAgPEhlYWRpbmcgbXk9ezR9IGZvbnRTaXplPSd4bCc+R292ZXJub3IgQ29udHJhY3Q8L0hlYWRpbmc+XG4gICAgICAgICAgICA8UmVhZEdvdmVybm9yQ29udHJhY3RcbiAgICAgICAgICAgICAgY2hhaW5JZD17Y2hhaW5JZH1cbiAgICAgICAgICAgICAgY3VycmVudEFjY291bnQ9e2FjY291bnR9XG4gICAgICAgICAgICAgIHRvYXN0PXtzaG93VG9hc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PiA6IFwiXCJ9ICovfVxuICAgICAgPC9GbGV4PlxuICAgIDwvVlN0YWNrPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWUiXSwibmFtZXMiOlsiSGVhZCIsIlZTdGFjayIsIkZsZXgiLCJIZWFkaW5nIiwiQWxlcnQiLCJBbGVydERlc2NyaXB0aW9uIiwiQWxlcnRJY29uIiwiQWxlcnRUaXRsZSIsInVzZVRvYXN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsInVzZUV0aGVyc1N0YXRlIiwidXNlRGVib3VuY2VkRWZmZWN0IiwiaG9tZUxhYmVscyIsIkhvbWUiLCJldGhlcnNTdGF0ZSIsInMiLCJldGhlcnNQcm92aWRlciIsImFjY291bnQiLCJjaGFpbklkIiwic3RhdGVJZCIsImVycm9yIiwic2V0RXJyb3IiLCJ0b2FzdCIsInNob3dUb2FzdCIsImRlc2NyaXB0aW9uIiwidHlwZSIsInN0YXR1cyIsImR1cmF0aW9uIiwiaXNDbG9zYWJsZSIsIm9uQmxvY2tFdmVudCIsIm51bSIsIm9uIiwib2ZmIiwiY29uc29sZSIsImxvZyIsIndpZHRoIiwidGl0bGUiLCJwYWdlVGl0bGUiLCJtYXJnaW4iLCJtYXhXaWR0aCIsImZsZXhEaXJlY3Rpb24iLCJ3aGl0ZVNwYWNlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibGluZUhlaWdodCIsImxldHRlclNwYWNpbmciLCJ0ZXh0QWxpZ24iLCJteSIsIm1hcmdpbkJvdHRvbSIsIm1haW5UaXRsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});