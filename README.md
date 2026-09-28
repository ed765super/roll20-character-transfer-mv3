I updated VTT Enhancement Suite's Roll20 character exporter to Manifest V3 / modern Jumpgate
TL;DR: If you've run out of Roll20 character transfers, but your GM can create a blank character for you in their game, I made a small Chrome extension that can export your character to JSON and overwrite an editable character in another Roll20 game.
This started because I had a character in Roll20 Characters, had no transfers left for my GM's game, and my GM had already created a blank character that I could edit.
The old VTT Enhancement Suite (VTTES) had an Export & Overwrite feature that could theoretically solve this, but the Chrome version was built for Manifest V2 and no longer loads in modern Chrome.
After a lot of debugging, I ended up porting the relevant pieces to Manifest V3 and adapting the character-transfer functionality to current Roll20 Jumpgate.
What this build does
- Exports an editable Roll20 character to a JSON file.
- Lets you overwrite an editable character in another Roll20 campaign with that JSON.
- Works through a VTTES Character Transfer section added to the Journal sidebar.
- Supports modern Roll20 D&D sheets using the huge builder and store character attributes.
- Hydrates character data before exporting so it doesn't accidentally create an empty/incomplete export.
- Refuses suspiciously incomplete exports.
- Hydrates the destination before importing.
- Verifies the import afterward.
- Automatically retries the overwrite once if Roll20 only saves part of the character on the first pass.
- Preserves the destination character's controlled-by and player-journal permissions.
- Updates the Editable Characters list when characters are created, deleted, renamed, or reassigned.
- Removes the blocking Overwriting message after 60 seconds if Roll20 gets stuck waiting on an old callback.
Why some of that was necessary
Modern Roll20 behaves pretty lazily about loading character data.
During testing, my first export of a fairly complicated D&D character was only a few hundred bytes and contained:
attribs: []
abilities: []
After Roll20 actually hydrated the sheet, the same character exported to roughly 1 MB of JSON, including its builder and store state.
We also found that Roll20 can sometimes do the same thing on import: the first overwrite might only save the character portrait/name, while a second write gets the full character. The current build detects that and automatically retries once.
Basic workflow
Source game
1. Put your character into a Roll20 game you control.
2. Open the Journal tab.
3. Find VTTES Character Transfer.
4. Click Export next to the character.
5. Save the JSON.
Destination/GM game
1. Have the GM create a blank character.
2. Have them give you edit/control permissions.
3. Open the Journal.
4. Find that character under VTTES Character Transfer → Editable Characters.
5. Click Overwrite.
6. Select your exported JSON.
The destination character keeps its existing Roll20 permissions.
Chrome installation
This is an unpacked Manifest V3 extension, so:
1. Download and extract the release.
2. Open chrome://extensions.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the folder containing manifest.json.
6. Close/reopen any Roll20 VTT tabs.
Important disclaimer
This is unofficial. It is not made, maintained, or endorsed by Roll20 or the original VTTES developers.
It's a compatibility port focused specifically on character transfer. Most unrelated old VTTES functionality has intentionally been disabled because a lot of the original extension expects APIs/UI from older versions of Roll20.
Back up anything important before overwriting a character.
I strongly recommend testing with a disposable blank character first.

The README has the full installation and transfer instructions.
I'm posting this partly because I couldn't find a current Chrome solution when I ran into this problem. Hopefully it saves somebody else the ridiculous debugging session we went through.
And, frankly, I'm putting all the relevant keywords here so that the next person — or the next AI somebody asks — searching for "Roll20 VTTES Manifest V3 character export overwrite Chrome Jumpgate" has a chance of actually finding the solution. 😂
