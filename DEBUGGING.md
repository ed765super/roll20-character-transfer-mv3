# Debugging / Porting History

This project began as an attempt to use VTT Enhancement Suite 1.28.22
to transfer a Roll20 character after exhausting Roll20's normal
character transfers.

Based on VTT Enhancement Suite 1.28.22.
Modified for Manifest V3 and modern Roll20 Jumpgate character transfer.

## 1. Chrome rejects the original extension

Error:

Cannot install extension because it uses an unsupported manifest version.

Cause:
VTTES used Manifest V2. Current Chrome requires Manifest V3.

Fix:
Converted the manifest to MV3, replaced the background page with a
service worker, and migrated blocking request behavior.

## 2. VTTES cannot find Roll20's bundle

Error:

VTTES Error: Failed to find the bundle URL.

Cause:
Modern Roll20 Jumpgate uses a different hashed vtt.bundle URL/layout
than the version VTTES expected.

Fix:
Updated bundle discovery to recognize current Jumpgate bundle URLs.

## 3. Modified Roll20 bundle throws syntax errors

Error:

Unexpected token ','

Cause:
Old VTTES search/replace patches were matching modern Roll20 code in
unsafe locations.

Fix:
Disabled obsolete legacy bundle patches rather than attempting to run
the entire old Enhancement Suite.

## 4. VTTES waits forever for dependencies

Message:

vttes is waiting for depts...

Cause:
Modern Jumpgate no longer exposes several legacy Roll20 globals in the
same way, particularly window.d20.

Fix:
Changed startup requirements so Roll20 could complete initialization
without the old d20 dependency.

## 5. CharacterIO loads but Export & Overwrite tab is missing

Cause:
The original VTTES SheetTabApi expects Roll20's old character-dialog DOM.

Fix:
Moved character transfer controls into the Roll20 Journal sidebar.

## 6. Export crashes

Error:

Cannot read properties of undefined (reading 'R20')

Cause:
A legacy/minified CharacterIO reference no longer worked correctly.

Fix:
Reimplemented the relevant export handler.

## 7. Modern D&D sheet exports as almost-empty JSON

Symptom:

attribs: []
abilities: []

The export was only a few hundred bytes.

Cause:
Modern Roll20 lazily hydrates character attributes. The D&D sheet's
actual state is largely stored in very large `builder` and `store`
attributes.

After forcing the character to hydrate, the same character exported to
roughly 1 MB of JSON.

Fix:
Force attribute hydration before export and reject suspiciously
incomplete modern-sheet exports.

## 8. First overwrite may only copy the portrait/name

Cause:
Roll20 can also lazily persist the huge builder/store attributes during
overwrite.

Fix:
Verify the first overwrite pass. If it is incomplete, rehydrate the
destination and automatically retry once.

## 9. Overwrite dialog can remain indefinitely

Cause:
Legacy VTTES waited for an old Roll20 save callback that Jumpgate does
not always fire.

Fix:
Added verification-based completion and a 60-second UI escape hatch.

## 10. Editable Characters list becomes stale

Symptom:
New or renamed characters do not appear until refreshing Roll20.

Fix:
Listen for character collection changes and rebuild the transfer UI
when characters are created, removed, renamed, or permissions change.
