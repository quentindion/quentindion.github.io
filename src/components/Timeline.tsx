import { Fragment } from "react";
import { Experience } from "./App";

export default function Timeline ({experiences}: {experiences: Experience[]}) {
    return <div className="w-full grid grid-cols-1-1-3 gap-6">
        {experiences.map(({dates, company, title, description}, i) =>
            <Fragment key={'experience-' + i}>
                <div>
                    {dates.map((date, j) =>
                        <h3 key={'experience-date-' + j} className="block text-gray-600 dark:text-gray-400 text-right text-2xl md:text-3xl motion-fade">
                            {date}
                        </h3>
                    )}
                </div>
                <span className="w-full h-0.5 mt-5 border-b-4 border-gray-300 dark:border-gray-700 border-dotted motion-fade"></span>
                <div>
                    <h3 className="block text-gray-700 dark:text-gray-300 text-3xl md:text-4xl mb-5 motion-fade-right">{company}</h3>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 text-lg mb-45 motion-fade-right">{title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base5 motion-fade-right">{description}</p>
                </div>
            </Fragment>
        )}
    </div>
}