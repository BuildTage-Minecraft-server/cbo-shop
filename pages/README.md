# Intentionally empty

This directory contains no routes. Its presence makes Next.js ignore `src/pages`, which is the Feature-Sliced Design pages layer and not the Pages Router.

Routing lives in the root `app` directory. Every route file is a thin re-export of a page from `src/pages`.
