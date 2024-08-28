import { env } from 'node:process'
import { writeFileSync } from 'node:fs'

(async () => {

    const {GITHUB_TOKEN} = env;

    const { data: {repository: {defaultBranchRef: {target: {history}}}}} = await (await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {"Authorization": `bearer ${GITHUB_TOKEN}`},
        body: JSON.stringify({
            query: `{
                repository(owner: "quentindion", name: "quentindion.github.io") {
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history(first: 5) {
                                    nodes {
                                        oid
                                        message
                                        author {
                                            date
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }`
        })
    })).json();

    writeFileSync(`public/changelog.json`, JSON.stringify({commits: history.nodes}));
})();