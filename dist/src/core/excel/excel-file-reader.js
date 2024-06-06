"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelFileReader = void 0;
const xlsx = require("xlsx");
const _ = require("lodash");
const logging_1 = require("../logging");
class ExcelFileReader {
    static readFileAsJSON(filename) {
        const workbook = xlsx.readFile(filename);
        const sheetNameList = workbook.SheetNames;
        return _.map(sheetNameList, function (sheetName) {
            return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        });
    }
    static readFile(filename) {
        return xlsx.readFile(filename);
    }
    static buildObjectRow(worksheet, r, rowIndex, cols, header, hdr, isWorksheetArray, options, mapObject) {
        var rr = xlsx.utils.encode_row(rowIndex);
        var defval = options.defval, raw = options.raw || !Object.prototype.hasOwnProperty.call(options, "raw");
        var isEmpty = true;
        var row = (header === 1) ? [] : {};
        if (header !== 1) {
            if (Object.defineProperty) {
                try {
                    Object.defineProperty(row, '__rowNum__', { value: rowIndex, enumerable: false });
                }
                catch (e) {
                    row.__rowNum__ = rowIndex;
                }
            }
            else
                row.__rowNum__ = rowIndex;
        }
        if (!isWorksheetArray || worksheet[rowIndex])
            for (var C = r.s.c; C <= r.e.c; ++C) {
                var val = isWorksheetArray ? worksheet[rowIndex][C] : worksheet[cols[C] + rr];
                if (val === undefined || val.t === undefined) {
                    if (defval === undefined) {
                        continue;
                    }
                    if (hdr[C] != null) {
                        row[hdr[C]] = defval;
                    }
                    continue;
                }
                var v = val.v;
                switch (val.t) {
                    case 'z':
                        if (v == null)
                            break;
                        continue;
                    case 'e':
                        v = void 0;
                        break;
                    case 's':
                    case 'd':
                    case 'b':
                    case 'n': break;
                    default: throw new Error('unrecognized type ' + val.t);
                }
                if (hdr[C] != null) {
                    if (v == null) {
                        if (defval !== undefined) {
                            row[hdr[C]] = defval;
                        }
                        else if (raw && v === null) {
                            row[hdr[C]] = null;
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        row[hdr[C]] = raw ? v : xlsx.utils.format_cell(val, v, options);
                    }
                    if (v != null) {
                        isEmpty = false;
                    }
                }
            }
        if (!isEmpty) {
            row = mapObject(row);
        }
        return { row: row, isEmpty: isEmpty };
    }
    static sheetToObjectArray(workbook, sheetName, mapObject, overrideRange, overrideHeader) {
        const self = this;
        // Options (https://docs.sheetjs.com/#json)
        const options = {
            // Use raw values (true) or formatted strings (false)
            raw: true,
            /* Override Range
             *	number:	Use worksheet range but set starting row to the value
             *	string: Use specified range(A1 - style bounded range string)
             *	default: Use worksheet range(ws['!ref'])
            */
            range: overrideRange,
            /* Control output format
             *	1: Generate an array of arrays
             *	'A': Row object keys are literal column labels
             *	string[]: Use specified strings as keys in row objects
             *	default: Read and disambiguate first row as keys
            */
            header: overrideHeader,
            /* Control date format
             *	string: Use specified date format in string output
             *	default: FMT 14
            */
            dateNF: null,
            // Use specified value in place of null or undefined
            defval: null,
            /* Include blank lines in the output **
             *	true: Include blank lines
             *	false: Skip blank lines
            */
            blankrows: true
        };
        var worksheet = workbook.Sheets[sheetName];
        if (worksheet == null || worksheet["!ref"] == null)
            return [];
        // Defaults
        var val = { t: 'n', v: 0 }, header = 0, offset = 1, hdr = [], v = 0, vv = "";
        // Range start and end defaults
        var r = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
        var range = options.range != null ? options.range : worksheet["!ref"];
        logging_1.Logger.debug(`Range options.range: ${options.range} with worksheet reference: ${worksheet["!ref"]}`);
        switch (typeof range) {
            case 'string':
                r = xlsx.utils.decode_range(range);
                break;
            case 'number':
                r = xlsx.utils.decode_range(worksheet["!ref"]);
                r.s.r = range;
                break;
            default: r = range;
        }
        if (options.header === 1) {
            header = 1;
        }
        else if (options.header === "A") {
            header = 2;
        }
        else if (Array.isArray(options.header)) {
            header = 3;
        }
        else if (options.header == null) {
            header = 0;
        }
        if (header > 0) {
            offset = 0;
        }
        var rr = xlsx.utils.encode_row(r.s.r);
        logging_1.Logger.debug(`Range row: ${rr} with start index: ${r.s.r} - end index: ${r.e.r}`);
        logging_1.Logger.debug(`Range column: start index: ${r.s.c} - end index: ${r.e.c}`);
        var cols = [];
        var out = [];
        var outIndex = 0, counter = 0;
        var isWorksheetArray = Array.isArray(worksheet);
        var rowIndex = r.s.r, columnIndex = 0, CC = 0;
        if (isWorksheetArray && !worksheet[rowIndex]) {
            worksheet[rowIndex] = [];
        }
        for (columnIndex = r.s.c; columnIndex <= r.e.c; ++columnIndex) {
            cols[columnIndex] = xlsx.utils.encode_col(columnIndex);
            val = isWorksheetArray ? worksheet[rowIndex][columnIndex] : worksheet[cols[columnIndex] + rr];
            switch (header) {
                case 1:
                    hdr[columnIndex] = columnIndex - r.s.c;
                    break;
                case 2:
                    hdr[columnIndex] = cols[columnIndex];
                    break;
                case 3:
                    hdr[columnIndex] = options.header[columnIndex - r.s.c];
                    break;
                default:
                    if (val == null) {
                        val.w = "__EMPTY";
                        val.t = "s";
                    }
                    vv = xlsx.utils.format_cell(val, null, options);
                    v = Number(vv);
                    counter = 0;
                    for (CC = 0; CC < hdr.length; ++CC) {
                        if (hdr[CC] == vv) {
                            vv = v + "_" + (++counter);
                        }
                    }
                    hdr[columnIndex] = vv;
            }
        }
        for (rowIndex = r.s.r + offset; rowIndex <= r.e.r; ++rowIndex) {
            var row = self.buildObjectRow(worksheet, r, rowIndex, cols, header, hdr, isWorksheetArray, options, mapObject);
            if ((row.isEmpty === false) || (header === 1 ? options.blankrows !== false : !!options.blankrows)) {
                out[outIndex++] = row.row;
            }
        }
        out.length = outIndex;
        return out;
    }
}
exports.ExcelFileReader = ExcelFileReader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtZmlsZS1yZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9leGNlbC9leGNlbC1maWxlLXJlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUIsd0NBQW9DO0FBT3BDLE1BQWEsZUFBZTtJQUN4QixNQUFNLENBQUMsY0FBYyxDQUFDLFFBQWdCO1FBQ2xDLE1BQU0sUUFBUSxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFMUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLFNBQVM7WUFDM0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFnQjtRQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxjQUFjLENBQUksU0FBeUIsRUFBRSxDQUFNLEVBQUUsUUFBZ0IsRUFBRSxJQUFXLEVBQUUsTUFBYyxFQUFFLEdBQVUsRUFBRSxnQkFBeUIsRUFBRSxPQUFZLEVBQUUsU0FBNkI7UUFFcE0sSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUs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QUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDM0IsQ0FBQztRQUNGLENBQUM7UUFDRCxHQUFHLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7Q0FDRDtBQW5NRCwwQ0FtTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIwIENvZGV2IFRlY2hub2xvZ2llcyAoUHR5KSBMdGQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgeGxzeCBmcm9tIFwieGxzeFwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dpbmdcIjtcclxuXHJcbmludGVyZmFjZSBPYmplY3RSb3cgPFQ+IHtcclxuXHRpc0VtcHR5OiBib29sZWFuO1xyXG5cdHJvdzogVDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4Y2VsRmlsZVJlYWRlciB7XHJcbiAgICBzdGF0aWMgcmVhZEZpbGVBc0pTT04oZmlsZW5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHdvcmtib29rOiB4bHN4LldvcmtCb29rID0geGxzeC5yZWFkRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgICAgY29uc3Qgc2hlZXROYW1lTGlzdCA9IHdvcmtib29rLlNoZWV0TmFtZXM7XHJcblxyXG4gICAgICAgIHJldHVybiBfLm1hcChzaGVldE5hbWVMaXN0LCBmdW5jdGlvbiAoc2hlZXROYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4bHN4LnV0aWxzLnNoZWV0X3RvX2pzb24od29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlYWRGaWxlKGZpbGVuYW1lOiBzdHJpbmcpIHtcclxuXHRcdHJldHVybiB4bHN4LnJlYWRGaWxlKGZpbGVuYW1lKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIGJ1aWxkT2JqZWN0Um93PFQ+KHdvcmtzaGVldDogeGxzeC5Xb3JrU2hlZXQsIHI6IGFueSwgcm93SW5kZXg6IG51bWJlciwgY29sczogYW55W10sIGhlYWRlcjogbnVtYmVyLCBoZHI6IGFueVtdLCBpc1dvcmtzaGVldEFycmF5OiBib29sZWFuLCBvcHRpb25zOiBhbnksIG1hcE9iamVjdDogKG9iamVjdDogYW55KSA9PiBUKTogT2JqZWN0Um93PFQ+IHtcclxuXHJcblx0XHR2YXIgcnIgPSB4bHN4LnV0aWxzLmVuY29kZV9yb3cocm93SW5kZXgpO1xyXG5cdFx0dmFyIGRlZnZhbCA9IG9wdGlvbnMuZGVmdmFsLCByYXcgPSBvcHRpb25zLnJhdyB8fCAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIFwicmF3XCIpO1xyXG5cdFx0dmFyIGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0dmFyIHJvdzogYW55ID0gKGhlYWRlciA9PT0gMSkgPyBbXSA6IHt9O1xyXG5cdFx0aWYgKGhlYWRlciAhPT0gMSkge1xyXG5cdFx0XHRpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyb3csICdfX3Jvd051bV9fJywgeyB2YWx1ZTogcm93SW5kZXgsIGVudW1lcmFibGU6IGZhbHNlIH0pO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdHJvdy5fX3Jvd051bV9fID0gcm93SW5kZXg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Ugcm93Ll9fcm93TnVtX18gPSByb3dJbmRleDtcclxuXHRcdH1cclxuXHRcdGlmICghaXNXb3Jrc2hlZXRBcnJheSB8fCB3b3Jrc2hlZXRbcm93SW5kZXhdKSBmb3IgKHZhciBDID0gci5zLmM7IEMgPD0gci5lLmM7ICsrQykge1xyXG5cdFx0XHR2YXIgdmFsID0gaXNXb3Jrc2hlZXRBcnJheSA/IHdvcmtzaGVldFtyb3dJbmRleF1bQ10gOiB3b3Jrc2hlZXRbY29sc1tDXSArIHJyXTtcclxuXHRcdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRpZiAoZGVmdmFsID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoaGRyW0NdICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHJvd1toZHJbQ11dID0gZGVmdmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgdiA9IHZhbC52O1xyXG5cdFx0XHRzd2l0Y2ggKHZhbC50KSB7XHJcblx0XHRcdFx0Y2FzZSAneic6IGlmICh2ID09IG51bGwpIGJyZWFrOyBjb250aW51ZTtcclxuXHRcdFx0XHRjYXNlICdlJzogdiA9IHZvaWQgMDsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncyc6IGNhc2UgJ2QnOiBjYXNlICdiJzogY2FzZSAnbic6IGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHR5cGUgJyArIHZhbC50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaGRyW0NdICE9IG51bGwpIHtcclxuXHRcdFx0XHRpZiAodiA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRpZiAoZGVmdmFsICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0cm93W2hkcltDXV0gPSBkZWZ2YWw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChyYXcgJiYgdiA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRyb3dbaGRyW0NdXSA9IG51bGw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJvd1toZHJbQ11dID0gcmF3ID8gdiA6IHhsc3gudXRpbHMuZm9ybWF0X2NlbGwodmFsLCB2LCBvcHRpb25zKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh2ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWlzRW1wdHkpIHtcclxuXHRcdFx0cm93ID0gbWFwT2JqZWN0KHJvdyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHsgcm93OiByb3csIGlzRW1wdHk6IGlzRW1wdHkgfTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzaGVldFRvT2JqZWN0QXJyYXk8VD4od29ya2Jvb2s6IHhsc3guV29ya0Jvb2ssIHNoZWV0TmFtZTogc3RyaW5nLCBtYXBPYmplY3Q6IChvYmplY3Q6IGFueSkgPT4gVCwgb3ZlcnJpZGVSYW5nZT86IGFueSwgb3ZlcnJpZGVIZWFkZXI/OiBhbnkpOiBUW10ge1xyXG5cclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9wdGlvbnMgKGh0dHBzOi8vZG9jcy5zaGVldGpzLmNvbS8janNvbilcclxuXHRcdGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcclxuXHRcdFx0Ly8gVXNlIHJhdyB2YWx1ZXMgKHRydWUpIG9yIGZvcm1hdHRlZCBzdHJpbmdzIChmYWxzZSlcclxuXHRcdFx0cmF3OiB0cnVlLFxyXG5cdFx0XHQvKiBPdmVycmlkZSBSYW5nZSBcclxuXHRcdFx0ICpcdG51bWJlcjpcdFVzZSB3b3Jrc2hlZXQgcmFuZ2UgYnV0IHNldCBzdGFydGluZyByb3cgdG8gdGhlIHZhbHVlXHJcblx0XHRcdCAqXHRzdHJpbmc6IFVzZSBzcGVjaWZpZWQgcmFuZ2UoQTEgLSBzdHlsZSBib3VuZGVkIHJhbmdlIHN0cmluZylcclxuXHRcdFx0ICpcdGRlZmF1bHQ6IFVzZSB3b3Jrc2hlZXQgcmFuZ2Uod3NbJyFyZWYnXSlcclxuXHRcdFx0Ki9cclxuXHRcdFx0cmFuZ2U6IG92ZXJyaWRlUmFuZ2UsXHJcblx0XHRcdC8qIENvbnRyb2wgb3V0cHV0IGZvcm1hdCBcclxuXHRcdFx0ICpcdDE6IEdlbmVyYXRlIGFuIGFycmF5IG9mIGFycmF5cyBcclxuXHRcdFx0ICpcdCdBJzogUm93IG9iamVjdCBrZXlzIGFyZSBsaXRlcmFsIGNvbHVtbiBsYWJlbHNcclxuXHRcdFx0ICpcdHN0cmluZ1tdOiBVc2Ugc3BlY2lmaWVkIHN0cmluZ3MgYXMga2V5cyBpbiByb3cgb2JqZWN0c1xyXG5cdFx0XHQgKlx0ZGVmYXVsdDogUmVhZCBhbmQgZGlzYW1iaWd1YXRlIGZpcnN0IHJvdyBhcyBrZXlzXHJcblx0XHRcdCovXHJcblx0XHRcdGhlYWRlcjogb3ZlcnJpZGVIZWFkZXIsXHJcblx0XHRcdC8qIENvbnRyb2wgZGF0ZSBmb3JtYXRcclxuXHRcdFx0ICpcdHN0cmluZzogVXNlIHNwZWNpZmllZCBkYXRlIGZvcm1hdCBpbiBzdHJpbmcgb3V0cHV0XHJcblx0XHRcdCAqXHRkZWZhdWx0OiBGTVQgMTRcclxuXHRcdFx0Ki9cclxuXHRcdFx0ZGF0ZU5GOiBudWxsLFxyXG5cdFx0XHQvLyBVc2Ugc3BlY2lmaWVkIHZhbHVlIGluIHBsYWNlIG9mIG51bGwgb3IgdW5kZWZpbmVkXHJcblx0XHRcdGRlZnZhbDogbnVsbCxcclxuXHRcdFx0LyogSW5jbHVkZSBibGFuayBsaW5lcyBpbiB0aGUgb3V0cHV0ICoqXHJcblx0XHRcdCAqXHR0cnVlOiBJbmNsdWRlIGJsYW5rIGxpbmVzXHJcblx0XHRcdCAqXHRmYWxzZTogU2tpcCBibGFuayBsaW5lc1xyXG5cdFx0XHQqL1xyXG5cdFx0XHRibGFua3Jvd3M6IHRydWVcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHdvcmtzaGVldCA9IHdvcmtib29rLlNoZWV0c1tzaGVldE5hbWVdO1xyXG5cclxuXHRcdGlmICh3b3Jrc2hlZXQgPT0gbnVsbCB8fCB3b3Jrc2hlZXRbXCIhcmVmXCJdID09IG51bGwpIHJldHVybiBbXTtcclxuXHJcblx0XHQvLyBEZWZhdWx0c1xyXG5cdFx0dmFyIHZhbDogYW55ID0geyB0OiAnbicsIHY6IDAgfSwgaGVhZGVyID0gMCwgb2Zmc2V0ID0gMSwgaGRyID0gW10sIHYgPSAwLCB2diA9IFwiXCI7XHJcblx0XHQvLyBSYW5nZSBzdGFydCBhbmQgZW5kIGRlZmF1bHRzXHJcblx0XHR2YXIgciA9IHsgczogeyByOiAwLCBjOiAwIH0sIGU6IHsgcjogMCwgYzogMCB9IH07XHJcblxyXG5cdFx0dmFyIHJhbmdlID0gb3B0aW9ucy5yYW5nZSAhPSBudWxsID8gb3B0aW9ucy5yYW5nZSA6IHdvcmtzaGVldFtcIiFyZWZcIl07XHJcblx0XHRMb2dnZXIuZGVidWcoYFJhbmdlIG9wdGlvbnMucmFuZ2U6ICR7b3B0aW9ucy5yYW5nZX0gd2l0aCB3b3Jrc2hlZXQgcmVmZXJlbmNlOiAke3dvcmtzaGVldFtcIiFyZWZcIl19YCk7XHJcblxyXG5cclxuXHRcdHN3aXRjaCAodHlwZW9mIHJhbmdlKSB7XHJcblx0XHRcdGNhc2UgJ3N0cmluZyc6IHIgPSB4bHN4LnV0aWxzLmRlY29kZV9yYW5nZShyYW5nZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdudW1iZXInOiByID0geGxzeC51dGlscy5kZWNvZGVfcmFuZ2Uod29ya3NoZWV0W1wiIXJlZlwiXSk7IHIucy5yID0gcmFuZ2U7IGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiByID0gcmFuZ2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuaGVhZGVyID09PSAxKSB7XHJcblx0XHRcdGhlYWRlciA9IDE7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvcHRpb25zLmhlYWRlciA9PT0gXCJBXCIpIHtcclxuXHRcdFx0aGVhZGVyID0gMjtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5oZWFkZXIpKSB7XHJcblx0XHRcdGhlYWRlciA9IDM7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvcHRpb25zLmhlYWRlciA9PSBudWxsKSB7XHJcblx0XHRcdGhlYWRlciA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhlYWRlciA+IDApIHtcclxuXHRcdFx0b2Zmc2V0ID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcnIgPSB4bHN4LnV0aWxzLmVuY29kZV9yb3coci5zLnIpO1xyXG5cclxuXHRcdExvZ2dlci5kZWJ1ZyhgUmFuZ2Ugcm93OiAke3JyfSB3aXRoIHN0YXJ0IGluZGV4OiAke3Iucy5yfSAtIGVuZCBpbmRleDogJHtyLmUucn1gKTtcclxuXHRcdExvZ2dlci5kZWJ1ZyhgUmFuZ2UgY29sdW1uOiBzdGFydCBpbmRleDogJHtyLnMuY30gLSBlbmQgaW5kZXg6ICR7ci5lLmN9YCk7XHJcblxyXG5cdFx0dmFyIGNvbHMgPSBbXTtcclxuXHRcdHZhciBvdXQgPSBbXTtcclxuXHRcdHZhciBvdXRJbmRleCA9IDAsIGNvdW50ZXIgPSAwO1xyXG5cdFx0dmFyIGlzV29ya3NoZWV0QXJyYXkgPSBBcnJheS5pc0FycmF5KHdvcmtzaGVldCk7XHJcblx0XHR2YXIgcm93SW5kZXggPSByLnMuciwgY29sdW1uSW5kZXggPSAwLCBDQyA9IDA7XHJcblxyXG5cdFx0aWYgKGlzV29ya3NoZWV0QXJyYXkgJiYgIXdvcmtzaGVldFtyb3dJbmRleF0pIHtcclxuXHRcdFx0d29ya3NoZWV0W3Jvd0luZGV4XSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoY29sdW1uSW5kZXggPSByLnMuYzsgY29sdW1uSW5kZXggPD0gci5lLmM7ICsrY29sdW1uSW5kZXgpIHtcclxuXHRcdFx0Y29sc1tjb2x1bW5JbmRleF0gPSB4bHN4LnV0aWxzLmVuY29kZV9jb2woY29sdW1uSW5kZXgpO1xyXG5cdFx0XHR2YWwgPSBpc1dvcmtzaGVldEFycmF5ID8gd29ya3NoZWV0W3Jvd0luZGV4XVtjb2x1bW5JbmRleF0gOiB3b3Jrc2hlZXRbY29sc1tjb2x1bW5JbmRleF0gKyBycl07XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGhlYWRlcikge1xyXG5cdFx0XHRcdGNhc2UgMTogaGRyW2NvbHVtbkluZGV4XSA9IGNvbHVtbkluZGV4IC0gci5zLmM7IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgMjogaGRyW2NvbHVtbkluZGV4XSA9IGNvbHNbY29sdW1uSW5kZXhdOyBicmVhaztcclxuXHRcdFx0XHRjYXNlIDM6IGhkcltjb2x1bW5JbmRleF0gPSBvcHRpb25zLmhlYWRlcltjb2x1bW5JbmRleCAtIHIucy5jXTsgYnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGlmICh2YWwgPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR2YWwudyA9IFwiX19FTVBUWVwiO1xyXG5cdFx0XHRcdFx0XHR2YWwudCA9IFwic1wiO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dnYgPSB4bHN4LnV0aWxzLmZvcm1hdF9jZWxsKHZhbCBhcyB4bHN4LkNlbGxPYmplY3QsIG51bGwsIG9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0diA9IE51bWJlcih2dik7XHJcblx0XHRcdFx0XHRjb3VudGVyID0gMDtcclxuXHRcdFx0XHRcdGZvciAoQ0MgPSAwOyBDQyA8IGhkci5sZW5ndGg7ICsrQ0MpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGhkcltDQ10gPT0gdnYpIHtcclxuXHRcdFx0XHRcdFx0XHR2diA9IHYgKyBcIl9cIiArICgrK2NvdW50ZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRoZHJbY29sdW1uSW5kZXhdID0gdnY7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAocm93SW5kZXggPSByLnMuciArIG9mZnNldDsgcm93SW5kZXggPD0gci5lLnI7ICsrcm93SW5kZXgpIHtcclxuXHRcdFx0dmFyIHJvdyA9IHNlbGYuYnVpbGRPYmplY3RSb3cod29ya3NoZWV0LCByLCByb3dJbmRleCwgY29scywgaGVhZGVyLCBoZHIsIGlzV29ya3NoZWV0QXJyYXksIG9wdGlvbnMsIG1hcE9iamVjdCk7XHJcblx0XHRcdGlmICgocm93LmlzRW1wdHkgPT09IGZhbHNlKSB8fCAoaGVhZGVyID09PSAxID8gb3B0aW9ucy5ibGFua3Jvd3MgIT09IGZhbHNlIDogISFvcHRpb25zLmJsYW5rcm93cykpIHtcclxuXHRcdFx0XHRvdXRbb3V0SW5kZXgrK10gPSByb3cucm93O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRvdXQubGVuZ3RoID0gb3V0SW5kZXg7XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH1cclxufVxyXG4iXX0=