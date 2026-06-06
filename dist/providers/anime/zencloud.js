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
        while (_) try {
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
        var PROVIDER, ANILIST_GRAPHQL, ZENCLOUD_API, ZENCLOUD_EMBED_BASE, malId, searchUrl, searchResp, searchData, match, query, gqlResp, gqlJson, anilistId, url, resp, data, video, playerUrl, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROVIDER = 'Zencloud';
                    ANILIST_GRAPHQL = 'https://graphql.anilist.co';
                    ZENCLOUD_API = 'https://zencloud.cc/videos/raw';
                    ZENCLOUD_EMBED_BASE = 'https://zencloud.cc/e/';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 14, , 15]);
                    malId = movieInfo.malId || movieInfo.id;
                    if (!!malId) return [3, 3];
                    libs.log({ msg: 'No MAL ID, searching Jikan...' }, PROVIDER, 'INFO');
                    searchUrl = "https://api.jikan.moe/v4/anime?q=" + encodeURIComponent(movieInfo.title) + "&limit=10";
                    return [4, fetch(searchUrl)];
                case 2:
                    searchResp = _a.sent();
                    return [4, searchResp.json()];
                case 3:
                    searchData = _a.sent();
                    if (!searchData.data || searchData.data.length === 0) {
                        libs.log({ msg: 'Jikan search returned no results' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    match = null;
                    if (movieInfo.year) {
                        match = searchData.data.find(function (anime) { return anime.year == movieInfo.year; });
                    }
                    if (!match) match = searchData.data[0];
                    malId = match.mal_id;
                    libs.log({ malId: malId, title: match.title }, PROVIDER, 'Found MAL ID');
                    _a.label = 4;
                case 4:
                    if (!malId) {
                        libs.log({ msg: 'Still no MAL ID' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    query = 'query ($idMal: Int) { Media(idMal: $idMal) { id } }';
                    return [4, fetch(ANILIST_GRAPHQL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query: query, variables: { idMal: malId } })
                        })];
                case 5:
                    gqlResp = _a.sent();
                    return [4, gqlResp.json()];
                case 6:
                    gqlJson = _a.sent();
                    anilistId = gqlJson.data && gqlJson.data.Media ? gqlJson.data.Media.id : null;
                    if (!anilistId) {
                        libs.log({ msg: 'AniList ID not found' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    libs.log({ malId: malId, anilistId: anilistId }, PROVIDER, 'Mapped to AniList');
                    url = ZENCLOUD_API + "?anilist_id=" + anilistId + "&episode=" + movieInfo.episode;
                    return [4, fetch(url)];
                case 7:
                    resp = _a.sent();
                    return [4, resp.json()];
                case 8:
                    data = _a.sent();
                    if (data.status !== 'success' || !data.data || data.data.length === 0) {
                        libs.log({ msg: 'Zencloud returned no data' }, PROVIDER, 'WARN');
                        return [2, false];
                    }
                    video = data.data[0];
                    if (!video || !video.player_url) {
                        libs.log({ msg: 'Player URL missing' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    playerUrl = new URL(video.player_url);
                    playerUrl.searchParams.set('a', '0');
                    playerUrl.searchParams.set('skI', 'true');
                    playerUrl.searchParams.set('skO', 'true');
                    playerUrl.searchParams.set('autoPlay', 'true');
                    libs.log({ playerUrl: playerUrl.toString() }, PROVIDER, 'Stream URL');
                    return [4, libs.embed_redirect(playerUrl.toString(), '', movieInfo, PROVIDER, callback, '', [], {})];
                case 9:
                    _a.sent();
                    return [2, true];
                case 10:
                    e_1 = _a.sent();
                    libs.log({ error: e_1.message || e_1 }, PROVIDER, 'ERROR');
                    return [2, false];
                case 11: return [3, 15];
                case 12:
                    e_1 = _a.sent();
                    libs.log({ error: e_1 }, PROVIDER, 'CRITICAL');
                    return [2, false];
                case 13: return [3, 15];
                case 14:
                    e_1 = _a.sent();
                    libs.log({ error: e_1.message || e_1 }, PROVIDER, 'ERROR');
                    return [2, false];
                case 15: return [2, true];
            }
        });
    });
};