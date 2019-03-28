# Landing page for Kiwi.com Stopover

## Install it and run:

```
$ yarn
$ yarn dev
```

If you go to localhost:3000 then you are automatically redirected to localhost:3000/en/stopovers/dubai (one of city pages)

## Export and run static (production) version

```
$ yarn export
$ yarn start
```

## Configuration files

### next.config.js

Here you will find main next.js config which includes static page generation mechanism.

### dato.config.js

Used for fetching and processing data from DatoCMS, read DatoCMS cli docs
to get updated data run `yarn fetch`

## Translations

run `yarn push-translations` and `yarn fetch-translations` to upload translations to phraseapp(mostly after new copy are added in DatoCMS) and to fetch updated translations from there.

use `@kiwicom/nitro/lib/components/Translate` to translate strings (see already implemented ccomponent for usage examples).

## CI/Deployment

See CI config in `.gitlab-ci.yml`
Pipelines are automatically triggered on each push

### Releases

Done by creating tags - this will actually trigger production deployment
https://github.com/kiwicom/stopovers/releases

List all commits related to release in release description

## Contribution guidelines

See CONTRIBUTION.md

## QUESTIONS?

Plz contact me in slack @alexedev and I will update these docs with new info needed.
