/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { parse } from "node-html-parser";

const tournamentTiers = {
  all: "Portal:Tournaments",
  s: "S-Tier_Tournaments",
  a: "A-Tier_Tournaments",
  b: "B-Tier_Tournaments",
  c: "C-Tier_Tournaments",
  d: "D-Tier_Tournaments",
  monthly: "Monthly_Tournaments",
  weekly: "Weekly_Tournaments",
  showmatches: "Show_Matches",
  qualifiers: "Qualifier_Tournaments",
  misc: "Misc_Tournaments",
  school: "School_Tournaments",
} as const;

type TournamentTier = keyof typeof tournamentTiers;

const endpoints = {
  matches: "Liquipedia:Matches", // no historic matches, just upcoming and live
  teams: "Portal:Teams",
  ...tournamentTiers,
} as const;

type URL = keyof typeof endpoints;

export type Logo = {
  src: string;
  size: string;
};

export type Tournament = {
  tier: TournamentTier;
  status: "Upcoming" | "Ongoing" | "Completed";
  name: string;
  url: string;
  dates: string;
  teams: string;
};

export type Player = {
  username: string;
  name: string;
  role?: string;
  url: string;
  nationality: {
    country: string;
    url: string;
  };
};

export type Team = {
  name: string;
  region: string;
  url: string;
  // srcset
  logo: Logo[];
  players: Player[];
};

export type Match = {
  leftTeam: {
    name: string;
    shortName?: string;
    currentScore?: number;
  };
  rightTeam: {
    name: string;
    shortName?: string;
    currentScore?: number;
  };
  bestOf: number;
  status: "Upcoming" | "Live" | "Completed";
  startTime?: Date;
  twitchStream?: string;
  tournamentName?: string;
  tournamentShortName?: string;
};

type ResponseMap = {
  matches: Match[];
  teams: Team[];
  all: Tournament[];
  s: Tournament[];
  a: Tournament[];
  b: Tournament[];
  c: Tournament[];
  d: Tournament[];
  monthly: Tournament[];
  weekly: Tournament[];
  showmatches: Tournament[];
  qualifiers: Tournament[];
  misc: Tournament[];
  school: Tournament[];
};

type Parser<T extends keyof ResponseMap> = (html: string) => ResponseMap[T];

type ParseMap = {
  [K in keyof ResponseMap]: Parser<K>;
};

const prependHref = (href: string) => `https://liquipedia.net${href}`;

const parseTeams = (teamHtml: string): Team[] => {
  const root = parse(teamHtml);
  const parent = root.querySelector(".mw-parser-output"); // full team container
  if (!parent) {
    return [];
  }
  const regions = parent.querySelectorAll("h3");
  const out: Team[] = [];
  regions.forEach((region) => {
    // teams container is sibling after this element
    const teamsContainer = region.nextElementSibling;
    const allTeams = teamsContainer.querySelectorAll("tbody");
    const regionName = region.querySelector(".mw-headline")?.innerText;
    if (!regionName) {
      return;
    }
    allTeams.forEach((team) => {
      const [teamName, headers, ...players] = team.querySelectorAll("tr");
      if (!teamName || !headers) {
        return;
      }
      const link = team.querySelector("a");
      const title = link?.getAttribute("title");
      if (!title) {
        return;
      }
      const url = link?.getAttribute("href");
      if (!url) {
        return;
      }
      const src = team.querySelector("img")?.getAttribute("src");
      if (!src) {
        return;
      }
      const srcset = team.querySelector("img")?.getAttribute("srcset");
      const logos = [
        {
          src: prependHref(src),
          size: "1x",
        },
      ];
      if (srcset && srcset.includes(",")) {
        const sizes = srcset.split(",");
        sizes.forEach((item) => {
          const [src, size] = item.split(" ");
          if (!src || !size) {
            return;
          }
          logos.push({
            src: prependHref(src),
            size,
          });
        });
      } else if (srcset) {
        const [src, size] = srcset.split(" ");
        if (src && size) {
          logos.push({
            src: prependHref(src),
            size,
          });
        }
      }

      const playerObjs: Player[] = [];

      players.forEach((player) => {
        const [idAndNationality, name, role] = player.querySelectorAll("td");
        if (!idAndNationality || !name) {
          return;
        }
        const [nationality, id] = idAndNationality.querySelectorAll("a");
        if (!nationality || !id) {
          return;
        }
        const playerObj: Player = {
          username: id.getAttribute("title") ?? id.innerText,
          name: name.innerText,
          role: role?.innerText,
          url: prependHref(id.getAttribute("href")!),
          nationality: {
            country: nationality.getAttribute("title")!,
            url: prependHref(nationality.getAttribute("href")!),
          },
        };
        playerObjs.push(playerObj);
      });

      const teamObj: Team = {
        name: title,
        region: regionName,
        url,
        logo: logos,
        players: playerObjs,
      };
      out.push(teamObj);
    });
  });
  return out;
};

const parseMatches = (matchHtml: string): Match[] => {
  return [];
};

const parseAllTournaments = (tournamentHtml: string): Tournament[] => {
  return [];
};

const parseTournaments = (tournamentHtml: string): Tournament[] => {
  return [];
};

const parsers: ParseMap = {
  teams: parseTeams,
  matches: parseMatches,
  all: parseAllTournaments,
  s: parseTournaments,
  a: parseTournaments,
  b: parseTournaments,
  c: parseTournaments,
  d: parseTournaments,
  monthly: parseTournaments,
  weekly: parseTournaments,
  showmatches: parseTournaments,
  qualifiers: parseTournaments,
  misc: parseTournaments,
  school: parseTournaments,
} as const;

export const GAME = "rocketleague";
export const USER_AGENT = `RocketLeague Prediction Viewer/${
  process.env.npm_pakage_version ?? "1.0"
}`;
export const BASE_URL = "https://liquipedia.net";

type LR = {
  parse: {
    text: string;
    title: string;
    pageid: number;
    revid: number;
    langlinks: {
      lang: string;
      url: string;
      langname: string;
      autonym: string;
      title: string;
    }[];
    categories: {
      sortkey: string;
      category: string;
      hidden?: boolean;
    }[];
    links: {
      ns: number;
      title: string;
      exists?: boolean;
    }[];
    templates: {
      ns: number;
      exists?: boolean;
      title: string;
    }[];
    images: string[];
    externallinks: string[];
    sections: {
      toclevel: number;
      level: string;
      line: string;
      number: string;
      index: string;
      fromtitle: string;
      byteoffset: number;
      anchor: string;
      linkAnchor: string;
    }[];
    showtoc: boolean;
    parsewarnings: string[];
    displaytitle: string;
    iwlinks: {
      prefix: string;
      url: string;
      title: string;
    }[];
    properties: Record<string, unknown>;
  };
};

async function _get(url: URL): Promise<LR> {
  const endpoint = `${BASE_URL}/${GAME}/api.php?action=parse&origin=*&format=json&page=${endpoints[url]}`;
  const response = await fetch(endpoint, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  return response.json() as Promise<LR>;
}

async function _getAndParse<T extends URL>(url: T): Promise<ResponseMap[T]> {
  const response = await _get(url);
  const parser = parsers[url];
  return parser(response.parse.text);
}
