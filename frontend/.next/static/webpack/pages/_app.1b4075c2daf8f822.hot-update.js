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

/***/ "./src/store/initial.ts":
/*!******************************!*\
  !*** ./src/store/initial.ts ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"homeLabels\": function() { return /* binding */ homeLabels; },\n/* harmony export */   \"siteLayoutData\": function() { return /* binding */ siteLayoutData; }\n/* harmony export */ });\nvar siteLayoutData = {\n    title: \"Blockchain Jurisdictions \\n    & Land Registries\",\n    ctaConnect: \"Connect\"\n};\nvar homeLabels = {\n    pageTitle: \"Dashboard Jurisdiction\",\n    mainTitle: \"Welcome,\\n    Please connect your \\n    wallet to access the \\n    platform\",\n    dashBoardTitle: \"Welcome to your \\n    digital registries\",\n    ctaConnect: \"Connect with your Wallet\"\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUvaW5pdGlhbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQW9CTyxJQUFNQSxjQUFjLEdBQWtCO0lBQ3pDQyxLQUFLLEVBQUcsa0RBQ1M7SUFDakJDLFVBQVUsRUFBRSxTQUFTO0NBQ3hCLENBQUM7QUFFSyxJQUFNQyxVQUFVLEdBQWM7SUFDakNDLFNBQVMsRUFBRSx3QkFBd0I7SUFDbkNDLFNBQVMsRUFBRyw2RUFHSjtJQUNSQyxjQUFjLEVBQUcsMENBQ0M7SUFDbEJKLFVBQVUsRUFBRSwwQkFBMEI7Q0FFekMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3N0b3JlL2luaXRpYWwudHM/MjE0NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBzaXRlRGV0YXVsdHNEYXRhIH0gZnJvbSAnLi9sYXlvdXREYXRhJztcblxuaW50ZXJmYWNlIFNpdGVMYXlvdXREYXRhIHtcbiAgICB0aXRsZTogc3RyaW5nXG4gICAgY3RhQ29ubmVjdDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBTaXRlTGFiZWwge1xuICAgIHJlZ3VsYXI6IHN0cmluZ1xuICAgIHZpcDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBIb21lTGFiZWxzIHtcbiAgICBwYWdlVGl0bGU6IHN0cmluZ1xuICAgIG1haW5UaXRsZTogU2l0ZUxhYmVsXG4gICAgZGFzaEJvYXJkVGl0bGU6IHN0cmluZ1xuICAgIGN0YUNvbm5lY3Q6IHN0cmluZ1xufVxuXG5cbmV4cG9ydCBjb25zdCBzaXRlTGF5b3V0RGF0YTpTaXRlTGF5b3V0RGF0YSA9IHtcbiAgICB0aXRsZTogYEJsb2NrY2hhaW4gSnVyaXNkaWN0aW9ucyBcbiAgICAmIExhbmQgUmVnaXN0cmllc2AsXG4gICAgY3RhQ29ubmVjdDogJ0Nvbm5lY3QnLFxufTtcblxuZXhwb3J0IGNvbnN0IGhvbWVMYWJlbHM6SG9tZUxhYmVscyA9IHtcbiAgICBwYWdlVGl0bGU6ICdEYXNoYm9hcmQgSnVyaXNkaWN0aW9uJyxcbiAgICBtYWluVGl0bGU6IGBXZWxjb21lLFxuICAgIFBsZWFzZSBjb25uZWN0IHlvdXIgXG4gICAgd2FsbGV0IHRvIGFjY2VzcyB0aGUgXG4gICAgcGxhdGZvcm1gLFxuICAgIGRhc2hCb2FyZFRpdGxlOiBgV2VsY29tZSB0byB5b3VyIFxuICAgIGRpZ2l0YWwgcmVnaXN0cmllc2AsXG4gICAgY3RhQ29ubmVjdDogJ0Nvbm5lY3Qgd2l0aCB5b3VyIFdhbGxldCdcblxufVxuXG5cblxuIl0sIm5hbWVzIjpbInNpdGVMYXlvdXREYXRhIiwidGl0bGUiLCJjdGFDb25uZWN0IiwiaG9tZUxhYmVscyIsInBhZ2VUaXRsZSIsIm1haW5UaXRsZSIsImRhc2hCb2FyZFRpdGxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/store/initial.ts\n");

/***/ })

});