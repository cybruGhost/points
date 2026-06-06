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
subs.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var PROVIDER, DOMAIN, PROXY_API, subLang, subLanguageIds, imdbId, _i, subLanguageIds_1, item, url, response, data, _a, data_1, itemLang, fileName, lang, zipUrl, season, episode, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                PROVIDER = "OpenSubtitles";
                DOMAIN = "https://www.opensubtitles.org";
                PROXY_API = "https://dywyagjcuvxtjgtksyjn.supabase.co/functions/v1/subtitle-proxy";
                subLang = {
                    eng: "English",
                    spa: "Spanish",
                    fre: "French",
                    ger: "German",
                    ita: "Italian",
                    por: "Portuguese",
                    rus: "Russian",
                    chi: "Chinese",
                    jpn: "Japanese",
                    kor: "Korean",
                    ara: "Arabic",
                    hin: "Hindi",
                    dut: "Dutch",
                    swe: "Swedish",
                    pol: "Polish",
                    tur: "Turkish",
                    dan: "Danish",
                    nor: "Norwegian",
                    fin: "Finnish",
                    vie: "Vietnamese",
                    ind: "Indonesian",
                };
                subLanguageIds = [
                    { name: 'English', id: 'eng' },
                    { name: 'Arabic', id: 'ara' },
                    { name: 'Spanish', id: 'spa' },
                    { name: 'French', id: 'fre' },
                    { name: 'Vietnamese', id: 'vie' },
                    { name: 'Italian', id: 'ita' },
                    { name: 'Portuguese', id: 'por' },
                    { name: 'Chinese', id: 'chi' },
                    { name: 'Korean', id: 'kor' },
                    { name: 'Hindi', id: 'hin' },
                    { name: 'Dutch', id: 'dut' },
                    { name: 'Swedish', id: 'swe' },
                    { name: 'Polish', id: 'pol' },
                    { name: 'Turkish', id: 'tur' },
                    { name: 'Indonesian', id: 'ind' },
                ];
                imdbId = movieInfo.imdb_id.replace("tt", "");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                _i = 0, subLanguageIds_1 = subLanguageIds;
                _b.label = 2;
            case 2:
                if (!(_i < subLanguageIds_1.length)) return [3, 6];
                item = subLanguageIds_1[_i];
                if (movieInfo.type == "tv") {
                    url = "".concat(PROXY_API, "?imdb_id=").concat(imdbId, "&lang=").concat(item.id, "&season=").concat(movieInfo.season, "&episode=").concat(movieInfo.episode);
                } else {
                    url = "".concat(PROXY_API, "?imdb_id=").concat(imdbId, "&lang=").concat(item.id);
                }
                libs.log({ url: url }, PROVIDER, "URL SEARCH");
                return [4, fetch(url, {
                        method: "GET",
                        headers: {
                            "User-Agent": "XBMC_Subtitles_v1",
                        },
                    })];
            case 3:
                response = _b.sent();
                return [4, response.json()];
            case 4:
                data = _b.sent();
                libs.log({ url: url, data: data, item: item }, PROVIDER, "URL SEARCH LANG");
                if (!data.ok) {
                    libs.log({ data: data }, PROVIDER, "API ERROR");
                    return [3, 5];
                }
                for (_a = 0, _c = data.results; _a < _c.length; _a++) {
                    itemLang = _c[_a];
                    fileName = itemLang.file_name;
                    lang = itemLang.language.toLowerCase();
                    zipUrl = itemLang.zip_download_url || itemLang.download_url;
                    libs.log({ fileName: fileName, langID: lang, zip: zipUrl }, PROVIDER, "ITEM INFO");
                    if (movieInfo.type == "tv") {
                        season = movieInfo.season;
                        episode = movieInfo.episode;
                        libs.log({
                            episode: episode,
                            season: season,
                            fileName: fileName,
                            lang: lang,
                            zip: zipUrl,
                            movieInfo: movieInfo,
                        }, PROVIDER, "EPISODE COMPARE");
                    }
                    libs.log({ lang: lang, subLang: subLang[lang], zip: zipUrl }, PROVIDER, "LANG INFO");
                    if (!subLang[lang]) {
                        continue;
                    }
                    if (!zipUrl) {
                        continue;
                    }
                    libs.log({ fileName: fileName, lang: lang, zip: zipUrl }, PROVIDER, "ITEM INFO PASS==>");
                    callback({
                        file: zipUrl,
                        kind: "Captions",
                        label: subLang[lang],
                        type: "zip",
                        provider: PROVIDER,
                        headers: {
                            "User-Agent": "XBMC_Subtitles_v1",
                        },
                    });
                }
                _b.label = 5;
            case 5:
                _i++;
                return [3, 2];
            case 6: return [3, 8];
            case 7:
                e_1 = _b.sent();
                libs.log({ e: e_1 }, PROVIDER, "ERROR");
                return [3, 8];
            case 8: return [2, true];
        }
    });
}); };