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

source.getResource = function (movieInfo, config, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var PROVIDER, API_BASE, JIKAN_BASE, malId, searchUrl, searchResp, searchJson, anime, infoUrl, infoResp, info, episodes, targetEpisode, epId, sourcesUrl, sourcesResp, sources, streams, _i, _a, s, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    PROVIDER = 'Consumet (Zoro)';
                    API_BASE = 'https://api.consumet.org';
                    JIKAN_BASE = 'https://api.jikan.moe/v4';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 14, , 15]);
                    malId = movieInfo.malId || movieInfo.id;
                    if (!!malId) return [3, 5];
                    libs.log({ msg: 'No MAL ID – searching Jikan by title' }, PROVIDER, 'INFO');
                    searchUrl = JIKAN_BASE + "/anime?q=" + encodeURIComponent(movieInfo.title) + "&limit=10";
                    return [4, fetch(searchUrl)];
                case 2:
                    searchResp = _b.sent();
                    return [4, searchResp.json()];
                case 3:
                    searchJson = _b.sent();
                    if (!searchJson.data || searchJson.data.length === 0) {
                        libs.log({ msg: 'No results from Jikan' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    anime = searchJson.data[0];
                    malId = anime.mal_id;
                    libs.log({ malId: malId, title: anime.title }, PROVIDER, 'Found MAL ID');
                    _b.label = 4;
                case 4:
                    if (!malId) {
                        libs.log({ msg: 'Could not obtain MAL ID' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    _b.label = 5;
                case 5:
                    infoUrl = API_BASE + "/anime/zoro/info?id=" + malId;
                    libs.log({ infoUrl: infoUrl }, PROVIDER, 'Fetching anime info');
                    return [4, fetch(infoUrl)];
                case 6:
                    infoResp = _b.sent();
                    if (!infoResp.ok) {
                        libs.log({ status: infoResp.status }, PROVIDER, 'Info request failed');
                        return [2, false];
                    }
                    return [4, infoResp.json()];
                case 7:
                    info = _b.sent();
                    if (!info.episodes || info.episodes.length === 0) {
                        libs.log({ msg: 'No episodes in response' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    targetEpisode = info.episodes.find(function (ep) { return ep.number === movieInfo.episode; });
                    if (!targetEpisode) {
                        libs.log({ episode: movieInfo.episode }, PROVIDER, 'Episode not found');
                        return [2, false];
                    }
                    epId = targetEpisode.id;
                    libs.log({ epId: epId }, PROVIDER, 'Episode ID');
                    sourcesUrl = API_BASE + "/anime/zoro/watch?episodeId=" + encodeURIComponent(epId);
                    return [4, fetch(sourcesUrl)];
                case 8:
                    sourcesResp = _b.sent();
                    if (!sourcesResp.ok) {
                        libs.log({ status: sourcesResp.status }, PROVIDER, 'Sources request failed');
                        return [2, false];
                    }
                    return [4, sourcesResp.json()];
                case 9:
                    sources = _b.sent();
                    streams = sources.sources || [];
                    if (streams.length === 0) {
                        libs.log({ msg: 'No streams in response' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    libs.log({ count: streams.length }, PROVIDER, 'Streams found');
                    for (_i = 0, _a = streams; _i < _a.length; _i++) {
                        s = _a[_i];
                        if (s.url) {
                            libs.embed_callback(s.url, PROVIDER, PROVIDER, s.type || 'hls', callback, 0, sources.subtitles || [], [{
                                file: s.url,
                                quality: s.quality || 1080,
                                type: s.type || 'hls'
                            }]);
                        }
                    }
                    return [2, true];
                case 10:
                    e_1 = _b.sent();
                    libs.log({ error: e_1.message || e_1 }, PROVIDER, 'ERROR');
                    return [2, false];
                case 11: return [3, 15];
                case 12:
                    e_1 = _b.sent();
                    libs.log({ error: e_1.message || e_1 }, PROVIDER, 'ERROR');
                    return [2, false];
                case 13: return [3, 15];
                case 14:
                    e_1 = _b.sent();
                    libs.log({ error: e_1 }, PROVIDER, 'CRITICAL');
                    return [2, false];
                case 15: return [2, true];
            }
        });
    });
};