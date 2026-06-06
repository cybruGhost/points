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
        var PROVIDER, DOMAIN, searchKeyword, searchUrl, searchHtml, $, detailUrl, animeId, episodeListUrl, listResp, $$, episodeId, serversUrl, serversResp, serverItems, _i, _a, server, sourceUrl, sourceResp, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    PROVIDER = 'HiAnime - Anime';
                    DOMAIN = 'https://hianime.to';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 13, , 14]);
                    searchKeyword = encodeURIComponent(movieInfo.title);
                    searchUrl = DOMAIN + "/search?keyword=" + searchKeyword;
                    libs.log({ searchUrl: searchUrl }, PROVIDER, 'SEARCH');
                    return [4, libs.request_get(searchUrl, {}, true)];
                case 2:
                    searchHtml = _b.sent();
                    $ = cheerio.load(searchHtml);
                    detailUrl = null;
                    $('.flw-item').each(function (idx, el) {
                        if (detailUrl) return;
                        var title = $(el).find('.film-name').text().trim();
                        var href = $(el).find('.film-poster a').attr('href');
                        if (title && href && libs.string_matching_title(movieInfo, title, false, "")) {
                            detailUrl = href;
                        }
                    });
                    if (!detailUrl) {
                        libs.log({ msg: 'No matching anime found' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    if (detailUrl.startsWith('/')) detailUrl = DOMAIN + detailUrl;
                    // Extract anime ID from URL (e.g., /watch/death-note-1535?ep=1)
                    var idMatch = detailUrl.match(/\/watch\/([^\/?]+)/);
                    if (!idMatch) {
                        libs.log({ detailUrl: detailUrl }, PROVIDER, 'Failed to extract ID');
                        return [2, false];
                    }
                    animeId = idMatch[1];
                    // Try to get numeric ID (often at the end)
                    var numericMatch = animeId.match(/(\d+)$/);
                    if (numericMatch) animeId = numericMatch[1];
                    libs.log({ animeId: animeId }, PROVIDER, 'Anime ID');
                    if (!animeId) return [2, false];
                    episodeListUrl = DOMAIN + "/ajax/v2/episode/list/" + animeId;
                    return [4, libs.request_get(episodeListUrl, {})];
                case 3:
                    listResp = _b.sent();
                    $$ = cheerio.load(listResp.html || listResp);
                    episodeId = null;
                    $$('.ssl-item').each(function (idx, el) {
                        if (episodeId) return;
                        var epNum = $$(el).attr('data-number');
                        var eid = $$(el).attr('data-id');
                        if (epNum && String(epNum) === String(movieInfo.episode)) {
                            episodeId = eid;
                        }
                    });
                    if (!episodeId) {
                        libs.log({ episode: movieInfo.episode }, PROVIDER, 'Episode not found');
                        return [2, false];
                    }
                    serversUrl = DOMAIN + "/ajax/v2/episode/servers?episodeId=" + episodeId;
                    return [4, libs.request_get(serversUrl, {})];
                case 4:
                    serversResp = _b.sent();
                    $$ = cheerio.load(serversResp.html || serversResp);
                    serverItems = [];
                    $$('.server-item').each(function (idx, el) {
                        var sid = $$(el).attr('data-id');
                        var stype = $$(el).attr('data-type');
                        if (sid) serverItems.push({ id: sid, type: stype });
                    });
                    if (serverItems.length === 0) {
                        libs.log({ msg: 'No servers found' }, PROVIDER, 'ERROR');
                        return [2, false];
                    }
                    _i = 0, _a = serverItems;
                    _b.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3, 12];
                    server = _a[_i];
                    sourceUrl = DOMAIN + "/ajax/v2/episode/sources?id=" + server.id;
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 10, , 11]);
                    libs.log({ sourceUrl: sourceUrl }, PROVIDER, 'Fetching source');
                    return [4, libs.request_get(sourceUrl, {})];
                case 7:
                    sourceResp = _b.sent();
                    if (!sourceResp || !sourceResp.link) {
                        libs.log({ server: server }, PROVIDER, 'No link');
                        return [3, 11];
                    }
                    libs.log({ link: sourceResp.link }, PROVIDER, 'Embed URL');
                    return [4, libs.embed_redirect(sourceResp.link, '', movieInfo, PROVIDER, callback, '', [], { type: server.type ? server.type.toUpperCase() : 'SUB' })];
                case 8:
                    _b.sent();
                    return [2, true];
                case 9:
                    e_1 = _b.sent();
                    libs.log({ error: e_1, server: server }, PROVIDER, 'Source error');
                    return [3, 11];
                case 10:
                    e_1 = _b.sent();
                    libs.log({ error: e_1, server: server }, PROVIDER, 'Source error');
                    return [3, 11];
                case 11:
                    _i++;
                    return [3, 5];
                case 12: return [3, 14];
                case 13:
                    e_1 = _b.sent();
                    libs.log({ error: e_1 }, PROVIDER, 'CRITICAL');
                    return [3, 14];
                case 14: return [2, true];
            }
        });
    });
};