"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDependency = void 0;
const mongoose = require("mongoose");
const dependency_1 = require("../dependency");
const logging_1 = require("../../logging");
class MongoDBDependency extends dependency_1.Dependency {
    constructor(host) {
        super(host);
        this.host = host;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            //return new Promise(async (resolve, reject) => {
            const db = mongoose.connection;
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true, // new topology engine (No longer relevant: autoReconnect, reconnectTries and reconnectInterval)
                autoIndex: false, // Don't automatically build indexes
                poolSize: 10, // Maintain up to 10 socket connections
                // If not connected, return errors immediately rather than waiting for reconnect
                bufferMaxEntries: 0
            };
            try {
                yield mongoose.connect(this.host, options);
                logging_1.Logger.info(`${this.getName()} connected.`);
                this.connected();
                db.once("disconnected", this.disconnected.bind(this));
                //return resolve(mongoose);
            }
            catch (error) {
                logging_1.Logger.error(`${this.getName()} connection unsuccessful`);
                this.disconnected();
                //return reject(error);
            }
            return mongoose;
            //});
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongoose;
        });
    }
    disconnected() {
        try {
            this.connect.bind(this);
        }
        catch (error) {
            logging_1.Logger.error(error);
        }
    }
    connected() {
    }
    getName() {
        return "MongoDB";
    }
}
exports.MongoDBDependency = MongoDBDependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uZGVwZW5kZW5jeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2RlcGVuZGVuY2llcy9tb25nby9tb25nby5kZXBlbmRlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7O0FBRUgscUNBQXFDO0FBQ3JDLDhDQUEyQztBQUMzQywyQ0FBdUM7QUFFdkMsTUFBYSxpQkFBa0IsU0FBUSx1QkFBNkI7SUFFaEUsWUFBc0IsSUFBWTtRQUM5QixLQUFLLENBQ0QsSUFBSSxDQUNQLENBQUM7UUFIZ0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUlsQyxDQUFDO0lBRVksT0FBTzs7WUFDaEIsaURBQWlEO1lBQzdDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQUc7Z0JBQ1osZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLGtCQUFrQixFQUFFLElBQUksRUFBRSxnR0FBZ0c7Z0JBQzFILFNBQVMsRUFBRSxLQUFLLEVBQUUsb0NBQW9DO2dCQUN0RCxRQUFRLEVBQUUsRUFBRSxFQUFFLHVDQUF1QztnQkFDckQsZ0ZBQWdGO2dCQUNoRixnQkFBZ0IsRUFBRSxDQUFDO2FBQ3RCLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCwyQkFBMkI7WUFDL0IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsdUJBQXVCO1lBQzNCLENBQUM7WUFFRCxPQUFPLFFBQVEsQ0FBQztZQUNwQixLQUFLO1FBQ1QsQ0FBQztLQUFBO0lBRVksU0FBUzs7WUFDbEIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTO0lBQ1QsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUF2REQsOENBdURDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL2RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2xvZ2dpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb25nb0RCRGVwZW5kZW5jeSBleHRlbmRzIERlcGVuZGVuY3k8bW9uZ29vc2UuTW9uZ29vc2U+IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaG9zdDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGhvc3RcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8bW9uZ29vc2UuTW9uZ29vc2U+IHtcclxuICAgICAgICAvL3JldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsIC8vIG5ldyB0b3BvbG9neSBlbmdpbmUgKE5vIGxvbmdlciByZWxldmFudDogYXV0b1JlY29ubmVjdCwgcmVjb25uZWN0VHJpZXMgYW5kIHJlY29ubmVjdEludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgYXV0b0luZGV4OiBmYWxzZSwgLy8gRG9uJ3QgYXV0b21hdGljYWxseSBidWlsZCBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICBwb29sU2l6ZTogMTAsIC8vIE1haW50YWluIHVwIHRvIDEwIHNvY2tldCBjb25uZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm90IGNvbm5lY3RlZCwgcmV0dXJuIGVycm9ycyBpbW1lZGlhdGVseSByYXRoZXIgdGhhbiB3YWl0aW5nIGZvciByZWNvbm5lY3RcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck1heEVudHJpZXM6IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0KHRoaXMuaG9zdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhgJHt0aGlzLmdldE5hbWUoKX0gY29ubmVjdGVkLmApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgICAgIGRiLm9uY2UoXCJkaXNjb25uZWN0ZWRcIiwgdGhpcy5kaXNjb25uZWN0ZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiByZXNvbHZlKG1vbmdvb3NlKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihgJHt0aGlzLmdldE5hbWUoKX0gY29ubmVjdGlvbiB1bnN1Y2Nlc3NmdWxgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9uZ29vc2U7XHJcbiAgICAgICAgLy99KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q2xpZW50KCk6IFByb21pc2U8bW9uZ29vc2UuTW9uZ29vc2U+IHtcclxuICAgICAgICByZXR1cm4gbW9uZ29vc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RlZCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIk1vbmdvREJcIjtcclxuICAgIH1cclxufVxyXG4iXX0=