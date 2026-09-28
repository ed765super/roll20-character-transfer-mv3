VTTES Character Transfer - Manifest V3 compatibility build v10

Purpose:
- Export a character from a Roll20 game to VTTES JSON.
- Overwrite an editable character in another Roll20 game from that JSON.

This is an unofficial local compatibility port.

--------------------------------------------------
INSTALLING IN GOOGLE CHROME
--------------------------------------------------

1. Extract the ZIP file to a folder on your computer.

2. Open Google Chrome.

3. In the address bar, go to:

   chrome://extensions

4. Turn on "Developer mode" in the top-right corner.

5. Click:

   Load unpacked

6. Select the extracted VTTES_MV3_v10 folder.

   Make sure you select the folder that directly contains manifest.json.

7. The extension should now appear in Chrome as:

   VTTES Character Transfer

8. Close any Roll20 VTT tabs that are already open.

9. Reopen your Roll20 game.

The Character Transfer controls will appear in the Roll20 Journal sidebar.

If you were using an older version of this compatibility build, disable or remove it before loading v10.


--------------------------------------------------
EXPORTING A CHARACTER
--------------------------------------------------

Use this in the Roll20 game that currently contains the completed character.

1. Open the Roll20 game containing the character you want to copy.

2. Open the Journal tab.

3. Find the section:

   VTTES Character Transfer

4. Under "Editable Characters", find the character you want to export.

5. Click:

   Export

6. The extension will first hydrate/load the character's attribute data.

   This is especially important for newer Roll20 D&D character sheets, which may not fully load their builder/store data until accessed.

7. If the character data looks complete, a JSON file will download.

   Example:

   Kayn.json

8. Keep this JSON file. You will use it in the destination game.

Important:
- Modern Roll20 D&D sheets store a large amount of character data inside the "builder" and "store" attributes.
- v10 checks for these before allowing an export.
- If the extension detects that Roll20 has only loaded a partial character, it will refuse to create an incomplete export.


--------------------------------------------------
IMPORTING / OVERWRITING A CHARACTER
--------------------------------------------------

Use this in the destination Roll20 game.

The destination character must already exist and must be editable by you.

For example:
- Your GM creates a blank character.
- Your GM gives you control of that character.
- You overwrite that blank character using the exported JSON.

Steps:

1. Open the destination Roll20 game.

2. Open the Journal tab.

3. Find:

   VTTES Character Transfer

4. Under "Editable Characters", locate the blank character you want to replace.

5. Click:

   Overwrite

6. Select the JSON file you exported earlier.

7. Confirm the overwrite.

8. The extension will:
   - Hydrate the destination character first.
   - Replace its character data with the imported data.
   - Preserve the destination character's existing:
     - controlled-by permissions
     - player-journal permissions
   - Verify the imported attributes and abilities afterward.

9. Roll20 can sometimes persist large modern character sheets lazily.

   If the first overwrite only saves part of the character, v10 will:
   - detect the incomplete result
   - rehydrate the destination
   - automatically retry the overwrite one additional time

10. After the overwrite finishes, reopen the character and verify that the sheet looks correct.

Recommended things to check:
- Character name
- Ability scores
- Classes and levels
- HP
- Attacks
- Features and traits
- Inventory
- Spells
- Resources
- Character image


--------------------------------------------------
EDITABLE CHARACTERS LIST
--------------------------------------------------

The "Editable Characters" section only shows characters that your Roll20 account is allowed to edit.

In v10, this list refreshes automatically when:
- A character is created
- A character is deleted
- A character is renamed
- Controlled-by permissions change
- Player-journal permissions change
- An overwrite changes the imported character's name

A manual page refresh should normally not be required.


--------------------------------------------------
OVERWRITING MESSAGE / TIMEOUT
--------------------------------------------------

Large Roll20 character sheets can sometimes take a while to save.

While importing, the extension may display:

   Overwriting

If the blocking Overwriting message remains on screen for a full 60 seconds, v10 automatically removes it so that the Roll20 interface can be used again.

This timeout does not necessarily mean the import failed.

If this happens:
1. Refresh Roll20.
2. Reopen the destination character.
3. Check whether the imported data persisted.


--------------------------------------------------
v10 CHANGES
--------------------------------------------------

- Hydrates/refreshes the destination character's attribute and ability collections BEFORE overwrite.
- Verifies the first overwrite pass.
- If Roll20 only persisted part of the character, automatically rehydrates and retries once.
- Keeps the v9 export hydration and incomplete-export protections for modern D&D builder/store data.
- Keeps destination controlled-by / player-journal permissions.
- Editable Characters now refreshes live when characters are:
  - added
  - removed
  - renamed
  - assigned new control permissions
  - assigned new journal permissions
- Refreshes the sidebar again after an overwrite so the imported character name appears immediately.
- Retains the 60-second Overwriting-dialog escape hatch.
- Retains post-import verification.
- Keeps this as a focused character-transfer build rather than enabling unrelated legacy VTTES modules.


--------------------------------------------------
NOTES
--------------------------------------------------

- This is an unofficial local compatibility port.
- It is not an official Roll20 extension.
- It is designed specifically for character export/import.
- Many unrelated legacy VTTES features have intentionally been disabled.
- Large modern Roll20 D&D sheets may contain very large "builder" and "store" attributes.
- Roll20's console may show analytics warnings about large attribute updates being truncated for logging. That does not necessarily mean the character data itself was truncated.