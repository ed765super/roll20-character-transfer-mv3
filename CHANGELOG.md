# Changelog

All notable changes to this project are documented in this file.

This project began as a compatibility port of VTT Enhancement Suite (VTTES) 1.28.22 for modern Chrome and Roll20 Jumpgate, with the scope eventually narrowed to reliable Roll20 character export/import.

For deeper technical notes and the errors encountered during development, see [DEBUGGING.md](DEBUGGING.md).

---

## [v10] - 2026-09-28

### Added
- Automatic refresh of the **Editable Characters** list when:
  - characters are created
  - characters are deleted
  - characters are renamed
  - `controlledby` permissions change
  - `inplayerjournals` permissions change
- Sidebar refresh after overwrite so imported character names appear immediately.
- Automatic second overwrite pass when the first pass appears incomplete.

### Changed
- Destination characters are hydrated/refreshed before overwrite.
- Overwrite verification now compares the resulting destination data after the first write.
- If Roll20 only persists part of the character on the first pass, the extension rehydrates the destination and retries once automatically.

### Retained
- Export hydration for modern Roll20 character sheets.
- Modern D&D `builder` / `store` validation.
- Destination permission preservation.
- Post-import verification summary.
- 60-second Overwriting dialog escape hatch.

---

## [v9] - 2026-09-28

### Added
- Character hydration before export.
- Incomplete-export protection for modern Roll20 D&D sheets.
- Validation for large `builder` and `store` attributes used by modern Roll20 character sheets.
- Post-overwrite verification of:
  - attribute count
  - ability count
  - approximate `builder` size
  - approximate `store` size
- 60-second timeout for the blocking **Overwriting** dialog.
- Preservation of destination:
  - `controlledby`
  - `inplayerjournals`

### Changed
- Legacy Roll20 save callbacks are no longer allowed to block the interface indefinitely.
- Overwrite completion no longer depends solely on old VTTES callback behavior.

### Fixed
- Prevented tiny, incomplete modern-sheet exports from being treated as valid character backups.
- Prevented importing a source character from accidentally removing destination-game player permissions.

---

## [v8] - 2026-09-28

### Changed
- Reduced the extension to a focused **character transfer** build.
- Disabled unrelated legacy VTTES modules that depended on obsolete Roll20 APIs.
- Character transfer controls moved to the Roll20 Journal sidebar.

### Fixed
- Fixed character export crash:

  `Cannot read properties of undefined (reading 'R20')`

- Reworked the export handler to avoid the broken legacy/minified `R20` reference.
- Character listing now reads from the current Roll20 `Campaign.characters` collection.

### Known Issue
- Modern Roll20 character data could still export incompletely if the sheet had not been hydrated first.

---

## [v7] - 2026-09-28

### Added
- New **VTTES Character Transfer** section in the Roll20 Journal sidebar.
- Per-character:
  - Export button
  - Overwrite button

### Changed
- Character transfer was no longer dependent on the old VTTES **Export & Overwrite** character-sheet tab.
- Transfer UI was adapted for modern Roll20 character sheets whose DOM no longer matches old VTTES expectations.
- Editable characters could be used by non-GM players if they had permission to control them.

### Fixed
- Removed reliance on the obsolete Roll20 character-sheet tab injection path.

---

## [v6] - 2026-09-28

### Changed
- Relaxed old VTTES bootstrap dependency requirements.
- Roll20 startup no longer waits indefinitely for legacy globals such as:
  - `window.d20`
  - old sound manager dependencies
- Updated the Webpack public path for modern Jumpgate assets.

### Fixed
- Resolved the repeated startup loop:

  `vttes is waiting for depts...`

- Allowed Roll20 Jumpgate to finish loading while still initializing VTTES modules.

### Result
- Roll20 successfully reached:
  - `WEBGL STARTUP SUCCESS`
  - VTTES module injection
  - `CharacterIO.js` installation
  - `SheetTabApi.js` installation

---

## [v5] - 2026-09-28

### Changed
- Disabled the remaining outdated `PageLoadEvent.js` bundle modification.
- Replaced the legacy page-load patch with runtime load detection.
- Limited active Roll20 bundle modification to the minimum needed for startup.

### Fixed
- Removed a likely source of:

  `Unexpected token ','`

- Prevented old VTTES patch code from corrupting the modern Roll20 Jumpgate bundle.

---

## [v4] - 2026-09-28

### Changed
- Began moving away from full VTTES compatibility toward character-transfer-only compatibility.
- Disabled most obsolete VTTES search/replace bundle patches.
- Only a minimal subset of bootstrap-related patches remained active.

### Fixed
- Reduced failures caused by old VTTES code stencils matching incompatible modern Roll20 JavaScript.

### Discovery
- `CharacterIO`-related code still appeared compatible enough to preserve and adapt.

---

## [v3] - 2026-09-28

### Changed
- Updated Roll20 bundle matching to recognize modern hashed Jumpgate bundle URLs.
- Bundle detection no longer depended on the old legacy CDN path.

### Fixed
- Resolved:

  `VTTES Error: Failed to find the bundle URL.`

### Known Issue
- Old VTTES code patches could still corrupt the modern bundle after successful discovery.

---

## [v2] - 2026-09-28

### Changed
- Expanded Roll20 bundle discovery logic.
- Added additional fallback logic for finding current Roll20 startup/bundle resources.

### Fixed
- Improved compatibility with current Roll20 script layout.

### Known Issue
- Bundle detection still relied too heavily on assumptions from older Roll20 builds.

---

## [v1] - 2026-09-28

### Added
- Initial Manifest V3 compatibility port of the VTTES Chrome build.

### Changed
- Migrated:
  - `manifest_version: 2` → `manifest_version: 3`
  - background scripts → Manifest V3 service worker
  - old URL permissions → `host_permissions`
  - legacy web accessible resource declarations → Manifest V3 format
- Replaced uses of:
  - `chrome.extension.getURL()`
  - with `chrome.runtime.getURL()`
- Began replacing legacy request blocking behavior with Manifest V3-compatible mechanisms.

### Fixed
- Allowed the extension to load in modern Chrome instead of failing with:

  `Cannot install extension because it uses an unsupported manifest version.`

### Known Issue
- The original VTTES Roll20 bundle discovery logic no longer matched modern Jumpgate.

---

## Original Upstream

This project is based on the Chrome build of:

**VTT Enhancement Suite (VTTES) 1.28.22**

The original extension was designed for older versions of Roll20 and Manifest V2.

This repository is an unofficial compatibility port focused specifically on character export/import for modern Roll20 Jumpgate and modern Chrome.
