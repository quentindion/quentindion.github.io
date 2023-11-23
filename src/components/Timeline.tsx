import { Fragment } from "react";
import { Experience } from "./App";

export default function Timeline ({experiences}: {experiences: Experience[]}) {
    return <div className="w-full grid grid-cols-1-1-3 gap-6">
        {experiences.map(({dates, company, title, description}, i) =>
            <Fragment key={'experience-' + i}>
                <div>
                    {dates.map((date, j) =>
                        <h3 key={'experience-date-' + j} className="block text-right text-2xl motion-fade">
                            {date}
                        </h3>
                    )}
                </div>
                <span className="w-full h-0.5 mt-4 border-b-4 border-dotted border-neutral-300 dark:border-neutral-700 motion-fade"></span>
                <div>
                    <h3 className="block text-2xl font-medium mb-4 motion-fade-right">{company}</h3>
                    {title && <h4 className="text-xl mb-45 motion-fade-right">{title}</h4>}
                    {description && <p className="motion-fade-right">{description}</p>}
                </div>
            </Fragment>
        )}
    </div>
}