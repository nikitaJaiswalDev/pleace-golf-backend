"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const filter_1 = require("./filter");
class FilterBuilder {
    constructor() {
        this.filters = [];
    }
    addFilter(property, value) {
        this.filters.push(new filter_1.Filter(property, value));
        return this;
    }
    buildFirst() {
        return this.filters[0];
    }
    buildAll() {
        return this.filters;
    }
}
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9kYW8vZmlsdGVyL2ZpbHRlci1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBRUgscUNBQWtDO0FBR2xDLE1BQWEsYUFBYTtJQUExQjtRQUNZLFlBQU8sR0FBYSxFQUFFLENBQUM7SUFnQm5DLENBQUM7SUFkRyxTQUFTLENBQUMsUUFBZ0IsRUFBRSxLQUFpQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixJQUFJLGVBQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQzlCLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUFqQkQsc0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuL2ZpbHRlclwiO1xyXG5pbXBvcnQgeyBGaWx0ZXJUeXBlIH0gZnJvbSBcIi4vZmlsdGVyLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJCdWlsZGVyIHtcclxuICAgIHByaXZhdGUgZmlsdGVyczogRmlsdGVyW10gPSBbXTtcclxuXHJcbiAgICBhZGRGaWx0ZXIocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IEZpbHRlclR5cGUpIHtcclxuICAgICAgICB0aGlzLmZpbHRlcnMucHVzaChcclxuICAgICAgICAgICAgbmV3IEZpbHRlcihwcm9wZXJ0eSwgdmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBidWlsZEZpcnN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRBbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycztcclxuICAgIH1cclxufSJdfQ==