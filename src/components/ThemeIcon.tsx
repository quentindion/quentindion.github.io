import useTheme from "../useTheme";

export default function ThemeIcon() {
    
    const [theme] = useTheme();
    
    const toggled = 
        (theme === "dark" && window.matchMedia("screen").matches) || 
        (!theme && window.matchMedia("screen and (prefers-color-scheme: dark)").matches);

    return <div className={`theme-toggle ${!toggled && "theme-toggle--toggled"}`} title="Toggle theme">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="1em"
            height="1em"
            fill="currentColor"
            className="size-6 theme-toggle__around"
            viewBox="0 0 32 32"
        >
            <clipPath id="theme-toggle__around__cutout">
                <path d="M0 0h42v30a1 1 0 00-16 13H0Z" />
            </clipPath>
            <g clipPath="url(#theme-toggle__around__cutout)">
            <circle cx="16" cy="16" r="8.4" />
            <g>
                <circle cx="16" cy="3.3" r="2.3" />
                <circle cx="27" cy="9.7" r="2.3" />
                <circle cx="27" cy="22.3" r="2.3" />
                <circle cx="16" cy="28.7" r="2.3" />
                <circle cx="5" cy="22.3" r="2.3" />
                <circle cx="5" cy="9.7" r="2.3" />
            </g>
            </g>
        </svg>
    </div>
}