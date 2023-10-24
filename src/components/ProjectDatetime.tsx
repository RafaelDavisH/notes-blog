import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  site: string;
  repo: string;
  size?: "sm" | "lg";
  className?: string;
  readingTime?: string;
  dateUpdated?: string | Date;
}

export default function Datetime({
  datetime,
  site,
  repo,
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      <span className="sr-only">Posted on:</span>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} />
      </span>
      {site ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              size === "sm" ? "scale-90" : "scale-100"
            } inline-block h-6 w-6 fill-skin-base`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
          </svg>

          <span className="sr-only">Site:</span>
          <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
            <a
              className="inline-block font-medium text-skin-accent decoration-dashed underline-offset-4 hover:underline "
              href={site}
            >
              {site}
            </a>
          </span>
        </>
      ) : (
        ""
      )}
      {repo ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              size === "sm" ? "scale-90" : "scale-100"
            } inline-block h-6 w-6 fill-skin-base`}
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
          </svg>
          <span className="sr-only">Repo:</span>
          <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
            <a
              className="inline-block font-medium text-skin-accent decoration-dashed underline-offset-4 hover:underline "
              href={repo}
            >
              {repo}
            </a>
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime);

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      {date}
      <span className="sr-only">&nbsp;at&nbsp;</span>
    </>
  );
};
