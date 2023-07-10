/* eslint-disable @next/next/no-img-element */
export type MatchProps = {
  leftTeam: {
    name: string;
    logo: {
      src: string;
      srcset: string;
    };
    score?: number;
  };
  rightTeam: {
    name: string;
    logo: {
      src: string;
      srcset: string;
    };
    score?: number;
  };
  bestOf: number;
  mode?: "input" | "display";
};

const bestOfMaxScore = (bestOf: number) => {
  if (bestOf % 2 === 0) {
    return bestOf / 2 + 1;
  } else {
    return (bestOf + 1) / 2;
  }
};

const Team: React.FC<
  MatchProps["leftTeam"] & { bestOf: number; mode: "input" | "display" }
> = ({ name, logo, score, bestOf, mode }) => {
  return (
    <div className="relative flex gap-[1px]">
      <div className="absolute inset-0 z-10 rounded-sm outline-none outline-offset-0 hover:outline hover:outline-2 hover:outline-bracket-border" />
      <div className="flex h-full w-full items-center justify-start bg-bracket-base pr-2">
        <div className="flex w-[44px] items-center justify-center">
          <img
            className="h-5"
            src={logo.src}
            srcSet={logo.srcset}
            alt={name}
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="bg-bracket-base text-xs text-base-300">{name}</span>
      </div>
      <div className="flex aspect-square w-[22px] items-center justify-center bg-bracket-score">
        {score !== undefined ? (
          <span
            className={
              (score === bestOfMaxScore(bestOf) ? "font-extrabold" : "") +
              " text-xs text-base-300"
            }
          >
            {score}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export const Match: React.FC<MatchProps> = ({
  leftTeam,
  rightTeam,
  bestOf,
  mode = "display",
}) => {
  return (
    <div className="flex flex-col gap-[1px] rounded border-[1px] border-solid border-bracket-border bg-bracket-border">
      <Team {...leftTeam} bestOf={bestOf} mode={mode} />
      <Team {...rightTeam} bestOf={bestOf} mode={mode} />
    </div>
  );
};

/**
 * example:
 * 
      <Match
        leftTeam={{
          name: "Team Vitality",
          logo: {
            src: "https://liquipedia.net/commons/images/thumb/e/e4/Team_Vitality_2023_lightmode.png/41px-Team_Vitality_2023_lightmode.png",
            srcset:
              "https://liquipedia.net/commons/images/thumb/e/e4/Team_Vitality_2023_lightmode.png/62px-Team_Vitality_2023_lightmode.png 1.5x, https://liquipedia.net/commons/images/thumb/e/e4/Team_Vitality_2023_lightmode.png/82px-Team_Vitality_2023_lightmode.png 2x",
          },
          score: 3,
        }}
        rightTeam={{
          name: "Elevate",
          logo: {
            src: "https://liquipedia.net/commons/images/thumb/b/ba/Elevate_2020_lightmode.png/50px-Elevate_2020_lightmode.png",
            srcset:
              "https://liquipedia.net/commons/images/thumb/b/ba/Elevate_2020_lightmode.png/75px-Elevate_2020_lightmode.png 1.5x, https://liquipedia.net/commons/images/thumb/b/ba/Elevate_2020_lightmode.png/100px-Elevate_2020_lightmode.png 2x",
          },
          score: 0,
        }}
        bestOf={5}
      />
 */