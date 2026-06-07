var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var PROVIDER, DOMAIN, headers, embedUrl, dataEmbed, htmlEmbed, iframeSrc, iframeMatch, dataSource, jsonSource, tracks, _i, _a, sub, directQuality, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                PROVIDER = 'OVidsrcTO';
                DOMAIN = "https://vidsrc.to";
                headers = {
                    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                    'Referer': "https://vidsrc.to/",
                    'Origin': DOMAIN,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                // Build embed URL
                embedUrl = movieInfo.type === 'tv'
                    ? "".concat(DOMAIN, "/embed/tv/").concat(movieInfo.tmdb_id, "/").concat(movieInfo.season, "/").concat(movieInfo.episode)
                    : "".concat(DOMAIN, "/embed/movie/").concat(movieInfo.tmdb_id);
                libs.log({ embedUrl: embedUrl }, PROVIDER, "EMBED URL");
                return [4, fetch(embedUrl, { headers: headers })];
            case 2:
                dataEmbed = _b.sent();
                return [4, dataEmbed.text()];
            case 3:
                htmlEmbed = _b.sent();
                libs.log({ htmlEmbed: htmlEmbed ? htmlEmbed.substring(0, 200) : 'empty' }, PROVIDER, "HTML EMBED");
                if (!htmlEmbed) {
                    return [2];
                }
                iframeMatch = htmlEmbed.match(/src="(https:\/\/vidsrc\.to\/[^"]+)"/i);
                if (!iframeMatch) {
                    // Try alternate pattern — data-src or player src
                    iframeMatch = htmlEmbed.match(/data-src="([^"]+)"/i);
                }
                iframeSrc = iframeMatch ? iframeMatch[1] : null;
                libs.log({ iframeSrc: iframeSrc }, PROVIDER, "IFRAME SRC");
                if (!iframeSrc) {
                    return [2];
                }
                return [4, libs.request_get(iframeSrc, headers)];
            case 4:
                dataSource = _b.sent();
                libs.log({ dataSource: dataSource }, PROVIDER, "DATA SOURCE");
                if (!dataSource || !dataSource.result) {
                    return [2];
                }
                jsonSource = dataSource.result;
                if (!jsonSource.sources || !jsonSource.sources.length) {
                    return [2];
                }
                tracks = [];
                for (_i = 0, _a = jsonSource.subtitles || []; _i < _a.length; _i++) {
                    sub = _a[_i];
                    if (!sub.file || !sub.label) { continue; }
                    tracks.push({
                        file: sub.file,
                        kind: 'captions',
                        label: sub.label
                    });
                }
                directQuality = jsonSource.sources.map(function (s) {
                    var q = s.quality ? s.quality.match(/([0-9]+)/i) : null;
                    return {
                        file: s.file,
                        quality: q ? Number(q[1]) : 1080
                    };
                });
                directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                libs.log({ directQuality: directQuality, tracks: tracks }, PROVIDER, "FINAL QUALITY");
                if (!directQuality.length) {
                    return [2];
                }
                libs.embed_callback(directQuality[0].file, PROVIDER, PROVIDER, 'Hls', callback, 1, tracks, directQuality, headers);
                return [3, 8];
            case 5: return [3, 8];
            case 6: return [3, 8];
            case 7:
                e_1 = _b.sent();
                libs.log({ e: e_1 }, PROVIDER, "ERROR");
                return [3, 8];
            case 8: return [2];
        }
    });
}); };