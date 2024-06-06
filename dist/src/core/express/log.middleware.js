"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.obfuscateObject = exports.initialize = void 0;
const expressWinston = require("express-winston");
const flat = require("flat");
const _ = require("lodash");
const logging_1 = require("../logging");
/**
 * Responsible for defining the obfuscation logic.
 * - '*' character - Obfuscate every char of the orig object property with '*'
 * - '#' character - Obfuscate the entire string of the orig object property with a single '#'
 * - '!' value - Blacklist the property, removing it entirely from the resulting object
 * Numbers, arrays and objects are obfuscated to a single '#'
 *
 * For example, the following request...
 * {
 *  "url": "/api/users",
 *  "headers": {
 *      "authorization": "aaaaa-bbbbb-ccccc-dddd-123456"
 *  },
 *  "body": {
 *      "userDetails": {
 *          "username": "john.snow@got.com",
 *          "password": "password",
 *          "gender": "male",
 *          "age": 17
 *      },
 *  }
 * }
 *
 * ... with the following obfRules object...
 * {
 *  "headers": {
 *      "authorization": "*"
 *  },
 *  "body": {
 *      "userDetails": {
 *          "username": "*",
 *          "password": "#",
 *          "gender": "!",
 *          "age": "*"
 *      }
 *  }
 * }
 *
 * ... will result in the following object log:
 * {
 *  "url": "/api/users",
 *  "headers": {
 *      "authorization": "*****************************"
 *  },
 *  "body": {
 *      "userDetails": {
 *          "username": "*****************",
 *          "password": "#",
 *          "age": "#"
 *      }
 *  }
 * }
 */
const _obfRules = {
    "headers": {
        "authorization": "*", // Obfuscate every char of 'headers.authorization' in the orig object with '*'
    },
    "body": {
        "userDetails": {
            "username": "*",
            "password": "#", // Obfuscate the entire string from 'body.userDetails.password' with a single '#'
            "notificationsToken": "*",
            "restorationCode": "*"
        },
        "restorationCode": "#",
        "password": "#",
        "accessToken": "*",
        "refreshToken": "*",
        "securityCode": "*",
        "oldPassword": "#",
        "oldRestorationCode": "#",
        "newPassword": "#",
        "applicant": {
            "dob": "*",
        },
        "addresses": "#",
    }
};
const defaults = {
    reqFilter: ["url", "headers", "method", "httpVersion", "originalUrl", "query", "body"],
    resFilter: ["statusCode", "body"],
    ignoreRoute: ["docs"],
    obfuscate: false
};
/**
 * Logs request/response objects. Allows for obfuscation of request/response objects.
 *
 * @param options - Specify which properties to log from the request/response.
 * @param obfRules - Specify which properties to obfuscate. Only applies if 'obfuscate' is set to true.
 */
function initialize(options = defaults, obfRules = _obfRules) {
    options = _.merge({}, defaults, options);
    return (req, res, next) => {
        logRequest(req, options, obfRules); // Manually log the request immediately.
        return logWinstonResponse(req, res, next, options, obfRules); // Use 'express-winston' for logging the response.
    };
}
exports.initialize = initialize;
function logRequest(req, options, obfRules) {
    if (!_.some(options.ignoreRoute, (u) => req.originalUrl.includes(u))) {
        const filteredRequest = _
            .chain(req)
            .pick(options.reqFilter)
            .cloneDeep()
            .value();
        const meta = options.obfuscate ? obfuscateObject(filteredRequest, obfRules) : filteredRequest;
        /* Logger.info({
            meta,
            message: "Request started."
        }); */
        logging_1.Logger.info({
            message: "Request started."
        });
    }
}
function logWinstonResponse(req, res, next, options, obfRules) {
    return expressWinston.logger({
        winstonInstance: logging_1.Logger.logger,
        requestFilter: () => { return undefined; }, // We do not care about logging the request again with the response
        responseWhitelist: options.resFilter,
        responseFilter: (res, propName) => {
            return options.obfuscate ? obfuscateObject(_.cloneDeep(res), obfRules)[propName] : res[propName];
        },
        dynamicMeta: (req) => { return { requestId: req.body.requestId }; }, // Add requestId in the response if present
        ignoreRoute: (req) => { return _.some(options.ignoreRoute, (u) => req.originalUrl.includes(u)); }
    })(req, res, next);
}
function obfuscateObject(orig, rules) {
    const singleCharObf = "#";
    const multipleCharObf = "*";
    return _.reduce(_.keys(flat(rules)), (prev, ruleKey) => {
        const origValue = _.get(prev, ruleKey);
        // No such field exists in the orig object or it is an empty string. Return without mutating.
        if (origValue === undefined || origValue === "") {
            return prev;
        }
        const ruleValue = _.get(rules, ruleKey, singleCharObf);
        // Blacklist fields with value "!"
        if (ruleValue === "!") {
            return _.omit(prev, ruleKey);
        }
        // Obfuscate strings with chars per every element depending on rule value
        if (_.isString(origValue)) {
            const parsed = ruleValue === multipleCharObf ? origValue.replace(/./g, multipleCharObf) : singleCharObf;
            return _.set(prev, ruleKey, parsed);
        }
        // Obfuscate numbers, booleans, objects and arrays with a single char.
        return _.set(prev, ruleKey, singleCharObf);
    }, orig);
}
exports.obfuscateObject = obfuscateObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9leHByZXNzL2xvZy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBR0gsa0RBQWtEO0FBQ2xELDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUIsd0NBQW9DO0FBR3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RHO0FBQ0gsTUFBTSxTQUFTLEdBQUc7SUFDZCxTQUFTLEVBQUU7UUFDUCxlQUFlLEVBQUUsR0FBRyxFQUFFLDhFQUE4RTtLQUN2RztJQUNELE1BQU0sRUFBRTtRQUNKLGFBQWEsRUFBRTtZQUNYLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUcsRUFBRSxpRkFBaUY7WUFDbEcsb0JBQW9CLEVBQUUsR0FBRztZQUN6QixpQkFBaUIsRUFBRSxHQUFHO1NBQ3pCO1FBQ0QsaUJBQWlCLEVBQUUsR0FBRztRQUN0QixVQUFVLEVBQUUsR0FBRztRQUNmLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLGNBQWMsRUFBRSxHQUFHO1FBQ25CLGNBQWMsRUFBRSxHQUFHO1FBQ25CLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLG9CQUFvQixFQUFFLEdBQUc7UUFDekIsYUFBYSxFQUFFLEdBQUc7UUFDbEIsV0FBVyxFQUFFO1lBQ1QsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELFdBQVcsRUFBRSxHQUFHO0tBQ25CO0NBQ0osQ0FBQztBQXNCRixNQUFNLFFBQVEsR0FBeUI7SUFDbkMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3RGLFNBQVMsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7SUFDakMsV0FBVyxFQUFFLENBQUMsTUFB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b3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgZXhwcmVzc1dpbnN0b24gZnJvbSBcImV4cHJlc3Mtd2luc3RvblwiO1xyXG5pbXBvcnQgKiBhcyBmbGF0IGZyb20gXCJmbGF0XCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2luZ1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXNwb25zaWJsZSBmb3IgZGVmaW5pbmcgdGhlIG9iZnVzY2F0aW9uIGxvZ2ljLlxyXG4gKiAtICcqJyBjaGFyYWN0ZXIgLSBPYmZ1c2NhdGUgZXZlcnkgY2hhciBvZiB0aGUgb3JpZyBvYmplY3QgcHJvcGVydHkgd2l0aCAnKidcclxuICogLSAnIycgY2hhcmFjdGVyIC0gT2JmdXNjYXRlIHRoZSBlbnRpcmUgc3RyaW5nIG9mIHRoZSBvcmlnIG9iamVjdCBwcm9wZXJ0eSB3aXRoIGEgc2luZ2xlICcjJ1xyXG4gKiAtICchJyB2YWx1ZSAtIEJsYWNrbGlzdCB0aGUgcHJvcGVydHksIHJlbW92aW5nIGl0IGVudGlyZWx5IGZyb20gdGhlIHJlc3VsdGluZyBvYmplY3RcclxuICogTnVtYmVycywgYXJyYXlzIGFuZCBvYmplY3RzIGFyZSBvYmZ1c2NhdGVkIHRvIGEgc2luZ2xlICcjJ1xyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyByZXF1ZXN0Li4uXHJcbiAqIHtcclxuICogIFwidXJsXCI6IFwiL2FwaS91c2Vyc1wiLFxyXG4gKiAgXCJoZWFkZXJzXCI6IHtcclxuICogICAgICBcImF1dGhvcml6YXRpb25cIjogXCJhYWFhYS1iYmJiYi1jY2NjYy1kZGRkLTEyMzQ1NlwiXHJcbiAqICB9LFxyXG4gKiAgXCJib2R5XCI6IHtcclxuICogICAgICBcInVzZXJEZXRhaWxzXCI6IHtcclxuICogICAgICAgICAgXCJ1c2VybmFtZVwiOiBcImpvaG4uc25vd0Bnb3QuY29tXCIsXHJcbiAqICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJwYXNzd29yZFwiLFxyXG4gKiAgICAgICAgICBcImdlbmRlclwiOiBcIm1hbGVcIixcclxuICogICAgICAgICAgXCJhZ2VcIjogMTdcclxuICogICAgICB9LFxyXG4gKiAgfVxyXG4gKiB9XHJcbiAqXHJcbiAqIC4uLiB3aXRoIHRoZSBmb2xsb3dpbmcgb2JmUnVsZXMgb2JqZWN0Li4uXHJcbiAqIHtcclxuICogIFwiaGVhZGVyc1wiOiB7XHJcbiAqICAgICAgXCJhdXRob3JpemF0aW9uXCI6IFwiKlwiXHJcbiAqICB9LFxyXG4gKiAgXCJib2R5XCI6IHtcclxuICogICAgICBcInVzZXJEZXRhaWxzXCI6IHtcclxuICogICAgICAgICAgXCJ1c2VybmFtZVwiOiBcIipcIixcclxuICogICAgICAgICAgXCJwYXNzd29yZFwiOiBcIiNcIixcclxuICogICAgICAgICAgXCJnZW5kZXJcIjogXCIhXCIsXHJcbiAqICAgICAgICAgIFwiYWdlXCI6IFwiKlwiXHJcbiAqICAgICAgfVxyXG4gKiAgfVxyXG4gKiB9XHJcbiAqXHJcbiAqIC4uLiB3aWxsIHJlc3VsdCBpbiB0aGUgZm9sbG93aW5nIG9iamVjdCBsb2c6XHJcbiAqIHtcclxuICogIFwidXJsXCI6IFwiL2FwaS91c2Vyc1wiLFxyXG4gKiAgXCJoZWFkZXJzXCI6IHtcclxuICogICAgICBcImF1dGhvcml6YXRpb25cIjogXCIqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiXHJcbiAqICB9LFxyXG4gKiAgXCJib2R5XCI6IHtcclxuICogICAgICBcInVzZXJEZXRhaWxzXCI6IHtcclxuICogICAgICAgICAgXCJ1c2VybmFtZVwiOiBcIioqKioqKioqKioqKioqKioqXCIsXHJcbiAqICAgICAgICAgIFwicGFzc3dvcmRcIjogXCIjXCIsXHJcbiAqICAgICAgICAgIFwiYWdlXCI6IFwiI1wiXHJcbiAqICAgICAgfVxyXG4gKiAgfVxyXG4gKiB9XHJcbiAqL1xyXG5jb25zdCBfb2JmUnVsZXMgPSB7XHJcbiAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgIFwiYXV0aG9yaXphdGlvblwiOiBcIipcIiwgLy8gT2JmdXNjYXRlIGV2ZXJ5IGNoYXIgb2YgJ2hlYWRlcnMuYXV0aG9yaXphdGlvbicgaW4gdGhlIG9yaWcgb2JqZWN0IHdpdGggJyonXHJcbiAgICB9LFxyXG4gICAgXCJib2R5XCI6IHtcclxuICAgICAgICBcInVzZXJEZXRhaWxzXCI6IHtcclxuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcIipcIixcclxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIiNcIiwgLy8gT2JmdXNjYXRlIHRoZSBlbnRpcmUgc3RyaW5nIGZyb20gJ2JvZHkudXNlckRldGFpbHMucGFzc3dvcmQnIHdpdGggYSBzaW5nbGUgJyMnXHJcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uc1Rva2VuXCI6IFwiKlwiLFxyXG4gICAgICAgICAgICBcInJlc3RvcmF0aW9uQ29kZVwiOiBcIipcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN0b3JhdGlvbkNvZGVcIjogXCIjXCIsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiOiBcIiNcIixcclxuICAgICAgICBcImFjY2Vzc1Rva2VuXCI6IFwiKlwiLFxyXG4gICAgICAgIFwicmVmcmVzaFRva2VuXCI6IFwiKlwiLFxyXG4gICAgICAgIFwic2VjdXJpdHlDb2RlXCI6IFwiKlwiLFxyXG4gICAgICAgIFwib2xkUGFzc3dvcmRcIjogXCIjXCIsXHJcbiAgICAgICAgXCJvbGRSZXN0b3JhdGlvbkNvZGVcIjogXCIjXCIsXHJcbiAgICAgICAgXCJuZXdQYXNzd29yZFwiOiBcIiNcIixcclxuICAgICAgICBcImFwcGxpY2FudFwiOiB7XHJcbiAgICAgICAgICAgIFwiZG9iXCI6IFwiKlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhZGRyZXNzZXNcIjogXCIjXCIsXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ01pZGRsZXdhcmVPcHRpb25zIHtcclxuICAgIC8qKiBQcm9wZXJ0aWVzIHRvIGxvZyBmcm9tIHRoZSByZXF1ZXN0OlxyXG4gICAgICogQGRlZmF1bHQgW1widXJsXCIsIFwiaGVhZGVyc1wiLCBcIm1ldGhvZFwiLCBcImh0dHBWZXJzaW9uXCIsIFwib3JpZ2luYWxVcmxcIiwgXCJxdWVyeVwiLCBcImJvZHlcIl1cclxuICAgICAqL1xyXG4gICAgcmVxRmlsdGVyPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIC8qKiBQcm9wZXJ0aWVzIHRvIGxvZyBmcm9tIHRoZSByZXNwb25zZTpcclxuICAgICAqIEBkZWZhdWx0IFtcInN0YXR1c0NvZGVcIiwgXCJib2R5XCJdXHJcbiAgICAgKi9cclxuICAgIHJlc0ZpbHRlcj86IEFycmF5PHN0cmluZz47XHJcbiAgICAvKiogSWdub3JlIHJlcXVlc3RzIG9uIHRoZSBmb2xsb3dpbmcgcm91dGVzOlxyXG4gICAgICogQGRlZmF1bHQgW1wiZG9jc1wiXVxyXG4gICAgICovXHJcbiAgICBpZ25vcmVSb3V0ZT86IEFycmF5PHN0cmluZz47XHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZS9kaXNhYmxlIG9iZnVzY2F0aW9uIG9uIHByb3BlcnRpZXMuXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBvYmZ1c2NhdGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0czogTG9nTWlkZGxld2FyZU9wdGlvbnMgPSB7XHJcbiAgICByZXFGaWx0ZXI6IFtcInVybFwiLCBcImhlYWRlcnNcIiwgXCJtZXRob2RcIiwgXCJodHRwVmVyc2lvblwiLCBcIm9yaWdpbmFsVXJsXCIsIFwicXVlcnlcIiwgXCJib2R5XCJdLFxyXG4gICAgcmVzRmlsdGVyOiBbXCJzdGF0dXNDb2RlXCIsIFwiYm9keVwiXSxcclxuICAgIGlnbm9yZVJvdXRlOiBbXCJkb2NzXCJdLFxyXG4gICAgb2JmdXNjYXRlOiBmYWxzZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvZ3MgcmVxdWVzdC9yZXNwb25zZSBvYmplY3RzLiBBbGxvd3MgZm9yIG9iZnVzY2F0aW9uIG9mIHJlcXVlc3QvcmVzcG9uc2Ugb2JqZWN0cy5cclxuICpcclxuICogQHBhcmFtIG9wdGlvbnMgLSBTcGVjaWZ5IHdoaWNoIHByb3BlcnRpZXMgdG8gbG9nIGZyb20gdGhlIHJlcXVlc3QvcmVzcG9uc2UuXHJcbiAqIEBwYXJhbSBvYmZSdWxlcyAtIFNwZWNpZnkgd2hpY2ggcHJvcGVydGllcyB0byBvYmZ1c2NhdGUuIE9ubHkgYXBwbGllcyBpZiAnb2JmdXNjYXRlJyBpcyBzZXQgdG8gdHJ1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKG9wdGlvbnM6IExvZ01pZGRsZXdhcmVPcHRpb25zID0gZGVmYXVsdHMsIG9iZlJ1bGVzOiBPYmplY3QgPSBfb2JmUnVsZXMpIHtcclxuICAgIG9wdGlvbnMgPSBfLm1lcmdlKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgIGxvZ1JlcXVlc3QocmVxLCBvcHRpb25zLCBvYmZSdWxlcyk7IC8vIE1hbnVhbGx5IGxvZyB0aGUgcmVxdWVzdCBpbW1lZGlhdGVseS5cclxuICAgICAgICByZXR1cm4gbG9nV2luc3RvblJlc3BvbnNlKHJlcSwgcmVzLCBuZXh0LCBvcHRpb25zLCBvYmZSdWxlcyk7IC8vIFVzZSAnZXhwcmVzcy13aW5zdG9uJyBmb3IgbG9nZ2luZyB0aGUgcmVzcG9uc2UuXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2dSZXF1ZXN0KHJlcTogUmVxdWVzdCwgb3B0aW9uczogTG9nTWlkZGxld2FyZU9wdGlvbnMsIG9iZlJ1bGVzOiBPYmplY3QpOiB2b2lkIHtcclxuICAgIGlmICghXy5zb21lKG9wdGlvbnMuaWdub3JlUm91dGUsICh1KSA9PiByZXEub3JpZ2luYWxVcmwuaW5jbHVkZXModSkpKSB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWRSZXF1ZXN0ID0gX1xyXG4gICAgICAgICAgICAuY2hhaW4ocmVxKVxyXG4gICAgICAgICAgICAucGljayhvcHRpb25zLnJlcUZpbHRlcilcclxuICAgICAgICAgICAgLmNsb25lRGVlcCgpXHJcbiAgICAgICAgICAgIC52YWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IG1ldGEgPSBvcHRpb25zLm9iZnVzY2F0ZSA/IG9iZnVzY2F0ZU9iamVjdChmaWx0ZXJlZFJlcXVlc3QsIG9iZlJ1bGVzKSA6IGZpbHRlcmVkUmVxdWVzdDtcclxuICAgICAgICAvKiBMb2dnZXIuaW5mbyh7XHJcbiAgICAgICAgICAgIG1ldGEsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVxdWVzdCBzdGFydGVkLlwiXHJcbiAgICAgICAgfSk7ICovXHJcbiAgICAgICAgTG9nZ2VyLmluZm8oe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlJlcXVlc3Qgc3RhcnRlZC5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2dXaW5zdG9uUmVzcG9uc2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24sIG9wdGlvbnM6IExvZ01pZGRsZXdhcmVPcHRpb25zLCBvYmZSdWxlczogT2JqZWN0KSB7XHJcbiAgICByZXR1cm4gZXhwcmVzc1dpbnN0b24ubG9nZ2VyKHtcclxuICAgICAgICB3aW5zdG9uSW5zdGFuY2U6IExvZ2dlci5sb2dnZXIsXHJcbiAgICAgICAgcmVxdWVzdEZpbHRlcjogKCkgPT4geyByZXR1cm4gdW5kZWZpbmVkOyB9LCAvLyBXZSBkbyBub3QgY2FyZSBhYm91dCBsb2dnaW5nIHRoZSByZXF1ZXN0IGFnYWluIHdpdGggdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgcmVzcG9uc2VXaGl0ZWxpc3Q6IG9wdGlvbnMucmVzRmlsdGVyLFxyXG4gICAgICAgIHJlc3BvbnNlRmlsdGVyOiAocmVzLCBwcm9wTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5vYmZ1c2NhdGUgPyBvYmZ1c2NhdGVPYmplY3QoXy5jbG9uZURlZXAocmVzKSwgb2JmUnVsZXMpW3Byb3BOYW1lXSA6IHJlc1twcm9wTmFtZV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkeW5hbWljTWV0YTogKHJlcSkgPT4geyByZXR1cm4geyByZXF1ZXN0SWQ6IHJlcS5ib2R5LnJlcXVlc3RJZCB9OyB9LCAvLyBBZGQgcmVxdWVzdElkIGluIHRoZSByZXNwb25zZSBpZiBwcmVzZW50XHJcbiAgICAgICAgaWdub3JlUm91dGU6IChyZXEpID0+IHsgcmV0dXJuIF8uc29tZShvcHRpb25zLmlnbm9yZVJvdXRlLCAodSkgPT4gcmVxLm9yaWdpbmFsVXJsLmluY2x1ZGVzKHUpKTsgfVxyXG4gICAgfSkocmVxLCByZXMsIG5leHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb2JmdXNjYXRlT2JqZWN0KG9yaWc6IE9iamVjdCwgcnVsZXM6IE9iamVjdCk6IGFueSB7XHJcbiAgICBjb25zdCBzaW5nbGVDaGFyT2JmID0gXCIjXCI7XHJcbiAgICBjb25zdCBtdWx0aXBsZUNoYXJPYmYgPSBcIipcIjtcclxuICAgIHJldHVybiBfLnJlZHVjZShfLmtleXMoZmxhdChydWxlcykpLCAocHJldiwgcnVsZUtleSk6IGFueSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ1ZhbHVlID0gXy5nZXQocHJldiwgcnVsZUtleSk7XHJcblxyXG4gICAgICAgIC8vIE5vIHN1Y2ggZmllbGQgZXhpc3RzIGluIHRoZSBvcmlnIG9iamVjdCBvciBpdCBpcyBhbiBlbXB0eSBzdHJpbmcuIFJldHVybiB3aXRob3V0IG11dGF0aW5nLlxyXG4gICAgICAgIGlmIChvcmlnVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnVmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBydWxlVmFsdWUgPSBfLmdldChydWxlcywgcnVsZUtleSwgc2luZ2xlQ2hhck9iZik7XHJcbiAgICAgICAgLy8gQmxhY2tsaXN0IGZpZWxkcyB3aXRoIHZhbHVlIFwiIVwiXHJcbiAgICAgICAgaWYgKHJ1bGVWYWx1ZSA9PT0gXCIhXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8ub21pdChwcmV2LCBydWxlS2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9iZnVzY2F0ZSBzdHJpbmdzIHdpdGggY2hhcnMgcGVyIGV2ZXJ5IGVsZW1lbnQgZGVwZW5kaW5nIG9uIHJ1bGUgdmFsdWVcclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhvcmlnVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHJ1bGVWYWx1ZSA9PT0gbXVsdGlwbGVDaGFyT2JmID8gb3JpZ1ZhbHVlLnJlcGxhY2UoLy4vZywgbXVsdGlwbGVDaGFyT2JmKSA6IHNpbmdsZUNoYXJPYmY7XHJcbiAgICAgICAgICAgIHJldHVybiBfLnNldChwcmV2LCBydWxlS2V5LCBwYXJzZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2JmdXNjYXRlIG51bWJlcnMsIGJvb2xlYW5zLCBvYmplY3RzIGFuZCBhcnJheXMgd2l0aCBhIHNpbmdsZSBjaGFyLlxyXG4gICAgICAgIHJldHVybiBfLnNldChwcmV2LCBydWxlS2V5LCBzaW5nbGVDaGFyT2JmKTtcclxuICAgIH0sIG9yaWcpO1xyXG59Il19