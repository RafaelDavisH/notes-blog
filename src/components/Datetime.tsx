import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
  readingTime?: string;
  dateUpdated?: string | Date;
}

export default function Datetime({
  datetime,
  size = "sm",
  className,
  readingTime,
  dateUpdated,
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
      <FormattedDatetime
          datetime={datetime}
          dateUpdated={dateUpdated}
          readingTime={readingTime}
          />
      </span>
    </div>
  );
}

function formatReadingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min read`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min read`;
  }
}

interface UpdatedDatetimeProps {
  update: string;
}

const UpdatedDatetime = ({ update }: UpdatedDatetimeProps) => {
  return (
    <>
      Updated: {update}
    </>
  );
};

const FormattedDatetime = ({
  datetime,
  dateUpdated,
  readingTime,
}: {
  datetime: string | Date;
  dateUpdated: string | Date;
  readingTime: string ;
}) => {
  const myDatetime = new Date(datetime);
  const myDateUpdate = new Date(dateUpdated);

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });

  const updated = myDateUpdate.toLocaleDateString(LOCALE, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });

  // const readTime = myReadTime.toLocaleTimeString(LOCALE, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <>
      {date}
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span> ({readingTime})</span>
      {updated !== "Invalid Date" ? (
        <>
          <span aria-hidden="true"> | </span>
          <span className="sr-only">&nbsp;at&nbsp;</span>
          <UpdatedDatetime update={updated} />
        </>
        ):("")
        }
    </>
  );
};
